import os
from dotenv import load_dotenv
from socket_client import Socketio_client
from UAV import DroneController
from UAV import DroneController_flask
from UAVDATA import DataController
load_dotenv()

gcs_ip=os.getenv('GCS_IP')
gcs_port=os.getenv('GCS_PORT')

if __name__=="__main__":
    sio = Socketio_client(gcs_ip,gcs_port).socketio_client
    uav = DroneController_flask(sio)
    data = DataController(sio)
