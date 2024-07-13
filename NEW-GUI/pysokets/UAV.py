from dronekit import connect, VehicleMode, LocationGlobalRelative, Command
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
		self.sio.on('arm_drone',self.on_arm_drone,namespace="/uav")
		self.sio.on('takeoff',self.on_takeoff_drone,namespace="/uav")
		self.sio.on('disarm_drone',self.on_disarm_drone,namespace="/uav")
		self.sio.on('upload_mission',self.upload_mission,namespace="/uav")
		self.sio.on('readmission',self.readmission,namespace="/uav")
		self.sio.on('save_mission',self.save_mission,namespace="/uav")
		self.sio.on('RTL',self.set_rtl,namespace="/uav")
		self.sio.on('landUav',self.land_Uav,namespace="/uav")
		self.sio.on('goto_drone',self.goto,namespace="/uav")
		self.sio.on('odlc_mission',self.flyMission,namespace="/uav")
		self.filename = "mission.txt"
		self.goto_mission = "waypoints.txt"
		self.connect_uav()
  		
		t2=threading.Thread(target=self.send_telemetry_data,).start()
		
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
			
	def land_Uav(self):
		self.conection.mode = "LAND"
		while True:
			if self.conection.location.global_relative_frame.alt <= 0.1:
				print("Landed")
				break
			
	def set_rtl(self):
		self.conection.mode = "RTL"
		
    
	def arm_and_takeoff(self,target_altitude):
		print("Checking basic pre-arm")
		self.conection.mode = "GUIDED"
		self.conection.armed = True

		while not self.conection.armed:
			time.sleep(1)
		print("Take-Off Started")
		self.conection.simple_takeoff(target_altitude)

		while True:
			print("Current Altitude: ", self.conection.location.global_relative_frame.alt)
			if self.conection.location.global_relative_frame.alt >= target_altitude*0.95:
				print("Reached Target Altitude")
				break
			time.sleep(1)

	def travel(self, lon, lat, alt):
		print("travel called")
		d = haversine(self.conection.location.global_relative_frame.lon, self.conection.location.global_relative_frame.lat, lon, lat)
		self.conection.simple_goto(LocationGlobalRelative(lat, lon, alt))
		while d>2:
			d = haversine(self.conection.location.global_relative_frame.lon, self.conection.location.global_relative_frame.lat, lon, lat)
			# print(d)
			time.sleep(1)

	def drone_operation(self,vehicle):
		print("Connected to drone")
	
	def goto(self, alt=10):
		self.arm_and_takeoff(10)
		
		Lat = []
		Lon = []
		with open(self.goto_mission, "r") as file:
			for line in file:
				# Split the line into latitude and longitude
				latitude, longitude = line.strip().split(", ")
				# Append the values to the corresponding lists
				Lat.append(float(latitude))
				Lon.append(float(longitude))
		for c in range(len(Lat)):
			self.travel(Lon[c], Lat[c], alt)
			time.sleep(2)
		
		self.conection.mode= "RTL"

	def run(self,vehicle):
		self.drone_operation(vehicle)

	def flyMission(self):
		global i
		self.arm_and_takeoff(10)
		with open('waypoints.txt', 'r') as file:
			for line in file:
				lat, lon, alt = line.strip().split(',')
				target_location = LocationGlobalRelative(float(lat), float(lon), float(alt))
				self.conection.simple_goto(target_location)

				uav_lat, uav_lon = self.conection.location.global_frame.lat, self.conection.location.global_frame.lon
				subprocess.call('python3 doit.py', shell=True)

				print(f"Distance to target: {remaining_distance}m")

				while True:
					uav_lat, uav_lon = self.conection.location.global_frame.lat, self.conection.location.global_frame.lon

					remaining_distance = haversine(float(lat), float(lon), uav_lat, uav_lon)

					if remaining_distance < 1:
						break
				
				print("Reached target")
				time.sleep(1)
				#replace with zoom
				target_location = LocationGlobalRelative(float(lat), float(lon), float(10))
				self.conection.simple_goto(target_location)
				time.sleep(10)
				uav_lat, uav_lon, uav_alt = self.conection.location.global_frame.lat, self.conection.location.global_frame.alt
				print(f"UAV location: {uav_lat}, {uav_lon}, {uav_alt}")
				with open('sd.txt', 'w') as file:
					file.write(str(i))
				subprocess.call('python3 doit.py', shell=True)
				time.sleep(10)
				i += 1
				
	def upload_mission(self):
		missionList = self.readmission()
		print(f"\nUpload mission from a file: {self.filename}")
		print("Clear Mission")
		self.cmds.clear()
		for command in missionList:
			self.cmds.add(command)
		print("Upload Mission")
		self.cmds.upload()
		
	def readmission(self):
		print(f"\nReading mission from a file: {self.filename}")
		missionList =[]
		with open(self.filename) as f:
			for i,line in enumerate(f):
				if i==0:
					if not line.startswith('QGC WPL 110\n'):
						raise Exception("File is not supported WP version")
					else:
						continue
				linearray=line.split('\t')
				ln_currentwp=int(linearray[1])
				ln_frame=int(linearray[2])
				ln_command=int(linearray[3])
				ln_param1=float(linearray[4])
				ln_param2=float(linearray[5])
				ln_param3=float(linearray[6])
				ln_param4=float(linearray[7])
				ln_param5=float(linearray[8])
				ln_param6=float(linearray[9])
				ln_param7=float(linearray[10])
				ln_autocontinue=int(linearray[11].strip())
				cmd = Command( 0, 0, 0, ln_frame, ln_command, ln_currentwp, ln_autocontinue, ln_param1, ln_param2, ln_param3, ln_param4, ln_param5, ln_param6, ln_param7)
				missionList.append(cmd)
		return missionList
	
	def save_mission(self):
		missionList = self.download_mission()
		output = "QGC WPL 110"
		for cmd in missionList:
			commandline="%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" % (cmd.seq,cmd.current,cmd.frame,cmd.command,cmd.param1,cmd.param2,cmd.param3,cmd.param4,cmd.x,cmd.y,cmd.z,cmd.autocontinue)
			output+=commandline
		with open(self.filename,'w') as f:
			f.write(output)
		print("mission Saved")
	

# if __name__=="__main__":

#     try:
#         sio = Socketio_client(Socket_Connection_String)
#     except Exception as e:
#         print(e)
		
#     drone = connect(DroneIP,wait_ready=False)
#     # drone = Drone(14450).drone
#     # print("drone imported is ", drone)
#     controller = DroneController(sio.socketio_client)
#     controller.telem_running = True

#     # Start telemetry thread
#     try:
#         telemetry_thread = threading.Thread(target=controller.send_telemetry_data, args=(drone,))
#         telemetry_thread.start()
#         print("Telemetry thread started.")
#     except Exception as e:
#         print("Error starting telemetry thread:", e)


#     while True:
#         time.sleep(1)  # Sleep to avoid high CPU usage
		
#         # Check if the flag indicating server connection is False
#         if not sio.flag:
#             print("Server disconnected. Attempting to reconnect...")
#             try:
#                 # Reconnect to the server
#                 sio = Socketio_client(Socket_Connection_String)
#                 controller.sio = sio.socketio_client  # Update the SocketIO client reference in the controller
#                 print("Reconnected to server.")
#             except Exception as e:
#                 print("Error reconnecting to server:", e)
		
