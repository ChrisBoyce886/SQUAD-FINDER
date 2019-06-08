

// ///////////////////////////////////////////////////////////////////////////////////////
//                                     //GOOGLE API SECTION
// //////////////////////////////////////////////////////////////////////////////////////
// //google.maps.event.addDomListener(window, 'load', initMap);

// //Geolocation
// var parkLocations = [
//   ["Freedom Park, 35.193978, -80.842636"],
//   ["Frazier Park, 35.232251, -80.858032"],
//   ["Frazier Park - Tennis & Basketball, 35.234098, -80.856477"],
//   ["Martin Luther King Park - Tennis & Basketball, 35.243901,-80.871059"],
//   ["Revolution Park, 35.214758, -80.876093"],
//   ["Southside Park, 35.207150, -80.872784"],
//   ["Latta Park, 35.209832,-80.850605"],
// ]
//       function initMap() {
//         map = new google.maps.Map(document.getElementById('google-maps-display'), {
//           center: {lat: 35.227085, lng: -80.843124},
//           zoom: 11
//         });
//         infoWindow = new google.maps.InfoWindow;

//         // Try HTML5 geolocation.
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             infoWindow.open(map);
//             map.setCenter(pos);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           handleLocationError(false, infoWindow, map.getCenter());
//         }
//       }

//       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//                               'Error: We could not find your location.' :
//                               'Error: Your browser doesn\'t support geolocation.');
//         infoWindow.open(map);
//       }

//       var marker = new google.maps.Marker({
//         position: pos,
//         map: map,
//         draggable: true
//     });

//     var searchBox = new google.maps.places.SearchBox(document.getElementById('location-SearchBox'));

//     google.maps.event.addDomListener(searchBox, 'places_changed', function() {
//             var places = searchBox.getPlaces();
//             var bounds = new google.maps.LatLngBounds();
//             var i, place;

//             for (i = 0; place = places[i]; i++) {
//                 bounds.extend(place.geometry.location);
//                 marker.setPosition(place.geometry.location);
//             }
//             map.fitBounds(bounds);
//             map.setZoom(12);
//         })
// ///////////////////////////////////////////////////////////////////////////////////////
//                                     //FIREBASE SECTION
// //////////////////////////////////////////////////////////////////////////////////////


// window.onload = function() {
//  /*There are 2 inputs and 1 button on the homepage.  
         
// //     Button 1 - #submit     
// //         On "click" needs to authenticate user and password. 

// // */
// //creates a variable to store input from form
//      var user = $('#user').val();
//      var password = $('#password').val();
//      console.log(user);
//      console.log(password);


// /////////////////////////////////////////////////////////////////////////////


// //creates a variable to store input from form for button 1.
//     var eventCreator = $('#squadLeader').val();
//     var eventName = $('#inputEventName').val();
//     var dateTime = $('#DT').val();
//     var location = $('#location').val();
//     var eventDescription = $('#eventDescription').val();
//     var teamRoster = $('#roster').val();

//     console.log(eventCreator);
//     console.log(eventName);
//     console.log(dateTime);
//     console.log(location);
//     console.log(eventDescription);
//     console.log(teamRoster)

//     //creates a variable to store input from form for button 2.
//     var search = $('#searchInput').val();
//     console.log(search);


// ///////////////////////////////////////////////////////////////////////////////////////
//                                   //GOOGLE API SECTION
// //////////////////////////////////////////////////////////////////////////////////////
 
// //Geolocation
// var map, infoWindow;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('google-maps-display'), {
//     center: {lat: 35.227, lng: -80.843},
//     zoom: 6
//   });
//   infoWindow = new google.maps.InfoWindow;

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }



    



// ///////////////////////////////////////////////////////////////////////////////////////
//                                     //YELP API SECTION
// //////////////////////////////////////////////////////////////////////////////////////

//   var userInputAddress = "New York City";

//   function displayLocationDetails() {

//     var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userInputAddress;   

//     $.ajax({
//       url: queryUrl, 
//       method: "GET", 
//       headers: {
//        Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
//       }
//     })
//     .then(function(response) {
//       var businessId = response.data;
//     });
//   };
// };


  ///////////////////////////////////////////////////////////////////////////////////////
  //YELP API SECTION
  //////////////////////////////////////////////////////////////////////////////////////

  retrieveBusinessInformation();

  var userInputAddress = "Freedom Park";

  function retrieveBusinessInformation() {



///////////////////////////////////////////////////////////////////////////////////////
                                    //FIREBASE SECTION
//////////////////////////////////////////////////////////////////////////////////////
window.onload = function(){

  var firebaseConfig = {
    apiKey: "AIzaSyCut4P2yrq2ECQWaX5liAQ6luwvuUQVozA",
    authDomain: "project-1-14697.firebaseapp.com",
    databaseURL: "https://project-1-14697.firebaseio.com",
    projectId: "project-1-14697",
    storageBucket: "project-1-14697.appspot.com",
    messagingSenderId: "8693009592",
    appId: "1:8693009592:web:3ffc100f48ce733c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();
console.log("connected")

 $("#create").click(function(event) {

  event.preventDefault()


  // let users = firebase.database().child('users/')
console.log("hey")

    let email = document.querySelector("#createUser")
    let username = document.querySelector("#userName")
    let password = document.querySelector("#createPassword")
    


firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function(user) {
        displayName = username.value // change this back to username.value
        writeUserData(displayName, user) // possibly only need to pass displayName as parameter
    })


})

//Firebase UI signin 

$("#submit").click(function(event) {
  event.preventDefault();
  
  console.log("button clicked")
   let email = document.querySelector("#user")
    let password = document.querySelector("#password")
  
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  
    firebase.auth().onAuthStateChanged(user => {

    if(user) {
      window.location = 'main.html'; //After successful login, user will be redirected to main.html
        }
       
});
  
  })


function writeUserData(displayName, user) { //possibly only need to pass in displayName here
    console.log("we're in")
    firebase.database().ref('users/' + user.uid).set({
        username: displayName,
})



$("#exampleInputEmail1").val("");
$("#exampleUserName").val("");
$("#exampleInputPassword1").val("");
}



// MainPage Add Event:

//converting Event Date and Time
 Date.prototype.toDatetimeLocal = 
    function toDatetimeLocal() {
      var 
        date = this,
        ten = function (i) {
            return (i < 10 ? '0' : '') + i;
        };
        YYYY = date.getFullYear(),
        MM = ten(date.getMonth() + 1),
        DD = ten(date.getDate()),
        HH = ten(date.getHours()),
        II = ten(date.getMinutes()),
        SS = ten(date.getSeconds())
        ;
        return YYYY + "-" + MM + "-" + DD + '' + HH + ':' + II + ':' + SS
    }

document.getElementById("addBtn").addEventListener("click", e => {

    let user = firebase.auth().currentUser;  
    console.log(user)  

    // if(user)
    //     console.log(db.collection("users").doc(user.uid))
    // else
    //     alert('user not logged in')

  let DT = document.getElementById("DT")
  let leaderName = document.querySelector("#squadLeader")
  leaderName = leaderName.value
  let eventDescription = document.querySelector("#eventDescription")
  eventDescription = eventDescription.value
  let eventLocation = document.querySelector("#location")
  eventLocation = eventLocation.value
  let eventName = document.querySelector("#inputEventName")
  eventName = eventName.value
  let eventRef = firebase.database().ref("events")
  let newEventRef = eventRef.push();
  let ISOString = new Date(DT.value).toISOString();
  let finalTime = DT.value = new Date(ISOString).toDatetimeLocal();
  let name = user.displayName
  console.log(finalTime)
  console.log(name)

console.log(eventDescription)


      newEventRef.set({
      
    leader: leaderName,
    name: eventName,
    eventDate: finalTime,
    location: eventLocation,
    description: eventDescription,
    })

});

// var eventRef = ref.child(key)
let eventRef = firebase.database().ref("events")
eventRef.on('child_added', function(childSnapshot){

  
  let eventButton = $("<button>").addClass("eventButton")
  let eventTitle = $("<p>").text(childSnapshot.val().name)
  let eventLeader = $("<p>").text(childSnapshot.val().leader)
  let eventDate = $("<p>").text(childSnapshot.val().eventDate)
  let eventLocation = $("<p>").attr("id", "eventLocation").text(childSnapshot.val().location)

  $(eventButton).append(eventLocation)
  $(eventButton).append(eventDate)
  $(eventButton).append(eventLeader)
  $(eventButton).append(eventTitle)

  $("#event1").prepend(eventButton)





})




firebase.auth().onAuthStateChanged(user => {

  if(user) {
console.log("you're logged in!")     
}
     
});


$(document).on("click", ".eventButton", function () {

  
  let parkLocation = document.getElementById("eventLocation")
  
  console.log($(this).children().first().text());
})

}



