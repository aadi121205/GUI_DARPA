import cv2
import time
import socket
import numpy as np
from collections import deque
import threading

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
    def __init__(self):
        self.f=FPS()
        self.cap=None
        # time.sleep(5)
        self.initialize_camera()
        
    def initialize_camera(self):
        try:
            # Initialize video capture
            self.cap=cv2.VideoCapture(0)
            self.capture_frame()
        except Exception as e:
            print("Exception in Image Capture:",e)
            self.close_camera()
    
    def capture_frame(self):
        print("capture")
        while True:
            ret, frame = self.cap.read()
            color = (0, 255, 0)
            if not ret:
                self.close_camera()
            height, width, channels = frame.shape
            # cv2.imshow("Frame", frame)
            if len(image_queue)>200:
                image_queue.popleft()
            image_queue.append(frame)
            print(len(image_queue))
            key = cv2.waitKey(1)
            if key == 27:
                self.close_camera()
    
    def close_camera(self):
        # Release video capture and close windows
        Socket_class.stop()
        self.cap.release()
        cv2.destroyAllWindows()
        
class Socket_class():
    def __init__(self,host="127.0.0.1",port=4000):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(5)
        self.client_socket=None
        print("Server listening...")
        self.start()
        
    def start(self):
        self.client_socket, addr = self.server_socket.accept()
        print(f"Connection from {addr}")
        
    def encode_frame(self, image):
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
        _, img_encoded = cv2.imencode('.jpg', image, encode_param)
        data = np.array(img_encoded)
        string_data = data.tobytes()
        return string_data

    
    def send_image_data(self,image):
        self.client_socket.sendall(len(image).to_bytes(4, byteorder='big'))
        self.client_socket.sendall(image)
        image_queue.popleft()
        
    def stop(self):
        self.client_socket.close()
        self.server_socket.close()
        
    
if __name__ == '__main__':
    image_queue = deque()
    sock = Socket_class()

    def image_sender(sock,image_queue):
        while True:
            if len(image_queue) > 0:
                current_image = image_queue[0]
                sock.send_image_data(sock.encode_frame(current_image))

    t = threading.Thread(target=Image_Capture)
    t.start()

    t1 = threading.Thread(target=image_sender, args=(sock,image_queue))
    t1.start()

    
## Create a buffer to store images in a array

## empty that buffer by spending it via socket class
    