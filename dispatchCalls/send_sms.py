# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'AC272c1ff97f2912de6f4e9191d3807c6a'
auth_token = 'a7f4dbb2f179725628035bd5c355f8d6'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Twillow API Test",
                     from_='+18646893583',
                     to='+18438021417'
                 )

print(message.sid)