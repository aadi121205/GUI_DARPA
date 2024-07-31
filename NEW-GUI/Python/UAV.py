from dronekit import connect,VehicleMode,Command,LocationGlobalRelative
import time
import os
import threading
from dotenv import load_dotenv
from math import radians, cos, sin, asin, sqrt
import subprocess

def haversine(lon1, lat1, lon2, lat2):
	lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
	a = sin((lat2-lat1)/2)**2 + cos(lat1) * cos(lat2) * sin((lon2-lon1)/2)**2
	c = 2 * asin(sqrt(a))
	return c * 6371 * 1000

class DroneController:
	def __init__(self,sio):
		self.DroneIP='127.0.0.1:14550'
		self.sio = sio
		self.telem_running = False
		self.uav_connected= False
		self.uav_connection= None
		self.sio.on('arm_drone',self.on_arm_drone,namespace="/python")
		self.sio.on('takeoff',self.takeoff,namespace="/python")
		self.sio.on('disarm_drone',self.on_disarm_drone,namespace="/python")
		self.sio.on('upload_mission',self.upload_mission,namespace="/python")
		self.sio.on('readmission',self.readmission,namespace="/python")
		self.sio.on('save_mission',self.save_mission,namespace="/python")
		self.sio.on('download_mission',self.download_mission,namespace="/python")
		self.sio.on('RTL',self.set_rtl,namespace="/python")
		self.sio.on('landUav',self.land_Uav,namespace="/python")
		self.sio.on('goto_drone',self.goto,namespace="/python")
		self.sio.on('fly_mission',self.flyMission,namespace="/python")
		self.sio.on('circle',self.circle,namespace="/python")
		self.filename = "mission.txt"
		self.goto_mission = "waypoints.txt"
		self.connect_uav()
  		
		t2=threading.Thread(target=self.send_telemetry_data,).start()
		
	def connect_uav(self):
		if not self.uav_connected:
			try:
				print("Trying to connect UAV.....")
				self.uav_connection = connect(self.DroneIP, wait_ready=False, timeout=5)
				print("[UAV.py] Connected to UAV at IP/PORT: " + str(self.DroneIP))
				self.uav_connected = True
			except Exception as e:
				print("[UAV.py] An error occurred: " + str(e))
				time.sleep(5)

	def takeoff(self,altitude=20):
		self.arm_and_takeoff(altitude)
		print("Takeoff Completed")
		
	def on_arm_drone(self):
		if(self.uav_connection.mode!="GUIDED"):
			self.uav_connection.mode = "GUIDED"
		self.uav_connection.armed = True
		print("Armed")
	
	def on_disarm_drone(self):
		self.uav_connection.armed= False
		print("Disarmed")

	def set_rtl(self):
		self.uav_connection.mode = "RTL"
	
	def land_Uav(self):
		self.uav_connection.mode = "LAND"

	def circle(self):
		self.uav_connection.mode = "CIRCLE"

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
	
	def download_mission(self):
		missionList = []
		self.cmds.download()
		self.cmds.wait_ready()
		for cmd in self.cmds:
			missionList.append(cmd)
		return missionList

	def send_telemetry_data(self):
		while True:
			try:
				if (self.uav_connected):
					try:
						telemetry_data = {
						"latitude": self.uav_connection.location.global_relative_frame.lat,
						"longitude": self.uav_connection.location.global_relative_frame.lon,
						"altitude": self.uav_connection.location.global_relative_frame.alt,
						"airspeed": self.uav_connection.airspeed,
						"groundspeed": self.uav_connection.groundspeed,
						"mode": self.uav_connection.mode.name,
						"battery":self.uav_connection.battery.level,
						"armed":self.uav_connection.armed,
						"velocity":self.uav_connection.velocity,
						"state":self.uav_connection.system_status.state,
						"status":self.uav_connection.is_armable,
						"heading":self.uav_connection.heading,
						"heartbeat":self.uav_connection.last_heartbeat,
					}
						try:
							self.sio.emit('telemetry',telemetry_data,namespace="/python")
						except Exception as e:
							print("[Telem] Telemetry not send ERROR by UAV:",str(e))
					except Exception as e:
						print("[Telem] Telemetry Error:",str(e))
						pass
					time.sleep(1)
				else:
					self.connect_uav()
			except Exception as e:
				print("UAV 1 not connected")
				self.connect_uav()

	def arm_and_takeoff(self,target_altitude):
		print("Checking basic pre-arm")
		self.uav_connection.mode = "GUIDED"
		self.uav_connection.armed = True

		while not self.uav_connection.armed:
			time.sleep(1)
		print("Take-Off Started")
		self.uav_connection.simple_takeoff(target_altitude)

		while True:
			print("Current Altitude: ", self.uav_connection.location.global_relative_frame.alt)
			if self.uav_connection.location.global_relative_frame.alt >= target_altitude*0.95:
				print("Reached Target Altitude")
				break
			time.sleep(1)

	def travel(self, lon, lat, alt):
		print("travel called")
		d = haversine(self.uav_connection.location.global_relative_frame.lon, self.uav_connection.location.global_relative_frame.lat, lon, lat)
		self.uav_connection.simple_goto(LocationGlobalRelative(lat, lon, alt))
		while d>2:
			d = haversine(self.uav_connection.location.global_relative_frame.lon, self.uav_connection.location.global_relative_frame.lat, lon, lat)
			# print(d)
			time.sleep(1)
	
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
		print("Mission completed")

	def flyMission(self):
		self.arm_and_takeoff(10)
		with open('waypoints.txt', 'r') as file:
			for line in file:
				lat, lon, alt = line.strip().split(',')
				target_location = LocationGlobalRelative(float(lat), float(lon), float(alt))
				self.uav_connection.simple_goto(target_location)

				uav_lat, uav_lon = self.uav_connection.location.global_frame.lat, self.uav_connection.location.global_frame.lon

				while True:
					uav_lat, uav_lon = self.uav_connection.location.global_frame.lat, self.uav_connection.location.global_frame.lon

					remaining_distance = haversine(float(lat), float(lon), uav_lat, uav_lon)

					if remaining_distance < 1:
						break
				
					print(f"Distance to target: {remaining_distance}m")

				print("Reached target")
				time.sleep(1)
		self.uav_connection.mode = "RTL"
		print("Mission completed")	
