import requests
import json

# Load the JSON file
with open("Data.json", "r") as file:
    data = json.load(file)

# Replace with Device B's IP address or domain
url = "https://0.0.0.0:5000/upload"

# Disable SSL warning for self-signed certs (not recommended in production)
response = requests.post(url, json=data, verify=False)

print("Response:", response.status_code, response.text)
