from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_json():
    data = request.get_json()
    with open('received_data.json', 'w') as f:
        json.dump(data, f, indent=2)
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'))
