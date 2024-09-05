import time
import os
import threading
import cv2
import random
from finalcodelocal import main


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
                "time": elapsed_time_formatted,
                "frame": self.get_frame,
                "geo_coord": main(),
            }
            try:
                self.sio.emit("datain", data, namespace="/datain")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
                time.sleep(10)
            time.sleep(2)