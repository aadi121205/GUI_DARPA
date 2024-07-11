import socketio
from utils import decode_image,schedule_reciever
import cv2
import matplotlib.pyplot as plt
from random_json import imitate_json as imitate_json
import random
import base64
# Create a Socket.IO client
sio = socketio.Client()
device_id='ugv_1'



# Define event handlers
@sio.event
def connect():
    print('Connected to server')
    sio.emit(event='custom_id',data=device_id)

@sio.event
def disconnect():
    print('Disconnected from server')
    
@sio.on('schedule')
def schedule(data):
    for dict in data:
        if dict['device_id']==device_id:
            dict['data']['map']=decode_image(dict['data']['map'])
            schedule_reciever(dict['data'])
            print('------------------------------------------------------')
            img=cv2.imread('sample/map.jpg')
            print(img.shape)
            _,img=cv2.imencode('.jpg',img)
            img= base64.b64encode(img).decode('utf-8')
            sio.emit('frames',img)
    
    while True:
            if random.random()>0.9999999:
                dict=imitate_json(device_id)
                dict['system']=device_id
                sio.emit('inferance',dict)
            

# Connect to the server
sio.connect('http://localhost:8000')


# Wait for events
sio.wait()
