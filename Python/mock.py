from flask import Flask, request, jsonify
from datetime import datetime
import time

app = Flask(__name__)

# Mock data storage
reports = []
remaining_reports = {
    "critical": {"hemorrhage": 20, "distress": 20},
    "vitals": {"heart": 20, "respiratory": 20},
    "injury": {
        "trauma_head": 20, "trauma_torso": 20, "trauma_lower_ext": 20, "trauma_upper_ext": 20,
        "alertness_ocular": 20, "alertness_verbal": 20, "alertness_motor": 20
    }
}

# Mock authentication token
VALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDEyOGNmZS05YzJiLTRhZDAtYjFmMC00ZDY4NzkwZjM3NWEiLCJpIjowfQ.fc8-8Plswp0nW1-o8p1XtW-sg4fj7T4Y18TJw64duR8"

def check_auth(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return False
    try:
        auth_type, token = auth_header.split()
        if auth_type.lower() != 'bearer':
            return False
        return token == VALID_TOKEN
    except ValueError:
        return False

@app.route('/api/status', methods=['GET'])
def get_status():
    if not check_auth(request):
        return jsonify({"error": "Unauthorized"}), 401
    
    return jsonify({
        "clock": time.time() - start_time,
        "team": "test_team",
        "user": "test_user",
        "remaining_reports": remaining_reports
    })

@app.route('/api/critical', methods=['POST'])
def submit_critical():
    if not check_auth(request):
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    report_type = data['type']
    if report_type == 'severe_hemorrhage':
        remaining_reports['critical']['hemorrhage'] -= 1
    elif report_type == 'respiratory_distress':
        remaining_reports['critical']['distress'] -= 1
    return create_response(data, include_time_ago=False)

@app.route('/api/vitals', methods=['POST'])
def submit_vitals():
    if not check_auth(request):
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    report_type = data['type']
    if report_type == 'hr':
        remaining_reports['vitals']['heart'] -= 1
    elif report_type == 'rr':
        remaining_reports['vitals']['respiratory'] -= 1
    return create_response(data, include_time_ago=True)

@app.route('/api/injury', methods=['POST'])
def submit_injury():
    if not check_auth(request):
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    report_type = data['type']
    if report_type in remaining_reports['injury']:
        remaining_reports['injury'][report_type] -= 1
    return create_response(data, include_time_ago=False)

def create_response(data, include_time_ago):
    report = {
        "run": "test_run",
        "team": data['team'],
        "user": "test_user",
        "system": data['system'],
        "clock": time.time() - start_time,
        "report_id": f"report_{len(reports) + 1}",
        "report_timestamp": datetime.now().isoformat(),
        "reports_remaining": get_remaining_reports(data['type']),
        "report_status": "accepted",
        "casualty_id": data['casualty_id'],
        "type": data['type'],
        "value": data['value']
    }
    if include_time_ago:
        report["time_ago"] = data.get('time_ago')
    reports.append(report)
    return jsonify(report), 201

def get_remaining_reports(report_type):
    if report_type in ['severe_hemorrhage', 'respiratory_distress']:
        return remaining_reports['critical']['hemorrhage'] + remaining_reports['critical']['distress']
    elif report_type in ['hr', 'rr']:
        return remaining_reports['vitals']['heart'] + remaining_reports['vitals']['respiratory']
    else:
        return sum(remaining_reports['injury'].values())

if __name__ == '__main__':
    start_time = time.time()
    app.run(debug=True, port=5000)
