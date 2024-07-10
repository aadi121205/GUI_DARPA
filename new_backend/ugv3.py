import socketio
from utils import decode_image,schedule_reciever
# Create a Socket.IO client
sio = socketio.Client()
device_id='ugv_3'

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
            
# Connect to the server
sio.connect('http://localhost:8000')

# Wait for events
sio.wait()