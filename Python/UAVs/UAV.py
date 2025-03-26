from flask import Flask, request, jsonify
import json

class UAV:
    def __init__(self):
        self.app = Flask(__name__)
        self.setup_routes()

    def setup_routes(self):
        self.app.add_url_rule('/upload', 'upload_json', self.upload_json, methods=['POST'])

    def upload_json(self):
        data = request.get_json()
        with open('received_data.json', 'w') as f:
            json.dump(data, f, indent=2)
        return jsonify({'status': 'success'}), 200

    def run(self):
        self.app.run(host='0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'))

if __name__ == '__main__':
    uav_app = UAV()
    uav_app.run()
