import time
import os
import threading
from dotenv import load_dotenv
from socket_client import Socketio_client
from math import radians, cos, sin, asin, sqrt
import subprocess
from UAV import DroneController
from UGV import RoverController
from image_capture import Image_Capture
load_dotenv()
# from socket_client import Drone

gcs_ip=os.getenv('GCS_IP')
gcs_port=os.getenv('GCS_PORT')
# RoverIP = os.getenv('ROVER_IP_ADDRESS')

if __name__=="__main__":
    sio = Socketio_client(gcs_ip,gcs_port).socketio_client
    uav = DroneController(sio)
    ugv = RoverController(sio)
    video= Image_Capture(sio)
    
    