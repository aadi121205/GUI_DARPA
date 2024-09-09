import time
import os
import threading
from dotenv import load_dotenv
from socket_client import Socketio_client
from math import radians, cos, sin, asin, sqrt
import subprocess
from UAV import DroneController
from UGV import RoverController
from UGV2 import RoverController2
from UGV3 import RoverController3
from image_capture import Image_Capture
from Data import DataController
load_dotenv()
# from socket_client import Drone

gcs_ip=os.getenv('GCS_IP')
gcs_port=os.getenv('GCS_PORT')
# RoverIP = os.getenv('ROVER_IP_ADDRESS')

if __name__=="__main__":
    sio = Socketio_client(gcs_ip,gcs_port).socketio_client
    uav = DroneController(sio)
    data = DataController(sio)
    ugv = RoverController(sio)
    ugv2 = RoverController2(sio)
    ugv3 = RoverController3(sio)