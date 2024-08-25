import time
import os
import threading


class DataController:
    def __init__(self, sio):
        self.sio = sio
        threading.Thread(target=self.send_data).start()

    def send_data(self):
        while True:
            data = {
                "time": time.time(),
                "timings": {"start": 0, "end": 0},
            }
            try:
                self.sio.emit("data", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
            time.sleep(1)
