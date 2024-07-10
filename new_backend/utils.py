import base64 
import numpy as np
import cv2
def decode_image(base64img):
    print(len(base64img))
    img_binary = base64.b64decode(base64img)
    # Convert binary data to NumPy array
    nparr = np.frombuffer(img_binary, np.uint8)
    nparr= cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # nparr=np.reshape(nparr,(575, 850, 3))
    return nparr
def schedule_reciever(dict):
    print(f'recieved the schedule :{dict}')