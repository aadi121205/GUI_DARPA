import os
from dotenv import load_dotenv
from socket_client import Socketio_client
from Data import DataController

gcs_ip=os.getenv('GCS_IP')
gcs_port=os.getenv('GCS_PORT')

if __name__=="__main__":
    sio = Socketio_client(gcs_ip,gcs_port).socketio_client
    data = DataController(sio)
