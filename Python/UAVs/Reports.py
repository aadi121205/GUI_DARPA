import time
import threading
import time
import socketio
import flask
import random
from math import radians, cos, sin, asin, sqrt

import requests

url = "http://localhost/api/initial_report"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4M2Q3OGM4ZS04MzhhLTQ0NzctOWM3Yi02N2VmMTZlNWY3MTYiLCJpIjowfQ.i4KuwEtc5_6oIYz5TDWcdzl5bMkvCpLZTSZG2Avy84w",
    "Content-Type": "application/json"
}

data = {
    "hr": {"value": 0, "time_ago": random.randint(0, 10)},
    "rr": {"value": 0, "time_ago": random.randint(0, 10)},
    "alertness_ocular": {"value": 2, "time_ago": random.randint(0, 10)},
    "alertness_verbal": {"value": 0, "time_ago": random.randint(0, 10)},
    "alertness_motor": {"value": 0, "time_ago": random.randint(0, 10)},
    "severe_hemorrhage": 1,
    "respiratory_distress": 1,
    "trauma_head": 0,
    "trauma_torso": 0,
    "trauma_lower_ext": 0,
    "trauma_upper_ext": 0,
    "temp": {"value": 0, "time_ago": random.randint(0, 10)},
    "casualty_id": random.randint(0, 12),
    "team": "UAS_DTU",
    "system": "test_system",
    "location": {"latitude": 0, "longitude": 0, "time_ago": random.randint(0, 10)},
}

response = requests.post(url, headers=headers, json=data)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())


class Data:
    def __init__(self, sio):
        self.sio = sio
        threading.Thread(target=self.send_data).start()

    def send_data(self):
        while True:
            try:
                f = open("Logs.txt", "r")
                lines = f.readlines()
                f.close()
                data = {
                        "msg": lines[-1:-30:-1],
                        "error": "no error",
                        "last update": time.time(),
                    }
                self.sio.emit("Data", data, namespace="/Data")
                time.sleep(0.5)

            except Exception as e:
                print("error: ", str(e))
                time.sleep(10)

