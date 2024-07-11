import socketio
# import io
# from PIL import Image
import json
import base64
import cv2
from random_json import imitate_json as imitiate_json
import random
img=cv2.imread('sample/map.jpg')
print(img.shape)
_,img=cv2.imencode('.jpg',img)
img= base64.b64encode(img).decode('utf-8')
print('image shape',len(img))
# Create a Socket.IO client
sio = socketio.Client()
device_id='uav'
# Define event handlers

"""
    Global JSON Format
        CasualtyID: value: int:1-10
        LatLong: [x.x,y.y]
        Data: 
            "severe_hemorrhage": value,
            "respiratory_distress":value,
            "hr": value;time,
            "rr": value;time,
            "alertness_motor":value,
            "alertness_verbal":value,
            "alertness_ocular":value,
            "trauma_head":value,
            "trauma_torso":value,
            "trauma_lower_ext":value,
            "trauma_upper_ext":value
"""

# Initializing the JSON structure
json_data = [
    {
        "CasualtyID": 1,
        "LatLong": [0.0, 0.0],
        "Data": {
            "severe_hemorrhage": 0,
            "respiratory_distress": 0,
            "hr": {
                "value": 0,
                "time": "00:00:00"
            },
            "rr": {
                "value": 0,
                "time": "00:00:00"
            },
            "alertness_motor": 0,
            "alertness_verbal": 0,
            "alertness_ocular": 0,
            "trauma_head": 0,
            "trauma_torso": 0,
            "trauma_lower_ext": 0,
            "trauma_upper_ext": 0
        }
    },
]

json_string = json.dumps(json_data, indent=0)
print(json_string)


#sample function
def schedule_reciever(dict):
    print(f'recieved the schedule :{dict}')

@sio.on('connect')
def connect():
    print('Connected to server')
    sio.emit(event='custom_id',data=device_id)
    # sio.emit('chat message', 'Hello from Python client!')

@sio.on('disconnect')
def disconnect():
    print('Disconnected from server')

@sio.on('schedule')
def schedule(data):
    for dict in data:
        if dict['device_id']==device_id:
            schedule_reciever(dict)
    while True:
            if random.random()>0.9999999:
                dict=imitiate_json(device_id)
                dict['system']=device_id
                sio.emit('inferance',dict)
            

# Connect to the server
sio.connect('http://localhost:8000')

#emit the map and casualties
sio.emit('map_nd_casualities',data={'lat_long':[[1.1,1.2],[1.12,1.23],[1.13,1.24],[1.14,1.25],[1.15,1.26],[1.16,1.27],[1.17,1.28],[1.18,1.29]],'map':img})
print('map and casualities sent')


sio.wait()