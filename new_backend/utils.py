import base64 
import numpy as np
import cv2
from time import time
def decode_image(base64img):
    print(len(base64img))
    img_binary = base64.b64decode(base64img)
    # Convert binary data to NumPy array
    nparr = np.frombuffer(img_binary, np.uint8)
    nparr= cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # nparr=np.reshape(nparr,(575, 850, 3))
    return nparr
def return_severe_ham():
    return {'value':0,'type':'severe_hemorrhage'}
def return_resp_distress():
    return {'value':1,'type':'respiratory_distress'}
def return_hr():
    return {'type':'hr','value':75,'time':time()-15}
def return_rr():
    return {'type':'rr','value':17,'time':time()-10}
def return_alertness_verbal():
    return {'value':1,'type':'alertness_verbal'}
def return_alertness_occular():
    return {'value':0,'type':'alertness_occular'}
def return_alertness_motor():
    return {'value':1,'type':'alertness_motor'}
def return_trauma():
    return {'value':2,'type':"trauma_head"}

    
def schedule_reciever(dict):
    print(f'recieved the schedule :{dict}')