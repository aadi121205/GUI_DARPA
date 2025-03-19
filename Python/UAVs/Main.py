import os
from dotenv import load_dotenv
from Socket import Socket
from Telem import Telem
from Data import Data
load_dotenv()

gcs_ip=os.getenv('GCS_IP')
gcs_port=os.getenv('GCS_PORT')

if __name__=="__main__":
    socket=Socket(gcs_ip,gcs_port)
    telem=Telem(socket.socketio_client)
    data=Data(socket.socketio_client)
    while True:
        pass
