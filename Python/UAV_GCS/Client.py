import socket
import time
import cv2
import json
import base64
import numpy as np

class Client:
    def __init__(self, host, port=12345):
        self.host = host
        self.port = port
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self):
        self.client_socket.connect((self.host, self.port))
        print(f"Connected to server {self.host}:{self.port}")

    def receive_data(self):
        data = ""
        while True:
            chunk = self.client_socket.recv(1024).decode()
            if not chunk:
                break
            data += chunk
            if data.endswith("}"):  # Adjust this as needed to detect the end of a JSON message
                break
        return data

    def close(self):
        self.client_socket.close()

    def display_image_from_json(self, data):
        # Check if 'frame' exists in the JSON data
        if 'frame' in data:
            # Extract and decode base64 image
            img_data = base64.b64decode(data['frame'])
            np_arr = np.frombuffer(img_data, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            
            # Display the image using OpenCV
            if img is not None:
                cv2.imshow('Received Image', img)
                cv2.waitKey(1)  # Refresh the image window
            else:
                print("Error: Couldn't decode image.")
        else:
            print("No frame in JSON data.")

# Example usage
if __name__ == "__main__":
    client = Client(host='0.0.0.0')  # Replace with server's IP address
    client.connect()

    try:
        while True:
            json_data = client.receive_data()
            if json_data:
                try:
                    data = json.loads(json_data)
                    print("Decoded JSON data:", data)
                    
                    # Display the image if present
                    client.display_image_from_json(data)
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON: {e}")
            time.sleep(1)
    finally:
        client.close()
        cv2.destroyAllWindows()
