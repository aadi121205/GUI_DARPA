from dronekit import connect, VehicleMode, LocationGlobalRelative
import time
from math import radians, cos, sin, asin, sqrt
import socket
import threading
import sys
import os
from pymavlink import mavutil
import subprocess


def haversine(lon1, lat1, lon2, lat2):
	lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
	a = sin((lat2-lat1)/2)**2 + cos(lat1) * cos(lat2) * sin((lon2-lon1)/2)**2
	c = 2 * asin(sqrt(a))
	return c * 6371 * 1000

class UAV:
	def __init__(self, socket):
		self.socket = socket
		self.conection_string = '127.0.0.1:14550'
		self.telemestatus = False
		self.conected = False
		self.conection = None
		
	def connect_uav(self):
		if not self.uav_connected:
			try:
				print("Trying to connect UAV.....")
				self.conection = connect(self.DroneIP, wait_ready=False, timeout=5)
				print("[UAV.py] Connected to UAV at IP/PORT: " + str(self.DroneIP))
				self.uav_connected = True
			except Exception as e:
				print("[UAV.py] An error occurred: " + str(e))
				self.uav_connected = False
				time.sleep(5)

	def on_arm_drone(self):
		self.conection.mode = VehicleMode("GUIDED")
		self.conection.armed = True

	def on_disarm_drone(self):
		self.conection.armed = False
	
	def on_arm_drone(self):
		self.conection.mode = VehicleMode("GUIDED")
		self.conection.armed = True
		print("Armed")
		
	def on_takeoff_drone(self):
		self.conection.mode = "GUIDED"
		self.conection.simple_takeoff(10)
		while True:
			if self.conection.location.global_relative_frame.alt >= 10*0.95:
				print("Reached the target Altitude")
				break
			
	def on_land_drone(self):
		self.conection.mode = "LAND"
		while True:
			if self.conection.location.global_relative_frame.alt <= 0.1:
				print("Landed")
				break
			
	def on_return_to_launch(self):
		self.conection.mode = "RTL"
		
