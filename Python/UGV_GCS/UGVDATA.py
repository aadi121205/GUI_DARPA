import time
import os
import threading
import cv2
import random


class DataController:
    def __init__(self, sio):
        self.sio = sio
        threading.Thread(target=self.send_data).start()

    def imgtojson(self):
        path = os.path.join(os.path.dirname(__file__), "img.jpg")
        img = cv2.imread(path)
        img = cv2.resize(img, (500, 500))
        _, img_encoded = cv2.imencode('.jpg', img)
        img_encoded = img_encoded.tostring()
        return img_encoded

    def send_data(self):
        starttime = time.time()
        while True:
            now = time.time()
            timeelapsed = now - starttime
            elapsed_time_formatted = time.strftime("%H:%M:%S", time.gmtime(timeelapsed))
            data = {
                "time": elapsed_time_formatted,
                "score": random.randint(0, 100),
                "ugv1_frame": self.imgtojson(),
                "ugv2_frame": self.imgtojson(),
                "ugv3_frame": self.imgtojson(),
                "UGV1": {
                    "latitude": 37.7749,
                    "longitude": -122.4194,
                    "altitude": 0,
                    "speed": random.randint(0, 100),
                    "heading": random.randint(0, 360),
                    "battery": random.randint(0, 100),
                    "status": "Active"
                },
                "UGV2": {
                    "latitude": 37.7749,
                    "longitude": -122.4194,
                    "altitude": 0,
                    "speed": random.randint(0, 100),
                    "heading": random.randint(0, 360),
                    "battery": random.randint(0, 100),
                    "status": "Active"
                },
                "UAV1": {
                    "latitude": 37.7749,
                    "longitude": -122.4194,
                    "altitude": 0,
                    "speed": random.randint(0, 100),
                    "heading": random.randint(0, 360),
                    "battery": random.randint(0, 100),
                    "status": "Active"
                },
            }
            try:
                self.sio.emit("data_ugv", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
                time.sleep(10)
            time.sleep(2)