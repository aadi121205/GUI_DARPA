from dronekit import connect, VehicleMode, Command, LocationGlobalRelative, APIException
import time
import os
import threading
from dotenv import load_dotenv
from pymavlink import mavutil
from math import radians, cos, sin, asin, sqrt
import subprocess

def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    a = sin((lat2 - lat1) / 2) ** 2 + cos(lat1) * cos(lat2) * sin((lon2 - lon1) / 2) ** 2
    c = 2 * asin(sqrt(a))
    return c * 6371 * 1000

class RoverController3:
    def __init__(self, sio,):
        self.RoverIP = "127.0.0.1:14554"
        self.sio = sio
        self.telem_running = False
        self.ugv_connected = False
        self.ugv_connection = None
        self.cmds = None  # Initialize the cmds attribute
        self.sio.on('arm_rover3', self.on_arm_rover3, namespace="/rover3")
        self.sio.on('disarm_rover3', self.on_disarm_rover3, namespace="/rover3")
        self.sio.on('upload_mission_rover3', self.upload_mission_rover3, namespace="/rover3")
        self.sio.on('readmission_rover3', self.readmission_rover3, namespace="/rover3")
        self.sio.on('save_mission_rover3', self.save_mission_rover3, namespace="/rover3")
        self.sio.on('download_mission_rover3', self.download_mission_rover3, namespace="/rover3")
        self.sio.on('RTL_rover3', self.set_rtl_rover3, namespace="/rover3")
        self.sio.on('goto_rover3', self.goto_rover3, namespace="/rover3")
        self.sio.on('auto_rover3', self.auto_rover3, namespace="/rover3")
        self.sio.on('STOP_rover3', self.set_stop_rover3, namespace="/rover3")
        self.filename = "mission_rover.txt"
        self.goto_mission = "waypointsr.txt"
        self.connect_ugv()
        t2 = threading.Thread(target=self.send_telemetry_data_rover3).start()

    def connect_ugv(self):
        if not self.ugv_connected:
            try:
                print("Trying to connect Rover.....")
                self.ugv_connection = connect(self.RoverIP, wait_ready=True, timeout=5)
                self.cmds = self.ugv_connection.commands  # Initialize cmds after connection
                print("[UGV.py] Connected to UGV at IP/PORT: " + str(self.RoverIP))
                self.ugv_connected = True
            except Exception as e:
                print("[UGV.py] An error occurred: " + str(e))
                self.ugv_connected = False
                time.sleep(5)

    def on_arm_rover3(self):
        print("Received")
        self.ugv_connection.mode = VehicleMode("MANUAL")
        self.ugv_connection.armed = True
        print("Armed")

    def on_disarm_rover3(self):
        self.ugv_connection.armed = False
        print("Disarmed")

    def set_rtl_rover3(self):
        self.ugv_connection.mode = VehicleMode("RTL")

    def upload_mission_rover3(self):
        missionList = self.readmission_rover3()
        print(f"\nUpload mission from a file: {self.filename}")
        print("Clear Mission")
        self.cmds.clear()
        for command in missionList:
            self.cmds.add(command)
        print("Upload Mission")
        self.cmds.upload()

    def readmission_rover3(self):
        print(f"\nReading mission from a file: {self.filename}")
        missionList = []
        with open(self.filename) as f:
            for i, line in enumerate(f):
                if i == 0:
                    if not line.startswith('QGC WPL 110\n'):
                        raise Exception("File is not supported WP version")
                    else:
                        continue
                linearray = line.split('\t')
                ln_currentwp = int(linearray[1])
                ln_frame = int(linearray[2])
                ln_command = int(linearray[3])
                ln_param1 = float(linearray[4])
                ln_param2 = float(linearray[5])
                ln_param3 = float(linearray[6])
                ln_param4 = float(linearray[7])
                ln_param5 = float(linearray[8])
                ln_param6 = float(linearray[9])
                ln_param7 = float(linearray[10])
                ln_autocontinue = int(linearray[11].strip())
                cmd = Command(0, 0, 0, ln_frame, ln_command, ln_currentwp, ln_autocontinue,
                              ln_param1, ln_param2, ln_param3, ln_param4, ln_param5, ln_param6, ln_param7)
                missionList.append(cmd)
        return missionList

    def save_mission_rover3(self):
        missionList = self.download_mission_rover3()
        output = "QGC WPL 110"
        for cmd in missionList:
            commandline = "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" % (
                cmd.seq, cmd.current, cmd.frame, cmd.command, cmd.param1, cmd.param2, cmd.param3,
                cmd.param4, cmd.x, cmd.y, cmd.z, cmd.autocontinue)
            output += commandline
        with open(self.filename, 'w') as f:
            f.write(output)
        print("Mission Saved")

    def download_mission_rover3(self):
        missionList = []
        self.cmds.download()
        self.cmds.wait_ready()
        for cmd in self.cmds:
            missionList.append(cmd)
        return missionList

    def send_telemetry_data_rover3(self):
        while True:
            try:
                if self.ugv_connected and not self.ugv_connection._heartbeat_timeout:
                    try:
                        telemetry_data_rover3 = {
                            "latitude": self.ugv_connection.location.global_relative_frame.lat,
                            "longitude": self.ugv_connection.location.global_relative_frame.lon,
                            "altitude": round(self.ugv_connection.location.global_relative_frame.alt, 2),
                            "airspeed": self.ugv_connection.airspeed,
                            "groundspeed": self.ugv_connection.groundspeed,
                            "mode": self.ugv_connection.mode.name,
                            "battery": self.ugv_connection.battery.level,
                            "armed": self.ugv_connection.armed,
                            "velocity": self.ugv_connection.velocity,
                            "status": self.ugv_connection.system_status.state,
                            "heartbeat":self.ugv_connection.last_heartbeat,
                            "ip": self.RoverIP

                        }
                        try:
                            self.sio.emit('telemetry_rover3', telemetry_data_rover3, namespace="/rover3")
                        except Exception as e:
                            print("[Telem] Telemetry not sent ERROR by rover:", str(e))
                            self.ugv_connected = False
                    except Exception as e:
                        print("[Telem] Telemetry Error:", str(e))
                        self.ugv_connected = False
                        pass
                    time.sleep(1)
                else:
                    self.connect_ugv()
            except Exception as e:
                print("ROVER 1 not connected")
                self.connect_ugv()

    def arm_rover3(self):
        print("Checking basic pre-arm")
        self.ugv_connection.mode = VehicleMode("GUIDED")
        self.ugv_connection.armed = True
        while not self.ugv_connection.armed:
            time.sleep(1)

    def travel_rover(self, lon, lat):
        print("travel called")
        d = haversine(self.ugv_connection.location.global_relative_frame.lon,
                      self.ugv_connection.location.global_relative_frame.lat, lon, lat)
        self.ugv_connection.simple_goto(LocationGlobalRelative(lat, lon))
        while d > 2:
            d = haversine(self.ugv_connection.location.global_relative_frame.lon,
                          self.ugv_connection.location.global_relative_frame.lat, lon, lat)
            time.sleep(1)

    def rover_operation(self, vehicle):
        print("Connected to rover")

    def goto_rover3(self):
        self.arm_rover3()
        Lat = []
        Lon = []
        with open(self.goto_mission, "r") as file:
            for line in file:
                latitude, longitude = line.strip().split(", ")
                Lat.append(float(latitude))
                Lon.append(float(longitude))
        for c in range(len(Lat)):
            self.travel_rover(Lon[c], Lat[c])
            time.sleep(2)
        self.ugv_connection.mode = VehicleMode("RTL")

    def auto_rover3(self):
        self.ugv_connection.mode = VehicleMode("AUTO")

    def run_rover(self, vehicle):
        self.rover_operation(vehicle)

    def set_stop_rover3(self):
        self.ugv_connection.mode = VehicleMode("HOLD")
        print("Rover stopped")

    def gotoMission_rover(self):
        global i
        self.arm_rover3()
        with open('waypoints.txt', 'r') as file:
            for line in file:
                lat, lon = line.strip().split(',')
                target_location = LocationGlobalRelative(float(lat), float(lon))
                self.ugv_connection.simple_goto(target_location)
                ugv_lat, uav_lon = self.ugv_connection.location.global_frame.lat, self.ugv_connection.location.global_frame.lon
                subprocess.call('python3 doit.py', shell=True)
                print(f"Distance to target: {remaining_distance}m")
                while True:
                    ugv_lat, ugv_lon = self.ugv_connection.location.global_frame.lat, self.ugv_connection.location.global_frame.lon
                    remaining_distance = haversine(float(lat), float(lon), ugv_lat, ugv_lon)
                    if remaining_distance < 1:
                        break
                print("Reached target")
                time.sleep(1)
                target_location = LocationGlobalRelative(float(lat), float(lon))
                self.ugv_connection.simple_goto(target_location)
                time.sleep(10)
                ugv_lat, ugv_lon = self.ugv_connection.location.global_frame.lat, self.ugv_connection.location.global_frame.alt
                print(f"UGV location: {ugv_lat}, {ugv_lon}")
                with open('sd.txt', 'w') as file:
                    file.write(str(i))
                subprocess.call('python3 doit.py', shell=True)
                time.sleep(10)
                i += 1