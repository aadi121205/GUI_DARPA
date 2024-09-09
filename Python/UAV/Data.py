import socket
import json
import base64
import cv2

class Server:
    def __init__(self, host='0.0.0.0', port=12345):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def start(self):
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(1)
        print(f"Server is listening on {self.host}:{self.port}")

    def accept_connection(self):
        client_socket, addr = self.server_socket.accept()
        print(f"Connection from {addr}")
        return client_socket

    def send_data(self, client_socket, data):
        try:
            # Ensure we are sending the data in manageable chunks
            data = data.encode()  # Ensure data is encoded to bytes
            client_socket.sendall(data)  # Use sendall to send large data reliably
            print("Data sent successfully")
        except BrokenPipeError:
            print("Error: Broken pipe. The client might have disconnected.")
        except Exception as e:
            print(f"Error sending data: {e}")

    def close(self, client_socket):
        client_socket.close()
        self.server_socket.close()
