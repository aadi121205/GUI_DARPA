import os
import json
import requests
from datetime import datetime, timedelta
from time import sleep
import hashlib

# Configuration
BASE_URL = "http://localhost:5000"  # Using the mock server URL
TEAM_NAME = "UAS-DTU"  # Replace with your team name
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDEyOGNmZS05YzJiLTRhZDAtYjFmMC00ZDY4NzkwZjM3NWEiLCJpIjowfQ.fc8-8Plswp0nW1-o8p1XtW-sg4fj7T4Y18TJw64duR8"  # Replace with your actual token

# API endpoints
STATUS_ENDPOINT = f"{BASE_URL}/api/status"
CRITICAL_ENDPOINT = f"{BASE_URL}/api/critical"
VITALS_ENDPOINT = f"{BASE_URL}/api/vitals"
INJURY_ENDPOINT = f"{BASE_URL}/api/injury"

headers = {
    "Accept": "application/json",
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json"
}

PROCESSED_FILES_LOG = "processed_files.json"

def get_status():
    response = requests.get(STATUS_ENDPOINT, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error getting status: {response.status_code}")
        return None

def submit_report(endpoint, data):
    response = requests.post(endpoint, headers=headers, json=data)
    if response.status_code == 201:
        print(f"Successfully submitted report: {response.json()}")
    else:
        print(f"Error submitting report: {response.status_code}, {response.text}")

def calculate_time_ago(timestamp):
    report_time = datetime.strptime(timestamp,"%H:%M:%S")
    current_time = datetime.now()
    retport_time=report_time.replace(year=current_time.year,month=current_time.month,day=current_time.day)
    time_difference = current_time - report_time
    return int(time_difference.total_seconds())

def process_json_file(system, casualty_id, data, old_data):
    timestamp = data.get('timestamp')
    time_ago = calculate_time_ago(timestamp)

    for report_type, value in data.items():
        if report_type == 'timestamp':
            continue
        
        if old_data is None or value != old_data.get(report_type):
            if report_type in ['severe_hemorrhage', 'respiratory_distress']:
                endpoint = CRITICAL_ENDPOINT
                report_data = {
                    "casualty_id": casualty_id,
                    "team": TEAM_NAME,
                    "system": system,
                    "type": report_type,
                    "value": value
                }
            elif report_type in ['hr', 'rr']:
                endpoint = VITALS_ENDPOINT
                report_data = {
                    "casualty_id": casualty_id,
                    "team": TEAM_NAME,
                    "system": system,
                    "type": report_type,
                    "value": value,
                    "time_ago": time_ago
                }
            else:
                endpoint = INJURY_ENDPOINT
                report_data = {
                    "casualty_id": casualty_id,
                    "team": TEAM_NAME,
                    "system": system,
                    "type": report_type,
                    "value": value
                }
            
            submit_report(endpoint, report_data)
            sleep(1)  # Add a small delay to avoid overwhelming the API

def get_file_hash(file_path):
    with open(file_path, "rb") as f:
        file_hash = hashlib.md5()
        chunk = f.read(8192)
        while chunk:
            file_hash.update(chunk)
            chunk = f.read(8192)
    return file_hash.hexdigest()

def load_processed_files():
    if os.path.exists(PROCESSED_FILES_LOG):
        with open(PROCESSED_FILES_LOG, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                print(f"Error decoding {PROCESSED_FILES_LOG}. Starting with empty processed files.")
                return {}
    return {}

def save_processed_files(processed_files):
    with open(PROCESSED_FILES_LOG, 'w') as f:
        json.dump(processed_files, f)

def main():
    jsons_folder = "/home/suhani/Report"
    processed_files = load_processed_files()

    while True:
        for system_folder in os.listdir(jsons_folder):
            system_path = os.path.join(jsons_folder, system_folder)
            if os.path.isdir(system_path):
                for json_file in os.listdir(system_path):
                    if json_file.endswith('.json'):
                        file_path = os.path.join(system_path, json_file)
                        file_hash = get_file_hash(file_path)
                        
                        # Debug print
                        # print(f"Processing file: {file_path}")
                        # print(f"Current hash: {file_hash}")
                        # print(f"Stored info: {processed_files.get(file_path, 'Not found')}")
                        
                        file_info = processed_files.get(file_path, {})
                        if not isinstance(file_info, dict):
                            file_info = {}
                        
                        if file_path not in processed_files or file_info.get('hash') != file_hash:
                            casualty_id = int(json_file.split('.')[0])
                            with open(file_path, 'r') as f:
                                new_data = json.load(f)
                            
                            old_data = file_info.get('data')
                            process_json_file(system_folder, casualty_id, new_data, old_data)
                            
                            processed_files[file_path] = {
                                'hash': file_hash,
                                'data': new_data
                            }
                            save_processed_files(processed_files)
                            print(f"Processed new/updated file: {file_path}")

        print("Waiting for new data...")
        sleep(1)  # Wait for 1 seconds before checking for new files

if __name__ == "__main__":
    main()
