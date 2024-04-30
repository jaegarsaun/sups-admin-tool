from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/api/profile/<profile_id>")
def get_profile(profile_id):
    url = f'https://superiorservers.co/api/profile/{profile_id}'

    # Make the request
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Process the data (assuming JSON response)
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data', 'status_code': response.status_code})
    
@app.route("/test")
def test():
    return "This is a test route."


if __name__ == "__main__":
    app.run()