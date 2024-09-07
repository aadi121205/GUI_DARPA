import socket
import time
import cv2
import json
import base64

class Client:
    def __init__(self, host, port=12345):
        self.host = host
        self.port = port
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self):
        self.client_socket.connect((self.host, self.port))
        print(f"Connected to server {self.host}:{self.port}")

    def receive_data(self):
        data = self.client_socket.recv(1024).decode()
        print(f"Received from server: {data}")
        return data

    def close(self):
        self.client_socket.close()

# Example usage
if __name__ == "__main__":
    client = Client(host='0.0.0.0')  # Replace with server's IP address
    client.connect()
    while True:
        json_data = client.receive_data()
        time.sleep(5)
        
        


