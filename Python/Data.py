import time
import os
import threading
import cv2
import random

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
        starttime = time.time()
        while True:
            now = time.time()
            timeelapsed = now - starttime
            elapsed_time_formatted = time.strftime("%H:%M:%S", time.gmtime(timeelapsed))
            data = {
                "CasualtyID": random.randint(1, 16),
                "Time": elapsed_time_formatted,
                "Team": "UASDTU",
                "User": "UXV",
                "Data": {
                    "critical": {
                        "severe_hemorrhage": random.randint(0, 1),
                        "respiratory_distress": random.randint(0, 1),
                    },
                    "hr": {
                        "value": random.randint(60, 100),
                        "time": time.strftime("%H:%M:%S")
                    },
                    "rr": {
                        "value": random.randint(12, 20),
                        "time": time.strftime("%H:%M:%S")
                    },
                    "injury": {
                        "alertness_motor": random.randint(0, 1),
                        "alertness_verbal": random.randint(0, 1),
                        "alertness_ocular": random.randint(0, 1),
                        "trauma_head": random.randint(0, 1),
                        "trauma_torso": random.randint(0, 1),
                        "trauma_lower_ext": random.randint(0, 1),
                        "trauma_upper_ext": random.randint(0, 1),
                    },
                }
            }
            try:
                self.sio.emit("data", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
                time.sleep(10)
            time.sleep(2)