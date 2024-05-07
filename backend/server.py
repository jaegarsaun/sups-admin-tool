from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
# importing os module for environment variables
import os
# importing necessary functions from dotenv library
from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file
load_dotenv() 

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
        'forum_device_key': os.getenv('FORUM_DEVICE_KEY'),
        'forum_IPSSessionFront': os.getenv('FORUM_IPSSESSIONFRONT'),
        'forum_member_id': os.getenv('FORUM_MEMBER_ID'),
        'forum_login_key': os.getenv('FORUM_LOGIN_KEY'),
        'forum_loggedIn': os.getenv('FORUM_LOGGEDIN')
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
@app.route("/api/milrp/characters/<profile_id>")
def get_milrp_characters(profile_id):
    url = f'https://superiorservers.co/api/ssrp/milrp/characters/{profile_id}'
    cookies = {
        'forum_device_key': os.getenv('FORUM_DEVICE_KEY'),
        'forum_IPSSessionFront': os.getenv('FORUM_IPSSESSIONFRONT'),
        'forum_member_id': os.getenv('FORUM_MEMBER_ID'),
        'forum_login_key': os.getenv('FORUM_LOGIN_KEY'),
        'forum_loggedIn': os.getenv('FORUM_LOGGEDIN')
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
    
@app.route("/api/player/getfriends/<profile_id>")
def get_friends(profile_id):
    apikey = os.getenv("API_KEY") 
    url = f'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key={apikey}&steamid={profile_id}&relationship=friend'
    # Make the request
    response = requests.get(url)

    #Check if the request was successful
    if response.status_code == 200:
        # Process the data (assuming JSON response)
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data', 'status_code': response.status_code})




if __name__ == "__main__":
    app.run()