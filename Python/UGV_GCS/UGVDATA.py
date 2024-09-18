import time
import os
import threading
import cv2
import random


class DataController:
    def __init__(self, sio):
        self.sio = sio
        threading.Thread(target=self.send_data).start()
        self.register_socket_events()
        self.goto_mission = "waypoints.txt"

    def register_socket_events(self):
        # Registering all the socket events
        events = {
            "write_map": self.write_mission,
        }
        for event, handler in events.items():
            self.sio.on(event, handler, namespace="/data")

    def imgtojson(self):
        path = os.path.join(os.path.dirname(__file__), "img.jpg")
        img = cv2.imread(path)
        img = cv2.resize(img, (500, 500))
        _, img_encoded = cv2.imencode(".jpg", img)
        img_encoded = img_encoded.tostring()
        return img_encoded

    def send_data(self):
        starttime = time.time()
        while True:
            now = time.time()
            timeelapsed = now - starttime
            elapsed_time_formatted = time.strftime("%H:%M:%S", time.gmtime(timeelapsed))
            locations = []
            with open('waypoints.txt', 'r') as file:
                for line in file:
                    lat, lon = line.strip().split(',')
                    locations.append((float(lat), float(lon)))

            data = {
                "time": elapsed_time_formatted,
                "score": random.randint(0, 100),
                "ugv1_frame": self.imgtojson(),
                "ugv2_frame": self.imgtojson(),
                "ugv3_frame": self.imgtojson(),
                "locations": locations,
            }
            try:
                self.sio.emit("data_ugv", data, namespace="/data")
            except Exception as e:
                print("[Data] Data not sent ERROR by UAV:", str(e))
                time.sleep(10)
            time.sleep(2)

    def write_mission(self, waypoints):
        print("Writing mission")
        print(waypoints)
        with open(self.goto_mission, "w") as file:
            for wp in waypoints:
                file.write(f"{wp[0]},{wp[1]}\n")
    
    def pathplan(self):
        time.sleep(0)
