import os
import cv2
import socket
import numpy as np
import threading
import time

MISSIONS_DIR = os.path.join(os.getcwd(), 'Missions')

if not os.path.isdir(MISSIONS_DIR):
    os.mkdir(MISSIONS_DIR)

mission_folder = str(len(os.listdir(MISSIONS_DIR)) + 1)
MISSION_PATH = os.path.join(MISSIONS_DIR, mission_folder)
os.mkdir(MISSION_PATH)

IMAGE_PATH = os.path.join(MISSION_PATH, 'images')
os.mkdir(IMAGE_PATH)

class FPS():
    def __init__(self):
        self.fpslist = []
        self.last_time = time.time()
    
    def give_fps(self):
        t0 = time.time()
        self.fpslist.append(1/(t0 -self.last_time))
        if len(self.fpslist)>100:
            self.fpslist.pop(0)
        self.last_time = t0
        return int(sum(self.fpslist)/len(self.fpslist))
class Image_Capture():
    def __init__(self,sio):
        self.sio=sio
        self.f=FPS()
        self.cap=None
        self.isCameraRunning=False
        # self.initialize_camera()
        self.i=0
        self.sio.on('start_video',self.capture_frame,namespace="/python")
        self.sio.on('stop_video',self.close_camera,namespace="/python")
        
    def initialize_camera(self):
        try:
            # Attempt to open the camera at index 0
            print("Trying camera index 0")
            self.cap = cv2.VideoCapture(0)
            if not self.cap.isOpened():
                raise Exception("Could not open camera at index 0")
        
        except Exception as e:
            # If opening camera at index 0 fails, try opening camera at index 1
            print("Error in camera index 0:", e)
            print("Trying camera index 1")
            try:
                self.cap = cv2.VideoCapture(1)
                if not self.cap.isOpened():
                    raise Exception("Could not open camera at index 1")
            except Exception as e:
                # If opening camera at index 1 also fails, handle the exception
                print("Error in camera index 1:", e)
                print("Failed to open camera.")

        
    
    def capture_frame(self):
        print("capture")
        self.initialize_camera()
        while True:
            self.i=self.i+1
            ret, frame = self.cap.read()
            color = (0, 255, 0)
            if not ret:
                raise Exception("[Video Stream]: Camera Closed")
            height, width, channels = frame.shape
            self.sio.emit('image',self.encode_frame(frame),namespace="/python")
            cv2.imwrite(os.path.join(IMAGE_PATH, f"{self.i}.jpg"), frame)
            
                
    def encode_frame(self, image):
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
        _, img_encoded = cv2.imencode('.jpg', image, encode_param)
        return img_encoded.tostring()


    
    def close_camera(self):
        try:
            self.cap.release()
        except Exception as e:
            print("[Video Stream] Cant close camera:",e)

# if __name__ == "__main__":
#     video_client = VideoClient("127.0.0.1", 4000)
#     if video_client.client_socket:
#         t1 = threading.Thread(target=video_client.start)
#         t1.start()
