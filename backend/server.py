from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

authCookie = 'forum_device_key=8d596471e26c08d0678165d263e1d25e; forum_IPSSessionFront=83sgpn2gb8pp92ed3prdb02q90; forum_member_id=1176; forum_login_key=f349bf3a9f89d257bd522be679d3d663; forum_loggedIn=1714519508;'

app = Flask(__name__)
CORS(app)
# Get all general profile information for a user
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
    
# Get all cwrp characters of a player
@app.route("/api/cwrp/characters/<steamid32>")
def get_cw_characters(steamid32):
    url = f'https://superiorservers.co/api/ssrp/cwrp/characters/{steamid32}'
    cookies = {
        'forum_device_key': '8d596471e26c08d0678165d263e1d25e',
        'forum_IPSSessionFront': '83sgpn2gb8pp92ed3prdb02q90',
        'forum_member_id': '1176',
        'forum_login_key': 'f349bf3a9f89d257bd522be679d3d663',
        'forum_loggedIn': '1714519508'
    }
    
    # Make the request with the specified cookies
    response = requests.get(url, cookies=cookies)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Process the data (assuming JSON response)
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data', 'status_code': response.status_code})

# # Get all milrp characters of a player
# @app.route("/api/milrp/characters/<profile_id>")
# def get_milrp_characters(profile_id):
#     url = f'https://superiorservers.co/api/ssrp/milrp/characters/{profile_id}'

#     # Make the request
#     response = requests.get(url)
    
#     # Check if the request was successful
#     if response.status_code == 200:
#         # Process the data (assuming JSON response)
#         data = response.json()
#         return jsonify(data)
#     else:
#         return jsonify({'error': 'Failed to fetch data', 'status_code': response.status_code})
# none of these work for some reason^ they all return html instead of json



if __name__ == "__main__":
    app.run()