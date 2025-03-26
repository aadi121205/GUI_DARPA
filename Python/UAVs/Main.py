import os
from dotenv import load_dotenv
from Socket import Socket
from Telem import Telem
from Data import Data
from UAV import UAV
import sys

load_dotenv()

gcs_ip=os.getenv('GCS_IP')
gcs_port=os.getenv('GCS_PORT')


class Logger:
    def __init__(self, filename="Logs.txt"):
        self.terminal = sys.stdout  # Keep reference to terminal output
        self.log = open(filename, "a")

    def write(self, message):
        self.terminal.write(message)  # Print to terminal
        self.log.write(message)  # Save to file

    def flush(self):
        self.terminal.flush()
        self.log.flush()

if __name__=="__main__":
    socket=Socket(gcs_ip,gcs_port)
    telem=Telem(socket.socketio_client)
    data=Data(socket.socketio_client)
    uav=UAV()
    uav.run()
    sys.stdout = Logger()
    while True:
        sys.stderr = sys.stdout
        pass
