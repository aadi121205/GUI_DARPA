import cv2
import json
import base64
from Data import Server  # Assuming you have your Server class defined
import time
import os
from picamera2 import Picamera2


gcs_ip = os.getenv("GCS_IP")
gcs_port = os.getenv("GCS_PORT")


picam2 = Picamera2()
picam2.configure(picam2.create_video_configuration())


def get_frame():
    picam2.start()  # Start the camera without preview
    # Capture a frame
    frame = picam2.capture_array()

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
