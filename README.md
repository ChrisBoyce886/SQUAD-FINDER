# Project 1 - 'Squad Finder'

## Team Members: 
Chris Boyce, Justin Conforti, Lucas Martins, Anitra McCain

## Description:
Are you interested in playing team sports with people near you? Are you looking for a workout partner? 
Or are you simply new to your town or city and looking to meet like minded peers through common interests in sports?
With Squad Finder, you have the ability to join or create any pick-up sporting event you desire at a city park near you! 
You will have the ability to create an event in the application with all of the details necessary such as the sport or activity, 
total number of members, location, date/time, a description, etc. 
Squad Finder provides all of the details you need for the event by pulling information from Google Maps & Yelp.
People will then be able to search for events in their area (based on a specific radius) and sign up for the event.
Squad Finder takes the hassle out of putting together a Squad to play pick up games together and meet new people! Enjoy! 

## Key Design Functions:
* Index page shows description of application and prompts user to create an account, or login with their credentials via Firebase.
* User will be able to view all current available squads/events going on, along with all of the event information.
* User can click on the name of the park which will automatically scroll down to the displayed Google Maps API.
* Google Maps API geolocates your position upon entering the application, it shows a marker for each park in your area, 
it allows user to search for parks, and it brings up park information via Yelp API
* Yelp API shows the park information such as address, contact information, open hours, park rating, 
and allows user to click on a link to the actual Yelp page for that chosen park.
* The user will also be able to create/host an event which will be displayed for other users to sign up for.  


## Rough Breakdown of Tasks: 
* Chris:  Javascript, UI, and Google API → locations, markers, search box, set activity radius.
* Justin: Javascript, Firebase → authenticating users, matchmaking feature, displaying events, chatbox.
* Lucas: Javascript, Yelp API → park reviews, pictures, hours of operation, links to Yelp.
* Anitra: User Interface → HTML, CSS, Bootstrap


