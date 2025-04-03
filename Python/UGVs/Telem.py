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
    9: "UNKNOWN",
}

class Telem:
    def __init__(self, sio, Master, ID):
        self.ID = ID
        self.RoverIP = Master
        self.sio = sio
        self.UGV_connected = False
        self.UGV_connection = None
        self.goto_mission = "waypoints.txt"
        self.namespace = "/UGV" + str(ID)
        print(self.namespace)

        # Register event handlers
        self.sio.on("ToggelArm", self.ToggelArm, self.namespace)
        self.sio.on("RTL", self.set_rtl, self.namespace)
        self.sio.on("STOP", self.land_UGV, self.namespace)
        self.sio.on("Start_mission", self.flyMission, self.namespace)
        self.sio.on("Auto", self.set_auto, self.namespace)

        self.connect_UGV()
        threading.Thread(target=self.send_telemetry_data).start()

    def connect_UGV(self):
        if not self.UGV_connected:
            try:
                print("Trying to connect UGV...")
                self.UGV_connection = mavutil.mavlink_connection(self.RoverIP)
                self.UGV_connection.wait_heartbeat()
                print("[UGV] Connected to UGV")
                self.UGV_connected = True
            except Exception as e:
                self.UGV_connected = False
                print("[UGV] Connection error: ", str(e))
                time.sleep(1)

    def send_mavlink_command(self, command, params=[]):
        self.UGV_connection.mav.command_long_send(
            self.UGV_connection.target_system,
            self.UGV_connection.target_component,
            command,
            0,
            *params,
        )

    def ToggelArm(self):
        if self.UGV_connection.messages["HEARTBEAT"].base_mode & 0b10000000:
            self.send_mavlink_command(mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM, [0])
            print("Rover disarmed")
        else:
            self.send_mavlink_command(mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM, [1])
            print("Rover armed")

    def set_rtl(self):
        self.send_mavlink_command(mavutil.mavlink.MAV_CMD_NAV_RETURN_TO_LAUNCH)
        print("Returning to launch")

    def land_UGV(self):
        self.send_mavlink_command(mavutil.mavlink.MAV_CMD_NAV_LAND)
        print("Landing initiated")

    def set_auto(self):
        self.UGV_connection.set_mode_auto()
        print("Switched to AUTO mode")

    def send_telemetry_data(self):
        while True:
            try:
                if self.UGV_connected:
                    self.UGV_connection.wait_heartbeat()
                    telemetry_data = {
                        "latitude": self.UGV_connection.messages[
                            "GLOBAL_POSITION_INT"
                        ].lat
                        / 1e7,
                        "longitude": self.UGV_connection.messages[
                            "GLOBAL_POSITION_INT"
                        ].lon
                        / 1e7,
                        "groundspeed": self.UGV_connection.messages[
                            "VFR_HUD"
                        ].groundspeed,
                        "battery": self.UGV_connection.messages[
                            "SYS_STATUS"
                        ].battery_remaining,
                        "armed": self.UGV_connection.messages["HEARTBEAT"].base_mode
                        & 0b10000000
                        != 0,
                        "mode": self.UGV_connection.flightmode,
                        "heading": self.UGV_connection.messages["VFR_HUD"].heading,
                        "Status": MAV_STATE_MAPPING[self.UGV_connection.messages["HEARTBEAT"].system_status],
                    }
                    self.sio.emit("Telem", telemetry_data, namespace="/UGV")
                    msg = self.UGV_connection.recv_match(blocking=True
                    )

                else:
                    self.connect_UGV()
                    time.sleep(5)
                time.sleep(0.5)
            except Exception as e:
                print("Telemetry error: ", str(e))
                self.UGV_connected = False
                self.connect_UGV()
                time.sleep(10)

    def flyMission(self):
        if self.UGV_connection.messages["HEARTBEAT"].base_mode & 0b10000000:
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
            print("Rover not armed")

