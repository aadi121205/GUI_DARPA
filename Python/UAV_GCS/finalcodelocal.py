import numpy as np
import cv2
from ultralytics import YOLO
import time
from dronekit import connect, VehicleMode, LocationGlobalRelative, LocationGlobal
import pandas as pd
from Client import Client
import json
import base64

# Initialize the point list
point = []

# Initialize the YOLO model
Model = YOLO("Python/UAV_GCS/best_body.pt")

# Connect to the vehicle
vehicle = connect("127.0.0.1:14551", wait_ready=True)
print("Vehicle Connected")

# Initialize the CSV file
df = pd.DataFrame(
    columns=["Latitude", "Longitude", "Altitude", "Yaw", "X", "Y", "Time", "Frame"]
)
df.to_csv("Python/UAV_GCS/Logs/coordinates.csv", index=False)

def getpoint(image, vehicle):
    results = Model(image)
    lat = vehicle.location.global_frame.lat
    lon = vehicle.location.global_frame.lon
    yaw = vehicle.attitude.yaw
    altitude = vehicle.location.global_relative_frame.alt

    for box in results[0].boxes:
        if box.cls == 0:  # Assuming 0 corresponds to the 'person' class
            xyxy = box.xyxy[0].cpu().numpy()  # Convert tensor to numpy array
            x = (xyxy[0] + xyxy[2]) / 2
            y = (xyxy[1] + xyxy[3]) / 2
            point.append(x)
            point.append(y)
            break
    return point, lat, lon, yaw, altitude

def plotpoint(image, point):
    if len(point) >= 2:
        x, y = int(point[0]), int(point[1])  # Convert coordinates to integers
        cv2.circle(image, (x, y), 5, (0, 0, 255), -1)
        cv2.imshow("Frame", image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

def getlatlon(xyz_w, current_lat, current_lon):
    lat_offset_meters = -xyz_w[1]
    lon_offset_meters = xyz_w[0]

    lat_degree_offset = lat_offset_meters / 111320
    lon_degree_offset = lon_offset_meters / (111320 * np.cos(np.deg2rad(current_lat)))

    new_lat = current_lat + lat_degree_offset
    new_lon = current_lon + lon_degree_offset

    return new_lat, new_lon

def getgps(yaw, lat, lon, altitude, point):
    intrinsic_matrix = np.array(
        [[3409.67569064, 0.0, 640], [0.0, 3409.52523805, 360], [0.0, 0.0, 1.0]]
    )

    uv1 = np.array([point[0], point[1], 1])
    xyz_c = altitude * np.linalg.inv(intrinsic_matrix) @ uv1
    xyz_w = np.round(xyz_c, 5)

    yaw = np.deg2rad(yaw)

    R_yaw = np.array(
        [[np.cos(yaw), -np.sin(yaw), 0], [np.sin(yaw), np.cos(yaw), 0], [0, 0, 1]]
    )

    xyz_w = R_yaw @ xyz_c
    xyz_w = np.round(xyz_w, 5)

    p_lat, p_lon = getlatlon(xyz_w, lat, lon)
    geo_coord = [p_lat, p_lon]

    return geo_coord

def main():
    client = Client(host="0.0.0.0")  # Replace with server's IP address
    client.connect()

    try:
        while True:
            json_data = client.receive_data()
            if json_data:
                try:
                    data = json.loads(json_data)
                    frame = client.display_image_from_json(data)
                    if frame is not None:
                        point, lat, lon, yaw, altitude = getpoint(frame, vehicle)
                        if len(point) >= 2:
                            geo_coord = getgps(yaw, lat, lon, altitude, point)
                            print(geo_coord)
                            df.loc[len(df)] = [
                                geo_coord[0],
                                geo_coord[1],
                                altitude,
                                yaw,
                                point[0],
                                point[1],
                                time.time(),
                                data,
                            ]
                            df.to_csv(
                                "Python/UAV_GCS/Logs/coordinates.csv", index=False
                            )
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON: {e}")
            time.sleep(1)
    finally:
        client.close()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
