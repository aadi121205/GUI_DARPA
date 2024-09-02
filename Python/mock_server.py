from flask import Flask, request, jsonify
import time

app = Flask(__name__)

# Mock data
hemorrhage_reports = 20
distress_reports = 18
heart_reports = 12
respiratory_reports = 20
trauma_head_reports = 20
trauma_torso_reports = 20
trauma_lower_ext_reports = 18
trauma_upper_ext_reports = 10
alertness_ocular_reports = 20
alertness_verbal_reports = 20


mock_status = {
    "clock": 721.4,
    "team": "dtc1",
    "user": "John B",
    "remaining_reports": {
        "critical": {"hemorrhage": hemorrhage_reports, "distress": distress_reports},
        "vitals": {"heart": heart_reports, "respiratory": respiratory_reports},
        "injury": {
            "trauma_head": trauma_head_reports,
            "trauma_torso": trauma_torso_reports,
            "trauma_lower_ext": trauma_lower_ext_reports,
            "trauma_upper_ext": trauma_upper_ext_reports,
            "alertness_ocular": alertness_ocular_reports,
            "alertness_verbal": alertness_verbal_reports,
        },
    },
}


@app.route("/api/status", methods=["GET"])
def get_status():
    return jsonify(mock_status)


@app.route("/api/critical", methods=["POST"])
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
        "reports_remaining": mock_status["remaining_reports"]["critical"]["hemorrhage"]
        - 1,
        "report_status": "accepted",
        "casualty_id": data["casualty_id"],
        "type": data["type"],
        "value": data["value"],
    }

    return jsonify(response)


@app.route("/api/vitals", methods=["POST"])
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
        "reports_remaining": mock_status["remaining_reports"]["vitals"]["heart"] - 1,
        "report_status": "accepted",
        "casualty_id": data["casualty_id"],
        "type": data["type"],
        "value": data["value"],
        "time_ago": data["time_ago"],
    }
    return jsonify(response)


@app.route("/api/injury", methods=["POST"])
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
        "reports_remaining": mock_status["remaining_reports"]["injury"]["trauma_head"]
        - 1,
        "report_status": "accepted",
        "casualty_id": data["casualty_id"],
        "type": data["type"],
        "value": data["value"],
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
