import time
import os
import threading
import cv2
import random


class DataController:
    def __init__(self, sio):
        self.sio = sio
        threading.Thread(target=self.send_data).start()

    def path(self):
        lat_long = {i: (random.uniform(-90, 90), random.uniform(-180, 180)) for i in range(10)}
        return lat_long

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
                "uav_frame": self.imgtojson(),
                "criticlal": {
                    "casualty_id": random.randint(0, 100),
                    "team": random.randint(0, 100),
                    "system": random.randint(0, 100),
                    "type": random.randint(0, 100),
                    "value": random.randint(0, 100),
                },
                "path": self.path()
            }
            try:
                self.sio.emit("data", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
                time.sleep(10)
            time.sleep(2)
