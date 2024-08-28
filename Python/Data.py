import time
import os
import threading
import cv2


class DataController:
    def __init__(self, sio):
        self.sio = sio
        threading.Thread(target=self.send_data).start()

    def get_frame(self):
        cap = cv2.VideoCapture(0)
        while True:
            ret, frame = cap.read()
            if ret:
                ret, jpeg = cv2.imencode('.jpg', frame)
                if ret:
                    yield jpeg.tobytes()
            else:
                return None
    
    def send_data(self):
        ctr = 1  # Initialize counter outside the loop
        while True:
            data = {
                "CasualtyID": ctr,
                "LatLong": ctr,  # Assuming i was meant to be ctr or another value
                "Data": {
                    "critical": {
                        "severe_hemorrhage": 0,
                        "respiratory_distress": 0,
                    },
                    "hr": {
                        "value": 0,
                        "time": time.strftime("%H:%M:%S")
                    },
                    "rr": {
                        "value": 0,
                        "time": time.strftime("%H:%M:%S")
                    },
                    "injury": {
                        "alertness_motor": 0,
                        "alertness_verbal": 0,
                        "alertness_ocular": 0,
                        "trauma_head": 0,
                        "trauma_torso": 0,
                        "trauma_lower_ext": 0,
                        "trauma_upper_ext": 0,
                    },
                }
            }
            
            
            try:
                self.sio.emit("data", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
            time.sleep(1)
            ctr += 1  # Increment counter for the next loop





""" import time
import os
import threading
import cv2


class DataController:
    def __init__(self, sio):
        self.sio = sio
        threading.Thread(target=self.send_data).start()

    def get_frame(self):
        cap = cv2.VideoCapture(0)
        while True:
            ret, frame = cap.read()
            if ret:
                ret, jpeg = cv2.imencode('.jpg', frame)
                if ret:
                    yield jpeg.tobytes()
            else:
                return None
    
    def send_data(self):
        ctr = 1  # Initialize counter outside the loop
        while True:
            data = {
                "CasualtyID": ctr,
                "LatLong": ctr,  # Assuming i was meant to be ctr or another value
                "Data": {
                    "critical": {
                        "severe_hemorrhage": 0,
                        "respiratory_distress": 0,
                    },
                    "hr": {
                        "value": 0,
                        "time": time.strftime("%H:%M:%S")
                    },
                    "rr": {
                        "value": 0,
                        "time": time.strftime("%H:%M:%S")
                    },
                    "injury": {
                        "alertness_motor": 0,
                        "alertness_verbal": 0,
                        "alertness_ocular": 0,
                        "trauma_head": 0,
                        "trauma_torso": 0,
                        "trauma_lower_ext": 0,
                        "trauma_upper_ext": 0,
                    },
                    "Data_Sent": {
                        "Clock": time.strftime("%H:%M:%S"),
                        "Team": "UASDTU",
                        "user": "UXV",
                        "remaining_reports": {
                            "critical": {
                            "hemorrhage": 0,
                            "distress": 0,
                            },
                            "vitals": {
                            "heart": 0,
                            "respiratory": 0,
                            },
                            "injury": {
                            "trauma_head": 0,
                            "trauma_torso": 0,
                            "trauma_lower_ext": 0,
                            "trauma_upper_ext": 0,
                            "alertness_ocular": 0,
                            "alertness_verbal": 0,
                            "alertness_motor": 0,
                            }
                            }
                    },
                }
            }
            
            
            try:
                self.sio.emit("data", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
            time.sleep(1)
            ctr += 1  # Increment counter for the next loop
 """