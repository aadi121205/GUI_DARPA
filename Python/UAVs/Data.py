import time
import threading
import time
import json
from math import radians, cos, sin, asin, sqrt



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
                with open("received_data.json", "r") as f:
                    data = json.load(f)
                data = {
                        "msg": lines[-1:-30:-1],
                        "lastreport": data,
                        "error": "no error",
                        "last update": time.time(),
                    }
                self.sio.emit("Data", data, namespace="/Data")
                time.sleep(0.5)

            except Exception as e:
                print("error: ", str(e))
                time.sleep(10)

