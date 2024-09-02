import time
import os
import threading
import cv2
import random
from ScoringInteractionProtocol import ScoringInteractionProtocol


class DataController:
    def __init__(self, sio):
        self.sio = sio
        self.Scroingapi = ScoringInteractionProtocol("http://127.0.0.1:5000")
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
            
    def register_socket_events(self):
        # Registering all the socket events
        events = {
            "send_data_all": self.send_data_all,
        }
        for event, handler in events.items():
            self.sio.on(event, handler, namespace="/data")

    def send_data(self):
        starttime = time.time()
        while True:
            now = time.time()
            timeelapsed = now - starttime
            elapsed_time_formatted = time.strftime("%H:%M:%S", time.gmtime(timeelapsed))
            data = {
                "time": elapsed_time_formatted,
                "score": random.randint(0, 100),
                "Data": self.Scroingapi.get_status(),
            }
            try:
                self.sio.emit("data", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
                time.sleep(10)
            time.sleep(2)
        
    def send_data_all(self, data):
        self.Scroingapi.post_critical(data["casualty_id"], data["team"], data["system"], data["type"], data["value"])
        self.Scroingapi.post_vitals(data["casualty_id"], data["team"], data["system"], data["type"], data["value"], data["time_ago"])
        self.Scroingapi.post_injury(data["casualty_id"], data["team"], data["system"], data["type"], data["value"])