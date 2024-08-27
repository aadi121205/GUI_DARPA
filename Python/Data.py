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
        while True:
            fraame = self.get_frame()
            data = {
                "time": time.time(),
                "timings": {"start": 0, "end": 0},
                "frame" : fraame
            }
            try:
                self.sio.emit("data", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
            time.sleep(1)
