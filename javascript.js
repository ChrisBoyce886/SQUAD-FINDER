// window.onload = function() {
// /*There are 2 inputs and 1 button on the homepage.  
         
//     Button 1 - #submit     
//         On "click" needs to authenticate user and password. 

// */
// //creates a variable to store input from form
//     var user = $('#user').val();
//     var password = $('#password').val();
//     console.log(user);
//     console.log(password);


/////////////////////////////////////////////////////////////////////////////
/* 
There are 6 inputs and 2 buttons on the main page that need script. 

    Button 1 :  #addBtn
        On "click" needs to --> 
            1)Retrieve input from form and list the event in the event display area.
            2)Connect to both API's 


    Button 2 : #eventSearch
        On "click" needs to -->
            1) Match the input from #searchInput with an event in the events list. 
            2) Highlight the searched events in the display area. 

*/

//creates a variable to store input from form for button 1.
    // var eventCreator = $('#squadLeader').val();
    // var eventName = $('#inputEventName').val();
    // var dateTime = $('#DT').val();
    // var location = $('#location').val();
    // var eventDescription = $('#eventDescription').val();
    // var teamRoster = $('#roster').val();

    // console.log(eventCreator);
    // console.log(eventName);
    // console.log(dateTime);
    // console.log(location);
    // console.log(eventDescription);
    // console.log(teamRoster)

    // //creates a variable to store input from form for button 2.
    // var search = $('#searchInput').val();
    // console.log(search);




// 36.227 lat
// -80.843 long


///////////////////////////////////////////////////////////////////////////////////////
                                    //GOOGLE API SECTION
//////////////////////////////////////////////////////////////////////////////////////
 
//Geolocation
var parkLocations = [
  ["Freedom Park, 35.193978, -80.842636"],
  ["Frazier Park, 35.232251, -80.858032"],
  ["Frazier Park - Tennis & Basketball, 35.234098, -80.856477"],
  ["Martin Luther King Park - Tennis & Basketball, 35.243901,-80.871059"],
  ["Revolution Park, 35.214758, -80.876093"],
  ["Southside Park, 35.207150, -80.872784"],
  ["Latta Park, 35.209832,-80.850605"],

      function initMap() {
        map = new google.maps.Map(document.getElementById('google-maps-display'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 11
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
      

      // function initMap() {
      //   // The location of Uluru
      //   var uluru = {lat: -25.344, lng: 131.036};
      //   // The map, centered at Uluru
      //   var map = new google.maps.Map(
      //       document.getElementById('google-maps-display'), {zoom: 4, center: uluru});
      //   // The marker, positioned at Uluru
      //   var marker = new google.maps.Marker({position: uluru, map: map});
      //   }






///////////////////////////////////////////////////////////////////////////////////////
                                    //YELP API SECTION
//////////////////////////////////////////////////////////////////////////////////////






// }














///////////////////////////////////////////////////////////////////////////////////////
                                    //FIREBASE SECTION
//////////////////////////////////////////////////////////////////////////////////////

