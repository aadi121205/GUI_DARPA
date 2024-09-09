import cv2
import json
import base64
from Data import Server  # Assuming you have your Server class defined
import time
import os

vid = cv2.VideoCapture(0)

def get_frame():
    _, frame = vid.read()

    # Convert the frame from BGR to RGB (OpenCV uses BGR by default)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Convert frame to JPEG format to make it easier to send
    _, buffer = cv2.imencode(".jpg", frame)

    # Encode the frame as base64 to make it JSON serializable
    frame_base64 = base64.b64encode(buffer).decode("utf-8")
    return frame_base64


if __name__ == "__main__":
    server = Server()
    server.start()
    client_socket = server.accept_connection()
    while True:
        # Prepare the data as a dictionary
        data_to_send = {"data": "Hello, World!", "frame": get_frame()}

        # Convert the dictionary to a JSON string
        json_data = json.dumps(data_to_send)

        # Send the data to the client
        server.send_data(client_socket, json_data)

        time.sleep(1)
