from flask import Flask, jsonify
from dronekit import connect, VehicleMode
import time

class UAVTelemetry:
    def __init__(self, DroneIP):
        self.DroneIP = DroneIP
        self.uav_connected = False
        self.uav_connection = None
        self.app = Flask(__name__)
        self.setup_routes()
        
    def setup_routes(self):
        @self.app.route('/telemetry', methods=['GET'])
        def get_telemetry():
            return jsonify(self.send_telemetry_data())

    def connect_uav(self):
        if not self.uav_connected:
            try:
                print("Trying to connect UAV...")
                self.uav_connection = connect(self.DroneIP, wait_ready=False, timeout=5, baud=57600)
                print(f"Connected to UAV at IP/PORT: {self.DroneIP}")
                self.uav_connected = True
            except Exception as e:
                self.uav_connected = False
                print(f"An error occurred: {str(e)}")
                time.sleep(1)

    def send_telemetry_data(self):
                
        telemetry_data = {}
        if self.uav_connected:
            try:
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
                   # "locations": locations,
                    "ip": self.DroneIP,
                }
            except Exception as e:
                print(f"Error gathering telemetry data: {str(e)}")
                self.uav_connected = False
                self.connect_uav()
        else:
            self.connect_uav()
        # print(telemetry_data)
        if "heartbeat" in telemetry_data and telemetry_data["heartbeat"] is not None:
            if telemetry_data["heartbeat"]>10:
                print("Heartbeat is greater than 10")
                self.uav_connected = False
                self.connect_uav()  
        return telemetry_data

    def run(self):
        self.app.run(host='0.0.0.0', port=5000)

if __name__ == "__main__":
    drone = UAVTelemetry(DroneIP='127.0.0.1:14550')  # Replace with your drone IP
    drone.run()
