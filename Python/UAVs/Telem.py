import time
import threading
from pymavlink import mavutil
import time
import socketio
from math import radians, cos, sin, asin, sqrt


def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    a = (
        sin((lat2 - lat1) / 2) ** 2
        + cos(lat1) * cos(lat2) * sin((lon2 - lon1) / 2) ** 2
    )
    c = 2 * asin(sqrt(a))
    return c * 6371 * 1000


MAV_STATE_MAPPING = {
    0: "UNINIT",
    1: "BOOT",
    2: "CALIBRATING",
    3: "STANDBY",
    4: "ACTIVE",
    5: "CRITICAL",
    6: "EMERGENCY",
    7: "POWEROFF",
    8: "FLIGHT_TERMINATION",
}


class Telem:
    def __init__(self, sio):
        self.DroneIP = "127.0.0.1:14550"
        self.sio = sio
        self.uav_connected = False
        self.uav_connection = None
        self.goto_mission = "waypoints.txt"
        self.heartbeat_time = time.time()
        self.timesince_last_heartbeat = 0

        # Register event handlers
        self.sio.on("arm", self.arm, namespace="/UAV")
        self.sio.on("Takeoff", self.takeoff, namespace="/UAV")
        self.sio.on("RTL", self.set_rtl, namespace="/UAV")
        self.sio.on("landUav", self.land_Uav, namespace="/UAV")
        self.sio.on("fly_mission", self.flyMission, namespace="/UAV")
        self.sio.on("auto_mission", self.set_auto, namespace="/UAV")

        self.connect_uav()
        threading.Thread(target=self.send_telemetry_data).start()

    def connect_uav(self):
        if not self.uav_connected:
            try:
                print("Trying to connect UAV...")
                self.uav_connection = mavutil.mavlink_connection(self.DroneIP)
                self.uav_connection.wait_heartbeat()
                print("[UAV] Connected to UAV")
                self.uav_connected = True
            except Exception as e:
                self.uav_connected = False
                print("[UAV] Connection error: ", str(e))
                time.sleep(1)

    def send_mavlink_command(self, command, params=[]):
        self.uav_connection.mav.command_long_send(
            self.uav_connection.target_system,
            self.uav_connection.target_component,
            command,
            0,
            *params,
        )

    def arm(self, data):
        print(data)
        heartbeat = self.uav_connection.messages.get("HEARTBEAT")
        if heartbeat and hasattr(heartbeat, "base_mode"):
            if heartbeat.base_mode & 0b10000000:
                self.send_mavlink_command(
                    mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,
                    [0, 0, 0, 0, 0, 0, 0, 0],
                )
                print("Drone disarmed")
            else:
                self.send_mavlink_command(
                    mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,
                    [1, 0, 0, 0, 0, 0, 0, 0],
                )
                print("Drone armed")
        else:
            print("HEARTBEAT message not received yet.")

    def takeoff(self, altitude=15):
        # Check if drone is armed, if not, arm it
        heartbeat = self.uav_connection.messages.get("HEARTBEAT")
        if heartbeat and hasattr(heartbeat, "base_mode"):
            if not (heartbeat.base_mode & 0b10000000):
                self.send_mavlink_command(
                    mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,
                    [1, 0, 0, 0, 0, 0, 0, 0],
                )
                print("Drone armed for takeoff")
                time.sleep(2)
        else:
            print("HEARTBEAT message not received yet.")
            return

        # Set mode to GUIDED before takeoff
        self.uav_connection.set_mode_guided()
        print("Mode set to GUIDED")

        # Send takeoff command
        self.send_mavlink_command(
            mavutil.mavlink.MAV_CMD_NAV_TAKEOFF, [0, 0, 0, 0, 0, 0, altitude]
        )
        print("Takeoff initiated")

    def set_rtl(self):
        self.send_mavlink_command(mavutil.mavlink.MAV_CMD_NAV_RETURN_TO_LAUNCH)
        print("Returning to launch")

    def land_Uav(self):
        self.send_mavlink_command(mavutil.mavlink.MAV_CMD_NAV_LAND)
        print("Landing initiated")

    def set_auto(self):
        self.uav_connection.set_mode_auto()
        print("Switched to AUTO mode")

    def send_telemetry_data(self):
        while True:
            try:
                if self.uav_connected:
                    self.uav_connection.wait_heartbeat()
                    self.timesince_last_heartbeat = time.time() - self.heartbeat_time
                    telemetry_data = {
                        "latitude": self.uav_connection.messages[
                            "GLOBAL_POSITION_INT"
                        ].lat
                        / 1e7,
                        "longitude": self.uav_connection.messages[
                            "GLOBAL_POSITION_INT"
                        ].lon
                        / 1e7,
                        "altitude": self.uav_connection.messages[
                            "GLOBAL_POSITION_INT"
                        ].alt
                        / 1000,
                        "groundspeed": self.uav_connection.messages[
                            "VFR_HUD"
                        ].groundspeed,
                        "battery": self.uav_connection.messages[
                            "SYS_STATUS"
                        ].voltage_battery
                        / 1000.0,
                        "armed": self.uav_connection.messages["HEARTBEAT"].base_mode
                        & 0b10000000
                        != 0,
                        "mode": self.uav_connection.flightmode,
                        "heading": self.uav_connection.messages["VFR_HUD"].heading,
                        "Status": MAV_STATE_MAPPING[
                            self.uav_connection.messages["HEARTBEAT"].system_status
                        ],
                        "Last_Heartbeat": self.timesince_last_heartbeat,
                    }
                    self.heartbeat_time = time.time()
                    self.sio.emit("Telem", telemetry_data, namespace="/UAV")
                    msg = self.uav_connection.recv_match(blocking=True)

                else:
                    self.connect_uav()
                    time.sleep(5)
                time.sleep(0.5)
            except Exception as e:
                print("Telemetry error: ", str(e))
                self.uav_connected = False
                self.connect_uav()
                time.sleep(10)

    def flyMission(self):
        if self.uav_connection.messages["HEARTBEAT"].base_mode & 0b10000000:
            with open("waypoints.txt", "r") as file:
                for line in file:
                    lat, lon, alt = line.strip().split(",")
                    self.send_mavlink_command(
                        mavutil.mavlink.MAV_CMD_NAV_WAYPOINT,
                        [0, 0, 0, 0, float(lat), float(lon), float(alt)],
                    )
                    time.sleep(10)
            print("Mission completed")
        else:
            print("Drone not armed")
