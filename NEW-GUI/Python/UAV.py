from dronekit import connect,VehicleMode,Command,LocationGlobalRelative, APIException
import time
import os
import threading
from dotenv import load_dotenv
from pymavlink import mavutil
# import socketio
# from Python.socket_client import Socketio_client
from math import radians, cos, sin, asin, sqrt
import subprocess
# load_dotenv()
# # from socket_client import Drone

# Socket_Connection_String = os.getenv('SERVER_PORT')
# DroneIP = os.getenv('DRONE_IP_ADDRESS')
# RoverIP = os.getenv('ROVER_IP_ADDRESS')


def haversine(lon1, lat1, lon2, lat2):
	lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
	a = sin((lat2-lat1)/2)**2 + cos(lat1) * cos(lat2) * sin((lon2-lon1)/2)**2
	c = 2 * asin(sqrt(a))
	return c * 6371 * 1000

## Initialize the class for the drone controll
class DroneController:
	def __init__(self,sio):
		## Initialze the socketio-client
		self.DroneIP='127.0.0.1:14550'
		self.sio = sio
		self.telem_running = False
		self.uav_connected= False
		self.uav_connection= None
		## Define event handlers
		# self.sio.on('connect', self.on_connect,namespace="/python")
		# self.sio.on('disconnect', self.on_disconnect,namespace="/python")
		self.sio.on('arm_drone',self.on_arm_drone,namespace="/python")
		self.sio.on('takeoff',self.on_takeoff_drone,namespace="/python")
		self.sio.on('disarm_drone',self.on_disarm_drone,namespace="/python")
		self.sio.on('gimbal_point',self.on_gimbal_point,namespace="/python")
		self.sio.on('upload_mission',self.upload_mission,namespace="/python")
		self.sio.on('readmission',self.readmission,namespace="/python")
		self.sio.on('save_mission',self.save_mission,namespace="/python")
		self.sio.on('download_mission',self.download_mission,namespace="/python")
		self.sio.on('RTL',self.set_rtl,namespace="/python")
		self.sio.on('landUav',self.land_Uav,namespace="/python")
		self.sio.on('goto_drone',self.goto,namespace="/python")
		self.sio.on('odlc_mission',self.flyMission,namespace="/python")
		self.sio.on('set_Guided',self.set_Guided,namespace="/python")
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
				self.uav_connected = False
				time.sleep(5)

	def set_Guided(self):
		self.uav_connection.mode = "GUIDED"
		    
	
	def on_arm_drone(self):
		# drone_vehicle.mode = VehicleMode("GUIDED")
		self.uav_connection.mode = "GUIDED"
		self.uav_connection.armed = True
		print("Armed")
	
	def on_disarm_drone(self):
		self.uav_connection.mode = "LAND"
		self.uav_connection.armed= False
		print("Disarmed")
		# vehicle.mode = "LAND"
		# while True:
		#     print("Altitude", vehicle.location.global_relative_frame.alt)
		#     if vehicle.location.global_relative_frame.alt <:
		#         print("Ready to disarm")
		#         vehicle.armed= False
		#         break
		#     time.sleep(1)
	
	def on_takeoff_drone(self):
		self.uav_connection.mode = "GUIDED"
		self.uav_connection.simple_takeoff(10)
		while True:
			if self.uav_connection.location.global_relative_frame.alt >= 10*0.95:
				print("Reached the target Altitude")
				break

	def set_rtl(self):
		self.uav_connection.mode = "RTL"
	
	def land_Uav(self):
		self.uav_connection.mode = "LAND"

	def on_gimbal_point(self,data):
		pitch = float(data['pitch'])
		roll = float(data['roll'])
		yaw = float(data['yaw'])
		time_ms = 0
		self.check_gimbal_status()
		msg = self.uav_connection.message_factory.command_long_encode(
			0,0,
			mavutil.mavlink.MAV_CMD_DO_MOUNT_CONTROL,
			0,
			0,
			roll,
			pitch,
			yaw,
			time_ms,
			0,0
		)
		self.uav_connection.send_mavlink(msg)
		print(f"Gimbal pointed to {roll} {pitch} {yaw}")

	def check_gimbal_status(self):
	# Request gimbal status
		self.uav_connection.send_mavlink(self.uav_connection.message_factory.command_long_encode(
		0,  # Target system
		0,  # Target component
		mavutil.mavlink.MAV_CMD_REQUEST_MESSAGE,  # Command ID
		0,  # Confirmation
		mavutil.mavlink.MAVLINK_MSG_ID_GIMBAL_REPORT,  # Requested message ID
		0, 0, 0, 0, 0, 0 # Parameters 1-7 (unused)
	))
	
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

	## Sending telem data to the server
	def send_telemetry_data(self):
		while True:
			try:
				if (self.uav_connected & (not self.uav_connection._heartbeat_timeout)):
					# print(self.uav_connection._heartbeat_timeout)
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
						"status":self.uav_connection.system_status.state,
						"heartbeat":self.uav_connection.last_heartbeat
						# "gps_health":vehicle.gps_0.status,
					}
						try:
							self.sio.emit('telemetry',telemetry_data,namespace="/python")
							# print(telemetry_data)
						except Exception as e:
							print("[Telem] Telemetry not send ERROR by UAV:",str(e))
							self.uav_connected=False
					except Exception as e:
						print("[Telem] Telemetry Error:",str(e))
						self.uav_connected=False
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
		
	def run(self,vehicle):
		self.drone_operation(vehicle)

	def flyMission(self):
		global i
		self.arm_and_takeoff(10)
		with open('waypoints.txt', 'r') as file:
			for line in file:
				lat, lon, alt = line.strip().split(',')
				target_location = LocationGlobalRelative(float(lat), float(lon), float(alt))
				self.uav_connection.simple_goto(target_location)

				uav_lat, uav_lon = self.uav_connection.location.global_frame.lat, self.uav_connection.location.global_frame.lon
				subprocess.call('python3 doit.py', shell=True)

				print(f"Distance to target: {remaining_distance}m")

				while True:
					uav_lat, uav_lon = self.uav_connection.location.global_frame.lat, self.uav_connection.location.global_frame.lon

					remaining_distance = haversine(float(lat), float(lon), uav_lat, uav_lon)

					if remaining_distance < 1:
						break
				
				print("Reached target")
				time.sleep(1)
				#replace with zoom
				target_location = LocationGlobalRelative(float(lat), float(lon), float(10))
				self.uav_connection.simple_goto(target_location)
				time.sleep(10)
				uav_lat, uav_lon, uav_alt = self.uav_connection.location.global_frame.lat, self.uav_connection.location.global_frame.alt
				print(f"UAV location: {uav_lat}, {uav_lon}, {uav_alt}")
				with open('sd.txt', 'w') as file:
					file.write(str(i))
				subprocess.call('python3 doit.py', shell=True)
				time.sleep(10)
				i += 1
	

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