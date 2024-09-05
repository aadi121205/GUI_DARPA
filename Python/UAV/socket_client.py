import socketio
import time
import threading
from dotenv import load_dotenv
load_dotenv()

class Socketio_client:
    def __init__(self,IP,port):
        self.socketio_client=socketio.Client()
        # self.call_backs()
        self.connected = False
        self.connection_string=IP+":"+str(port)
        t=threading.Thread(target=self.start)
        t.start()
        
    def start(self):
        while True:
            time.sleep(5)
            while not self.connected:
                try:
                    self.socketio_client.connect(f'http://{self.connection_string}/socket.io', namespaces=["/datain"])
                    print("Connected to GUI  IP/PORT: " + str(self.connection_string))
                    self.connected = True
                except Exception as e:
                    print("Cannot connect to GUI SocketIO. IP/PORT: "+ str(self.connection_string + "  Exception:- " + str(e)))
                    self.connected = False
                    time.sleep(20)
                
    def call_backs(self):

        @self.socketio_client.event(namespace="/datain")  # decorator for the connect function
        def connect():
            print("Socket established connection IP/PORT: "+ str(self.connection_string))

        @self.socketio_client.event(namespace="/datain")
        def disconnect():
            print("Socket connection broken connection IP/PORT: "+ str(self.connection_string))
            # self.start()
        
        @self.socketio_client.event(namespace="/datain")
        def connect_error(e):
            print("Socket connect error IP/PORT: " + str(e))
            

    