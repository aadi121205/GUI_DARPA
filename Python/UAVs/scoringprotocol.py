import requests


class Server:
   
    def StartRun():
        response = requests.get("http://localhost/api/run/new")
        # print("New Run:", response.json())
        response = requests.get("http://localhost/api/run/start")
        print("Start Run:", response.json())
    
    def login(LOGIN_URL, data):
        # Get the access token
        response = requests.post(LOGIN_URL, data=data)

        if response.status_code == 200:
            token = response.json()["access_token"]
            print("Access Token:", token)
            return token
        else:
            print("Failed to authenticate:", response.text)
        
         
    def initial_report(initial_report_data,headers,BASE_URL):
        
        response = requests.post(f"{BASE_URL}/initial_report", json=initial_report_data, headers=headers)
    
        if response.status_code == 200:
            print("Report Submitted:", response.json())
        else:
            print("Failed to submit report:", response.text)
    
    def update_report(update_report_data,headers,BASE_URL):
        response = requests.post(f"{BASE_URL}/update_report", json=update_report_data, headers=headers)

        if response.status_code == 200:
            print("Report Updated:", response.json())
        else:
            print("Failed to update report:", response.text)

    def status(BASE_URL,headers):
        response = requests.get(f"{BASE_URL}/status", headers=headers)
        if response.status_code == 200:
            print("Report Status:", response.json())
        else:
            print("Failed to get status:", response.text)





Server.StartRun()

# BASE_URL = "http://localhost/api"
# LOGIN_URL = f"{BASE_URL}/login/token"


# data = {
#     "username": "your_username",
#     "password": "your_password"
# }



# initial_report_data = {
#     "casualty_id": 123,  
#     "team": "UAS",
#     "system": "UAV",
#     "location": {
#         "latitude": 37.7749,
#         "longitude": -122.4194,
#         "time_ago": 5
#     },
#     "hr": {"value": 75, "time_ago": 5},
#     "rr": {"value": 20, "time_ago": 5},
#     "alertness_ocular": {"value": 1, "time_ago": 5},
#     "alertness_verbal": {"value": 2, "time_ago": 5},
#     "alertness_motor": {"value": 3, "time_ago": 5},
#     "severe_hemorrhage": 1,
#     "respiratory_distress": 0,
#     "trauma_head": 2,
#     "trauma_torso": 1,
#     "trauma_lower_ext": 1,
#     "trauma_upper_ext": 0,
#     "temp": {"value": 98, "time_ago": 5}
# }



# token=Server.login(LOGIN_URL, data)

# headers = {"Authorization": f"Bearer {token}"}

# Server.initial_report(initial_report_data,headers,BASE_URL)