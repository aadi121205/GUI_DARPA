import socketio
import json
import time
import os
from dotenv import load_dotenv
load_dotenv()
# Create a socket.io client
sio = socketio.Client()

# Define the namespace you want to connect to
namespace = '/datarover3'
gcs_port=os.getenv('GCS_PORT')
time_interval = int(os.getenv('TIME_INTERVAL'))
# JSON file path (Update this with your actual file path)
json_file_path = '/Users/shivanshchauhan/Desktop/Work/UAS/GUI/main/NEW-GUI/Python/Test/test3.json'

# Connect to the backend server
sio.connect('http://localhost:'+gcs_port, namespaces=[namespace])

@sio.event(namespace=namespace)
def connect():
    print("Connected to dataNamespace")

@sio.event(namespace=namespace)
def disconnect():
    print("Disconnected from dataNamespace")

# Emit data from the JSON file to dataNamespace
def send_data_from_json():
    while True:
        try:
            # Open and read the JSON file
            with open(json_file_path, 'r') as file:
                json_data = json.load(file)
                
                # Emit the data to the server
                sio.emit('data3', json_data, namespace=namespace)
                print(f"Data sent: {json_data}")

            # Wait before sending the data again (adjust as needed)
            time.sleep(time_interval)
        
        except Exception as e:
            print(f"An error occurred: {e}")
            # break
            time.sleep(time_interval)


if __name__ == '__main__':
    send_data_from_json()
    sio.wait()
