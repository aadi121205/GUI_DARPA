import time
import threading
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

                # Ensure no line exceeds 30 characters
                lines = [line[i:i+30] + '\n' if len(line) > 60 else line 
                         for line in lines for i in range(0, len(line), 30)]

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
