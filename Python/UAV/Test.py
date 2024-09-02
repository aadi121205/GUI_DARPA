import numpy as np
import cv2
from ultralytics import YOLO
import os
import pandas as pd

# Initialize the YOLO model
Model = YOLO("best_body.pt")

def getpoint(image):
    point = []
    box = []
    results = Model.track(image, save=True, device="cuda", conf=0.5, tracker="bytetrack.yaml", show=True)
    for result_box in results[0].boxes:
        if result_box.cls == 0:  # Assuming 0 corresponds to the 'person' class
            xyxy = result_box.xyxy[0].cpu().numpy()  # Convert tensor to numpy array
            x = (xyxy[0] + xyxy[2]) / 2
            y = (xyxy[1] + xyxy[3]) / 2
            point.append(x)
            point.append(y)
            box = xyxy
            break
    return point, box

def plotpoint(image, point, box):
    if len(point) >= 2:
        x, y = int(point[0]), int(point[1])  # Convert coordinates to integers
        cv2.circle(image, (x, y), 5, (0, 0, 255), -1)
        box = [int(coord) for coord in box]  # Ensure all coordinates are integers
        cv2.rectangle(image, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)        
        return image
    else:
        print("No person detected")
        return image

def main():
    v = 0
    for i in range(1000):
        data = pd.read_csv("Python/UAV/flight_kush/data1.csv")
        folder_path = "Python/UAV/flight_kush/captured_frames1/"
        filename = folder_path + data["Timestamp"][v] + ".png"
        print("Processing image", filename)
        image = cv2.imread(filename)
        v = v + 10
        if image is None:
            print("Failed to read image")
            continue
        else:
            point, box = getpoint(image)
            img = plotpoint(image, point, box)
"""             cv2.imshow("Frame", img)
            if cv2.waitKey(1) & 0xFF == ord('q'):  # Update to display the frame in real-time
                return True  # Return True to signal that 'q' was pressed and we should exit """

if __name__ == "__main__":
    main()
