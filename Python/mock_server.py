from flask import Flask, request, jsonify
import time

app = Flask(__name__)

# Mock data
mock_status = {
    "clock": 721.4,
    "team": "dtc1",
    "user": "John B",
    "remaining_reports": {
        "critical": {"hemorrhage": 20, "distress": 18},
        "vitals": {"heart": 12, "respiratory": 20},
        "injury": {
            "trauma_head": 20,
            "trauma_torso": 20,
            "trauma_lower_ext": 18,
            "trauma_upper_ext": 10,
            "alertness_ocular": 20,
            "alertness_verbal": 20,
            "alertness_motor": 19
        }
    }
}

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify(mock_status)

@app.route('/api/critical', methods=['POST'])
def post_critical():
    data = request.json
    response = {
        "run": "run123",
        "team": data["team"],
        "user": "John B",
        "system": data["system"],
        "clock": time.time(),
        "report_id": "report123",
        "report_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "reports_remaining": mock_status["remaining_reports"]["critical"][data["type"]] - 1,
        "report_status": "accepted",
        "casualty_id": data["casualty_id"],
        "type": data["type"],
        "value": data["value"]
    }
    mock_status["remaining_reports"]["critical"][data["type"]] -= 1
    return jsonify(response)

@app.route('/api/vitals', methods=['POST'])
def post_vitals():
    data = request.json
    response = {
        "run": "run123",
        "team": data["team"],
        "user": "John B",
        "system": data["system"],
        "clock": time.time(),
        "report_id": "report123",
        "report_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "reports_remaining": mock_status["remaining_reports"]["vitals"][data["type"]] - 1,
        "report_status": "accepted",
        "casualty_id": data["casualty_id"],
        "type": data["type"],
        "value": data["value"],
        "time_ago": data["time_ago"]
    }
    mock_status["remaining_reports"]["vitals"][data["type"]] -= 1
    return jsonify(response)

@app.route('/api/injury', methods=['POST'])
def post_injury():
    data = request.json
    response = {
        "run": "run123",
        "team": data["team"],
        "user": "John B",
        "system": data["system"],
        "clock": time.time(),
        "report_id": "report123",
        "report_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "reports_remaining": mock_status["remaining_reports"]["injury"][data["type"]] - 1,
        "report_status": "accepted",
        "casualty_id": data["casualty_id"],
        "type": data["type"],
        "value": data["value"]
    }
    mock_status["remaining_reports"]["injury"][data["type"]] -= 1
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
