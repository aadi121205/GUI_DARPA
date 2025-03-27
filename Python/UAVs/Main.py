import os
from dotenv import load_dotenv
from Socket import Socket
from Telem import Telem
from Data import Data
from UAV import UAV
import sys

load_dotenv()

gcs_ip = os.getenv('GCS_IP')
gcs_port = os.getenv('GCS_PORT')


class Logger:
    def __init__(self, filename="Logs.txt"):
        self.terminal = sys.stdout
        self.log = open(filename, "a")

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)

    def flush(self):
        self.terminal.flush()
        self.log.flush()


if __name__ == "__main__":
    # Clear the log at start
    with open("Logs.txt", "w"):
        pass

    # Set up stdout logging
    sys.stdout = Logger()

    # Initialize components
    socket = Socket(gcs_ip, gcs_port)
    telem = Telem(socket.socketio_client)
    data = Data(socket.socketio_client)
    uav = UAV()
    uav.run()

    # Keep the program running
    while True:
        pass
