import requests


class ScoringInteractionProtocol:
    def __init__(self, base_url):
        self.base_url = base_url
        self.auth_token = None
        self.headers = {
            "Authorization": f"Bearer {self.auth_token}",
            "Content-Type": "application/json",
        }

    def get_status(self):
        url = f"{self.base_url}/api/status"
        response = requests.get(url, headers=self.headers)
        return response.json()

    def post_critical(self, casualty_id, team, system, type, value):
        url = f"{self.base_url}/api/critical"
        data = {
            "casualty_id": casualty_id,
            "team": team,
            "system": system,
            "type": type,
            "value": value,
        }
        response = requests.post(url, json=data, headers=self.headers)
        return response.json()

    def post_vitals(self, casualty_id, team, system, type, value, time_ago):
        url = f"{self.base_url}/api/vitals"
        data = {
            "casualty_id": casualty_id,
            "team": team,
            "system": system,
            "type": type,
            "value": value,
            "time_ago": time_ago,
        }
        response = requests.post(url, json=data, headers=self.headers)
        return response.json()

    def post_injury(self, casualty_id, team, system, type, value):
        url = f"{self.base_url}/api/injury"
        data = {
            "casualty_id": casualty_id,
            "team": team,
            "system": system,
            "type": type,
            "value": value,
        }
        response = requests.post(url, json=data, headers=self.headers)
        return response.json()


# Example usage:
if __name__ == "__main__":
    base_url = "http://127.0.0.1:5000"
    auth_token = "flux230{showroom"

    scoring_api = ScoringInteractionProtocol(base_url, auth_token)

    # Example: Get statusauth_token
    status = scoring_api.get_status()
    print("Status:", status)

    # Example: Post a critical report
    critical_report = scoring_api.post_critical(
        casualty_id=1, team="TeamA", system="System1", type="hemorrhage", value=1
    )
    print("Critical Report:", critical_report)

    # Example: Post a vitals report
    vitals_report = scoring_api.post_vitals(
        casualty_id=1, team="TeamA", system="System1", type="heart", value=78, time_ago=34
    )
    print("Vitals Report:", vitals_report)

    # Example: Post an injury report
    injury_report = scoring_api.post_injury(
        casualty_id=1, team="TeamA", system="System1", type="trauma_head", value=1
    )
    print("Injury Report:", injury_report)

    status = scoring_api.get_status()
    print("Status:", status)