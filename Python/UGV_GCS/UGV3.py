from dronekit import connect, VehicleMode, LocationGlobalRelative, Command
from pymavlink import mavutil
import time
import threading
from math import radians, cos, sin, asin, sqrt
from haversine import haversine


class RoverController3:
    def __init__(self, sio):
        self.RoverIP = "127.0.0.1:14554"
        self.sio = sio
        self.telem_running = False
        self.ugv_connected = False
        self.ugv_connection = None
        self.cmds = None
        self.filename = "mission_rover.txt"
        self.goto_mission = "waypointsr3.txt"

        # Register event handlers for the socket
        self.register_socket_events()

        # Try to connect to the UGV and start telemetry thread
        self.connect_ugv()
        threading.Thread(target=self.send_telemetry_data_rover3, daemon=True).start()

    def register_socket_events(self):
        # Registering all the socket events
        events = {
            "arm_rover": self.on_arm_rover,
            "disarm_rover": self.on_disarm_rover,
            "RTL_rover": self.set_rtl_rover,
            "goto_rover": self.goto_rover,
            "auto_rover": self.auto_rover,
            "STOP_rover": self.set_stop_rover,
            "upload_mission_rover": self.upload_mission_rover,
            "write_mission": self.write_mission,
        }
        for event, handler in events.items():
            self.sio.on(event, handler, namespace="/rover3")

    def connect_ugv(self):
        # Attempt to connect to the UGV, retrying on failure
        while not self.ugv_connected:
            try:
                print("Attempting to connect to Rover...")
                self.ugv_connection = connect(self.RoverIP, wait_ready=True, timeout=5)
                self.cmds = self.ugv_connection.commands
                print(f"[UGV.py] Connected to UGV at IP/PORT: {self.RoverIP}")
                self.ugv_connected = True
            except Exception as e:
                print(f"[UGV.py] Connection error: {e}")
                time.sleep(5)

    def on_arm_rover(self, *args):
        # Arm the rover in MANUAL mode
        print("Arming Rover...")
        self.ugv_connection.mode = VehicleMode("MANUAL")
        self.ugv_connection.armed = True
        print("Rover Armed")

    def on_disarm_rover(self, *args):
        # Disarm the rover
        print("Disarming Rover...")
        self.ugv_connection.armed = False
        print("Rover Disarmed")

    def set_rtl_rover(self, *args):
        # Set the rover to return-to-launch mode
        print("Setting Rover to RTL mode...")
        self.ugv_connection.mode = VehicleMode("RTL")

    def send_telemetry_data_rover3(self):
        while True:
            locations = []
            with open(self.goto_mission, "r") as file:
                for line in file:
                    lat, lon = line.strip().split(",")
                    locations.append((float(lat), float(lon)))
            try:
                if self.ugv_connected and not self.ugv_connection._heartbeat_timeout:
                    try:
                        telemetry_data = {
                            "latitude": self.ugv_connection.location.global_relative_frame.lat,
                            "longitude": self.ugv_connection.location.global_relative_frame.lon,
                            "altitude": round(
                                self.ugv_connection.location.global_relative_frame.alt,
                                2,
                            ),
                            "airspeed": self.ugv_connection.airspeed,
                            "groundspeed": self.ugv_connection.groundspeed,
                            "mode": self.ugv_connection.mode.name,
                            "battery": self.ugv_connection.battery.level,
                            "armed": self.ugv_connection.armed,
                            "velocity": self.ugv_connection.velocity,
                            "status": self.ugv_connection.system_status.state,
                            "heartbeat": self.ugv_connection.last_heartbeat,
                            "locations": locations,
                            "ip": self.RoverIP,
                        }
                        self.sio.emit(
                            "telemetry_rover3", telemetry_data, namespace="/rover3"
                        )
                    except Exception as e:
                        print(f"[Telem] Error sending telemetry data: {e}")
                        self.ugv_connected = False
                    time.sleep(1)
                else:
                    self.connect_ugv()
            except Exception as e:
                print("Rover connection lost, attempting to reconnect...")
                self.connect_ugv()

    def arm_rover(self):
        # Arm the rover and set it to GUIDED mode
        print("Arming Rover in GUIDED mode...")
        self.ugv_connection.mode = VehicleMode("GUIDED")
        self.ugv_connection.armed = True
        while not self.ugv_connection.armed:
            print("Waiting for Rover to arm...")
            time.sleep(1)

    def upload_mission_rover(self, *args):
        waypoints = []
        with open(self.goto_mission, "r") as file:
            for line in file:
                lat, lon = line.strip().split(",")
                waypoints.append((float(lat), float(lon)))

        cmds = self.ugv_connection.commands
        cmds.clear()

        for wp in waypoints:
            lat, lon = wp
            cmd = Command(
                0,
                0,
                0,
                mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT,
                mavutil.mavlink.MAV_CMD_NAV_WAYPOINT,
                0,
                0,
                0,
                0,
                0,
                0,
                lat,
                lon,
                0,
            )
            cmds.add(cmd)

        cmds.upload()  # Upload the mission to the vehicle
        print("Mission uploaded successfully.")

    def auto_rover(self, *args):
        print("Setting Rover to AUTO mode...")
        self.ugv_connection.mode = VehicleMode("AUTO")

    def set_stop_rover(self, *args):
        print("Stopping Rover...")
        self.ugv_connection.mode = VehicleMode("HOLD")
        print("Rover stopped")

    def goto_rover(self, *args):
        waypoints = []
        with open(self.goto_mission, "r") as file:
            for line in file:
                lat, lon = line.strip().split(",")
                waypoints.append((float(lat), float(lon)))

        cmds = self.ugv_connection.commands
        cmds.clear()

        wp = waypoints[0]
        print(f"Going to waypoint: {wp}")
        lat, lon = wp
        cmd = Command(
            0,
            0,
            0,
            mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT,
            mavutil.mavlink.MAV_CMD_NAV_WAYPOINT,
            0,
            0,
            0,
            0,
            0,
            0,
            lat,
            lon,
            0,
        )
        cmds.add(cmd)

        cmds.upload()
        self.ugv_connection.mode = VehicleMode("AUTO")
        print("Rover set to Goto mode.")
        
    def write_mission(self, waypoints):
        print("Writing mission")
        print(waypoints)
        with open(self.goto_mission, 'w') as file:
            for wp in waypoints:
                file.write(f"{wp[0]},{wp[1]},{wp[2]}\n")