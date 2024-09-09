import cv2
from picamera2 import Picamera2
import numpy as np
from datetime import datetime
import os
from dronekit import connect, VehicleMode
import time
import csv
import pandas as pd
import math

# Connect to the Vehicle
connection_string = "/dev/ttyACM0"  # Change it to your setup
vehicle = connect(
    connection_string, wait_ready=False
)  # Ensure the connection is fully ready
filename = "data1.csv"


def get_vehicle_data(vehicle):
    # Ensure the vehicle is in a mode where it can provide attitude data

    # Altitude (relative to home location in meters)
    altitude = vehicle.location.global_relative_frame.alt
    latitude = vehicle.location.global_frame.lat
    longitude = vehicle.location.global_frame.lon

    # Attitude (roll, pitch, yaw) in radians
    roll = vehicle.attitude.roll
    pitch = vehicle.attitude.pitch
    yaw = vehicle.attitude.yaw
    head = vehicle.heading
    # Convert radians to degrees for better readability
    roll_deg = roll * 180 / 3.14159
    pitch_deg = pitch * 180 / 3.14159
    yaw_deg = yaw * 180 / 3.14159
    velocity = vehicle.velocity
    heading_deg = math.degrees(
        math.atan2(velocity[1], velocity[0])
    )  # atan2(East, North)

    return (
        altitude,
        roll_deg,
        pitch_deg,
        yaw_deg,
        heading_deg,
        latitude,
        longitude,
        head,
    )


# Create a directory to save frames if it doesn't exist
output_dir = "captured_frames1"
image_dir = output_dir
csv_file = "data1.csv"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Initialize the camera

picam2 = Picamera2()
picam2.configure(picam2.create_video_configuration())
try:
    picam2.start()  # Start the camera without preview

    while True:
        # Capture a frame
        frame = picam2.capture_array()

        # Convert the frame from BGR to RGB (OpenCV uses BGR by default)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Display the frame using OpenCV
        #        cv2.imshow('Pi Camera Feed', frame)

        # Save the frame with a timestamp as filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        image_filename = os.path.join(image_dir, f"{timestamp}.png")
        (
            altitude,
            roll_deg,
            pitch_deg,
            yaw_deg,
            heading,
            latitude,
            longitude,
            heading,
        ) = get_vehicle_data(vehicle)
        data = [
            timestamp,
            altitude,
            roll_deg,
            pitch_deg,
            yaw_deg,
            heading,
            latitude,
            longitude,
            heading,
        ]

        # Save the image
        cv2.imwrite(image_filename, frame)

        # Append the DataFrame to the CSV file
        df = pd.DataFrame(
            [data],
            columns=[
                "Timestamp",
                "Altitude",
                "Roll (deg)",
                "Pitch (deg)",
                "Yaw (deg)",
                "bearing",
                "latitude",
                "longitude",
                "heading",
            ],
        )
        df.to_csv(csv_file, mode="a", header=not os.path.exists(csv_file), index=False)
        # cv2.imshow('Pi Camera Feed', frame)

        print(f"Data written to CSV: {data}")
finally:
    # Cleanup
    picam2.stop()  # Stop the camera
    cv2.destroyAllWindows()
