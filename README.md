# Overview
OpenSeat is an app designed to help you meet people in your area that share your interests. You can create events to do any activity you'd like with a small group. You can also search for and sign up for events that others have posted. 

See app here - https://openseat-app.herokuapp.com/
Video walkthrough - https://www.loom.com/share/ec1cf09e45434ab29c6b323d3856634a

# Features
- View basic event information and search while logged out
- Create an account to create and sign up for events
- Find events on "Discover" by selecting a location, radius, and optional search phrase
- View participants on events
- Fill a seat on an event
- Cancel a seat on an event
- Notifications via text are sent to creators when someone has filled or canceled a seat on one of their events
- Create an event
- Edit one of your events
- Delete one of your events
- View all events you are going to on "My Seats"
- View all events you have created on "My Events"
- Add images to events and user profiles
- Mobile responsive

# Navigating the App
When you first open the app, you can choose to allow the app to use your browser's location. Otherwise, it will use the location you select or pull from your user's optional zip code. The logged out view will show view-only versions of events near your search. Right now it has test data in the future, and you can check for events in Greenville, SC and Atlanta, GA.

You can click Log in, create an account, then you will land on the Discover page. You can view participants on events, fill a seat, or cancel a seat. You can see all events you are attending on My Seats including ones you create, and all events you have created on My Events. Create a new event with the Create Event button, and then you can edit or delete your events afterwards.

Be sure to check out the app on your phone as well!

# Technologies Used
React, Python, Django, Django REST Framework, Google APIs (Distance Matrix, Maps, Places, Geocoding), Twilio API, React Router, React Bootstrap, React Google Places Autocomplete, Fuse.js, Compressorjs, JS-cookie, Date-fns