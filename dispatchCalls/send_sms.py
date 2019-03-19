# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client
import requests
import os



URL = "https://efficient-emergency.herokuapp.com/api/dispatchcall/"

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                        # I have the call id in my api for each call record,
                        # I need to extract the call record id number and concatenate into a link to
                        # populate in here. use requests for api.
                     body="Twillow API Test",
                     from_='+18646893583',
                     to='+18438021417'
                 )

print(message.sid)