import requests

# === Configuration ===
SERVER = "localhost"  # Change to actual IP
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4M2Q3OGM4ZS04MzhhLTQ0NzctOWM3Yi02N2VmMTZlNWY3MTYiLCJpIjowfQ.i4KuwEtc5_6oIYz5TDWcdzl5bMkvCpLZTSZG2Avy84w"
HEADERS_JSON = {
    "accept": "application/json",
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json"
}
HEADERS_AUTH = {
    "Authorization": f"Bearer {AUTH_TOKEN}"
}

# === 1. GET /api/status ===
def get_status():
    url = f"http://{SERVER}/api/status"
    res = requests.get(url, headers=HEADERS_AUTH)
    if res.status_code == 200:
        print("✅ STATUS:", res.json())
    else:
        print(f"❌ Status Error {res.status_code}: {res.text}")


# === 2. POST /api/initial_report ===
def submit_initial_report():
    url = f"http://{SERVER}/api/initial_report"
    payload = {
        "casualty_id": 5,
        "team": "TEST_TEAM",
        "system": "UGV_1",
        "location": {
            "latitude": 0.0,
            "longitude": 0.0,
            "time_ago": 0
        },
        "severe_hemorrhage": {"value": 1, "time_ago": 0},
        "respiratory_distress": {"value": 1, "time_ago": 0},
        "hr": {"value": 72, "time_ago": 5},
        "rr": {"value": 16, "time_ago": 5},
        "temp": {"value": 98, "time_ago": 5},
        "trauma_head": 1,
        "trauma_torso": 0,
        "trauma_lower_ext": 0,
        "trauma_upper_ext": 0,
        "alertness_ocular": {"value": 0, "time_ago": 3},
        "alertness_verbal": {"value": 2, "time_ago": 4},
        "alertness_motor": {"value": 1, "time_ago": 2}
    }
    res = requests.post(url, json=payload, headers=HEADERS_JSON)
    if res.status_code in (200, 201):
        print("✅ INITIAL REPORT:", res.json())
    else:
        print(f"❌ Initial Report Error {res.status_code}: {res.text}")


# === 3. POST /api/update_report ===
def submit_update_report():
    url = f"http://{SERVER}/api/update_report"
    payload = {
        "casualty_id": 5,
        "team": "TEST_TEAM",
        "system": "UGV_1",
        "location": {
            "latitude": 0.0,
            "longitude": 0.0,
            "time_ago": 0
        },
        "severe_hemorrhage": {"value": 0, "time_ago": 2},
        "respiratory_distress": {"value": 0, "time_ago": 2},
        "hr": {"value": 75, "time_ago": 2},
        "rr": {"value": 14, "time_ago": 2},
        "alertness_ocular": {"value": 1, "time_ago": 1},
        "alertness_verbal": {"value": 1, "time_ago": 1},
        "alertness_motor": {"value": 1, "time_ago": 1}
    }
    res = requests.post(url, json=payload, headers=HEADERS_JSON)
    if res.status_code in (200, 201):
        print("✅ UPDATE REPORT:", res.json())
    else:
        print(f"❌ Update Report Error {res.status_code}: {res.text}")


# === 4. POST /api/casualty_image ===
def submit_casualty_image(image_path="casualty.jpg"):
    url = f"http://{SERVER}/api/casualty_image"
    data = {
        "casualty_id": 5,
        "team": "TEST_TEAM",
        "system": "UGV_1",
        "time_ago": 1
    }
    with open(image_path, "rb") as img:
        files = {"file": ("casualty.jpg", img, "image/jpeg")}
        res = requests.post(url, headers=HEADERS_AUTH, data=data, files=files)
    if res.status_code == 200:
        print("✅ IMAGE SUBMITTED:", res.json())
    else:
        print(f"❌ Image Error {res.status_code}: {res.text}")


# === CLI-style Interface ===
if __name__ == "__main__":
    print("Choose operation:")
    print("1. Get status")
    print("2. Submit initial report")
    print("3. Submit update report")
    print("4. Submit casualty image")
    choice = input("Enter 1-4: ").strip()

    if choice == "1":
        get_status()
    elif choice == "2":
        submit_initial_report()
    elif choice == "3":
        submit_update_report()
    elif choice == "4":
        path = input("Enter image path [default: casualty.jpg]: ").strip() or "casualty.jpg"
        submit_casualty_image(path)
    else:
        print("❌ Invalid choice.")
