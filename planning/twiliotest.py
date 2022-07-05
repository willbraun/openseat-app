# I will be using the Twilio API to send a text notification to the creator of an event when a participant signs up for the event
# The event model will link to a creator user by foreign key
# The user model will have a phone number field to recieve notifications

import os
from twilio.rest import Client

account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_SECRET']
my_phone_number = os.environ['MY_PHONE_NUMBER']
twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']
client = Client(api_key, api_secret, account_sid)

message = client.messages.create(
    # the creator's phone number (mine for testing)
    to=my_phone_number, 
    
    # from the phone number set up in my free Twilio account
    from_=twilio_phone_number,

    body="Hello from Python!"
)
print('sent')