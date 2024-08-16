from dronekit import connect, VehicleMode, LocationGlobalRelative
import time
import threading
from math import radians, cos, sin, asin, sqrt

def haversine(lon1, lat1, lon2, lat2):
    # Calculate the great-circle distance between two points on the Earth
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    a = sin((lat2 - lat1) / 2) ** 2 + cos(lat1) * cos(lat2) * sin((lon2 - lon1) / 2) ** 2
    c = 2 * asin(sqrt(a))
    return c * 6371 * 1000  # Return distance in meters

class RoverController:
    def __init__(self, sio):
        self.RoverIP = "127.0.0.1:14552"
        self.sio = sio
        self.telem_running = False
        self.ugv_connected = False
        self.ugv_connection = None
        self.cmds = None
        self.filename = "mission_rover.txt"
        self.goto_mission = "waypointsr.txt"
        
        # Register event handlers for the socket
        self.register_socket_events()

        # Try to connect to the UGV and start telemetry thread
        self.connect_ugv()
        threading.Thread(target=self.send_telemetry_data_rover, daemon=True).start()

    def register_socket_events(self):
        # Registering all the socket events
        events = {
            'arm_rover': self.on_arm_rover,
            'disarm_rover': self.on_disarm_rover,
            'upload_mission_rover': self.upload_mission_rover,
            'readmission_rover': self.readmission_rover,
            'save_mission_rover': self.save_mission_rover,
            'download_mission_rover': self.download_mission_rover,
            'RTL_rover': self.set_rtl_rover,
            'goto_rover': self.goto_rover,
            'auto_rover': self.auto_rover,
            'STOP_rover': self.set_stop_rover,
        }
        for event, handler in events.items():
            self.sio.on(event, handler, namespace="/rover")

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

    def upload_mission_rover(self, *args):
        # Upload mission waypoints to the rover
        print("Uploading mission to Rover...")
        coordinates = self.readmission_rover()
        for lat, lon in coordinates:
            location = LocationGlobalRelative(lat, lon, 10)  # Altitude set to 10 meters
            self.ugv_connection.simple_goto(location)
            print(f"Moving to location: Latitude={lat}, Longitude={lon}")
            time.sleep(30)  # Wait to reach destination

    def readmission_rover(self, *args):
        # Read mission waypoints from file
        coordinates = []
        try:
            with open(self.filename, 'r') as file:
                header = file.readline().strip()
                if header == "QGC WPL 110":
                    for line in file:
                        components = line.strip().split('\t')
                        if len(components) >= 12:
                            try:
                                lat = float(components[8])
                                lon = float(components[9])
                                coordinates.append((lat, lon))
                            except ValueError as e:
                                print(f"Skipping line due to error: {e}")
        except FileNotFoundError:
            print(f"File {self.filename} not found.")
        return coordinates

    def save_mission_rover(self, *args):
        # Save the current mission to a file
        print("Saving mission...")
        mission_list = self.download_mission_rover()
        output = "QGC WPL 110\n"
        for cmd in mission_list:
            output += "\t".join(map(str, [
                cmd.seq, cmd.current, cmd.frame, cmd.command, cmd.param1, cmd.param2,
                cmd.param3, cmd.param4, cmd.x, cmd.y, cmd.z, cmd.autocontinue
            ])) + "\n"
        with open(self.filename, 'w') as file:
            file.write(output)
        print("Mission saved successfully")

    def download_mission_rover(self, *args):
        # Download the mission from the rover
        print("Downloading mission from Rover...")
        mission_list = []
        self.cmds.download()
        self.cmds.wait_ready()
        mission_list = list(self.cmds)
        return mission_list

    def send_telemetry_data_rover(self):
        # Continuously send telemetry data from the rover
        locations = []
        with open(self.goto_mission, 'r') as file:
            for line in file:
                lat, lon = line.strip().split(',')
                locations.append((float(lat), float(lon)))
        while True:
            try:
                if self.ugv_connected and not self.ugv_connection._heartbeat_timeout:
                    try:
                        telemetry_data = {
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
                            "heartbeat": self.ugv_connection.last_heartbeat,
                            "locations":locations,
                            "ip": self.RoverIP,
                        }
                        self.sio.emit('telemetry_rover', telemetry_data, namespace="/rover")
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

    def travel_rover(self, lon, lat):
        # Command the rover to travel to a specific location
        print(f"Traveling to: Latitude={lat}, Longitude={lon}")
        distance = haversine(self.ugv_connection.location.global_relative_frame.lon,
                             self.ugv_connection.location.global_relative_frame.lat, lon, lat)
        self.ugv_connection.simple_goto(LocationGlobalRelative(lat, lon))
        while distance > 2:  # Stop when within 2 meters of the target
            distance = haversine(self.ugv_connection.location.global_relative_frame.lon,
                                 self.ugv_connection.location.global_relative_frame.lat, lon, lat)
            time.sleep(1)

    def goto_rover(self, *args):
        # Execute the goto mission
        print("Starting Goto Mission...")
        self.arm_rover()
        Lat, Lon = [], []
        try:
            with open(self.goto_mission, "r") as file:
                for line in file:
                    latitude, longitude = map(float, line.strip().split(", "))
                    Lat.append(latitude)
                    Lon.append(longitude)
        except FileNotFoundError:
            print(f"File {self.goto_mission} not found.")
            return
        for lat, lon in zip(Lat, Lon):
            self.travel_rover(lon, lat)
            time.sleep(2)
        self.ugv_connection.mode = VehicleMode("RTL")
        print("Goto Mission completed, returning to launch")

    def auto_rover(self, *args):
        # Set the rover to AUTO mode
        print("Setting Rover to AUTO mode...")
        self.ugv_connection.mode = VehicleMode("AUTO")

    def set_stop_rover(self, *args):
        # Stop the rover by setting it to HOLD mode
        print("Stopping Rover...")
        self.ugv_connection.mode = VehicleMode("HOLD")
        print("Rover stopped")
