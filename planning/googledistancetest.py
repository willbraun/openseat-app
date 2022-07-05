# the goal is to find the events happening within a certain radius of the zip code the user specifies.
# should I call this API to find distance between 1 origin (user entered zip code) and ALL destinations (events), get all data, then filter client side?

# is there a way I can send the radius in the call to only return things in that radius?
# that can be in my api.

# set zip code function
#     call django and pass in the zip code and radius
#         get all events from database
#         initiate one google distance matrix api call in backend to find distances between all events and the zip code
#         filter events to only show the ones within the radius
#             **** filter in google api call or in django once I have all data back? 
#                  no documentation on how to filter in google api call, so django it is
#         return filtered events to frontend

import os
import requests
import urllib.parse
import json

# in final project, get list of "events" and then map them to just their addresses/locations

api_key = os.environ['GOOGLE_API_KEY']
destinations = ['Downtown Atlanta', '2301 Vanderbilt Place Nashville, TN 37235', 'Charlotte, NC']
destination_string = ('|').join(destinations)
destination_string_encoded = urllib.parse.quote(destination_string)
origin = '29615'

url = f"https://maps.googleapis.com/maps/api/distancematrix/json?destinations={destination_string_encoded}&origins={origin}&key={api_key}"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)
response_dict = json.loads(response.text)
elements = response_dict['rows'][0]['elements']

input_radius_miles = 200
METERS_TO_MILES = 1609.34
indicies_less_than_200_miles = [index for (index, el) in enumerate(elements) if el['distance']['value'] < input_radius_miles * METERS_TO_MILES]

# in project, use indicies to get the actual events from the original list of "events"

# for demo, indicies can be used to map to the original destination addresses provided

def get_filtered_destinations(index):
    return response_dict['destination_addresses'][index]

result = list(map(get_filtered_destinations, indicies_less_than_200_miles))

print('Full response')
print(response.text)
print(f"List of addresses within 200 miles from 29615: {result}")