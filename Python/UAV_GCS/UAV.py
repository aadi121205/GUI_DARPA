from dronekit import connect, VehicleMode, Command, LocationGlobalRelative
import time
import os
import threading
from math import radians, cos, sin, asin, sqrt
from pymavlink import mavutil
from haversine import haversine

class DroneController:
    def __init__(self, sio):
        self.DroneIP = '127.0.0.1:14550'
        self.sio = sio
        self.telem_running = False
        self.uav_connected = False
        self.uav_connection = None
        self.filename = "mission.txt"
        self.goto_mission = "waypoints.txt"
        
        # Register event handlers
        self.sio.on('arm_drone', self.on_arm_drone, namespace="/python")
        self.sio.on('takeoff', self.takeoff, namespace="/python")
        self.sio.on('disarm_drone', self.on_disarm_drone, namespace="/python")
        self.sio.on('RTL', self.set_rtl, namespace="/python")
        self.sio.on('landUav', self.land_Uav, namespace="/python")
        self.sio.on('fly_mission', self.flyMission, namespace="/python")
        self.sio.on('upload_mission', self.send_mission, namespace="/python")
        self.sio.on('auto_mission', self.set_auto, namespace="/python")
        self.sio.on('write_mission', self.write_mission, namespace="/python")
        self.connect_uav()
        threading.Thread(target=self.send_telemetry_data).start()

    def connect_uav(self):
        if not self.uav_connected:
            try:
                print("Trying to connect UAV...")
                self.uav_connection = connect(self.DroneIP, wait_ready=False, timeout=5, baud=57600)
                print("[UAV.py] Connected to UAV at IP/PORT: " + str(self.DroneIP))
                self.uav_connected = True
            except Exception as e:
                print("[UAV.py] An error occurred: " + str(e))
                time.sleep(5)

    def takeoff(self, altitude=15):
        self.arm_and_takeoff(altitude)
        print("Takeoff Completed")

    def on_arm_drone(self):
        if self.uav_connection.mode != "GUIDED":
            self.uav_connection.mode = "GUIDED"
        self.uav_connection.armed = True
        print("Armed")

    def on_disarm_drone(self):
        self.uav_connection.armed = False
        print("Disarmed")

    def set_rtl(self):
        self.uav_connection.mode = "RTL"

    def land_Uav(self):
        self.uav_connection.mode = "LAND"

    def set_auto(self):
        self.uav_connection.mode = "AUTO"

    def send_telemetry_data(self):
        while True:
            locations = []
            with open('waypoints.txt', 'r') as file:
                for line in file:
                    lat, lon, alt = line.strip().split(',')
                    locations.append((float(lat), float(lon), int(alt)))
            try:
                if self.uav_connected:
                    telemetry_data = {
                        "latitude": self.uav_connection.location.global_relative_frame.lat,
                        "longitude": self.uav_connection.location.global_relative_frame.lon,
                        "altitude": self.uav_connection.location.global_relative_frame.alt,
                        "airspeed": self.uav_connection.airspeed,
                        "groundspeed": self.uav_connection.groundspeed,
                        "mode": self.uav_connection.mode.name,
                        "battery": self.uav_connection.battery.level,
                        "armed": self.uav_connection.armed,
                        "velocity": self.uav_connection.velocity,
                        "state": self.uav_connection.system_status.state,
                        "status": self.uav_connection.is_armable,
                        "heading": self.uav_connection.heading,
                        "heartbeat": self.uav_connection.last_heartbeat,
                        "locations": locations,
                        "ip": self.DroneIP,
                    }
                    try:
                        self.sio.emit('telemetry', telemetry_data, namespace="/python")
                    except Exception as e:
                        print("[Telem] Telemetry not sent ERROR by UAV:")
                        time.sleep(0.5)
                else:
                    self.connect_uav()
                    time.sleep(1)
                time.sleep(1)
            except Exception as e:
                print("UAV 1 not connected")
                self.connect_uav()
                time.sleep(1)
    
    def send_mission(self, *args):
        waypoints = []
        with open('waypoints.txt', 'r') as file:
            for line in file:
                lat, lon, alt = line.strip().split(',')
                waypoints.append((float(lat), float(lon), float(alt)))
        cmds = self.uav_connection.commands
        cmds.clear()  # Clear any existing mission
        for wp in waypoints:
            lat = wp[0]
            lon = wp[1]
            alt = wp[2]
            cmd = Command(0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT,
						mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 10, 0, 0, 0, 
						lat, lon, alt)
            cmds.add(cmd)
        cmds.upload()  # Upload the mission to the vehicle
        print("Mission uploaded successfully.")

    def arm_and_takeoff(self, target_altitude):
        print("Checking basic pre-arm")
        self.uav_connection.mode = "GUIDED"
        self.uav_connection.armed = True

        while not self.uav_connection.armed:
            time.sleep(1)
        print("Take-Off Started")
        self.uav_connection.simple_takeoff(target_altitude)

        while True:
            print("Current Altitude: ", self.uav_connection.location.global_relative_frame.alt)
            if self.uav_connection.location.global_relative_frame.alt >= target_altitude * 0.95:
                print("Reached Target Altitude")
                break
            time.sleep(1)

    def flyMission(self):
        if self.uav_connection.armed:
            if self.uav_connection.location.global_relative_frame.alt >= 10:            
                with open('waypoints.txt', 'r') as file:
                    for line in file:
                        lat, lon, alt = line.strip().split(',')
                        target_location = LocationGlobalRelative(float(lat), float(lon), float(alt))
                        self.uav_connection.simple_goto(target_location)

                        while True:
                            uav_lat = self.uav_connection.location.global_frame.lat
                            uav_lon = self.uav_connection.location.global_frame.lon
                            remaining_distance = haversine(float(lat), float(lon), uav_lat, uav_lon)

                            if self.uav_connection.mode.name != "GUIDED":
                                break

                            if remaining_distance < 1:
                                break
                        
                            print(f"Distance to target: {remaining_distance}m")
                            time.sleep(1)

                        print("Reached target")

                        time.sleep(10)

                        if self.uav_connection.mode.name != "GUIDED":
                            break
                print("Mission completed")
            else:
                print("Drone not Takeoff")
        else:
            print("Drone not armed")
            
    def write_mission(self, waypoints):
        print("Writing mission")
        print(waypoints)
        with open(self.goto_mission, 'w') as file:
            for wp in waypoints:
                file.write(f"{wp[0]},{wp[1]},{wp[2]}\n")