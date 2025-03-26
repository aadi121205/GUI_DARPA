import socketio
import ssl

class SecureSocketClient:
    def __init__(self, server_url='https://localhost:3000'):
        self.sio = socketio.Client(ssl_verify=False)
        self.server_url = server_url

        # Register events
        self.sio.on('connect', self.on_connect)
        self.sio.on('disconnect', self.on_disconnect)
        self.sio.on('reply', self.on_reply)

    def on_connect(self):
        print("[Client] Connected to secure server")
        self.sio.send("Hello from secure Python client!")

    def on_disconnect(self):
        print("[Client] Disconnected from server")

    def on_reply(self, data):
        print(f"[Client] Received from server: {data}")

    def run(self):
        self.sio.connect(self.server_url)
        self.sio.wait()

if __name__ == '__main__':
    client = SecureSocketClient()
    client.run()
