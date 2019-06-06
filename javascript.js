window.onload = function(){


//creates a variable to store input from form
    var user = $('#user').val();
    var password = $('#password').val();
    console.log(user);
    console.log(password);


/////////////////////////////////////////////////////////////////////////////


//creates a variable to store input from form for button 1.
    var eventCreator = $('#squadLeader').val();
    var eventName = $('#inputEventName').val();
    var dateTime = $('#DT').val();
    var location = $('#location').val();
    var eventDescription = $('#eventDescription').val();
    var teamRoster = $('#roster').val();

    console.log(eventCreator);
    console.log(eventName);
    console.log(dateTime);
    console.log(location);
    console.log(eventDescription);
    console.log(teamRoster)

    //creates a variable to store input from form for button 2.
    var search = $('#searchInput').val();
    console.log(search);


///////////////////////////////////////////////////////////////////////////////////////
                                  //GOOGLE API SECTION
//////////////////////////////////////////////////////////////////////////////////////
 
//Geolocation
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('google-maps-display'), {
    center: {lat: 35.227, lng: -80.843},
    zoom: 6
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







///////////////////////////////////////////////////////////////////////////////////////
                                    //YELP API SECTION
//////////////////////////////////////////////////////////////////////////////////////





















///////////////////////////////////////////////////////////////////////////////////////
                                    //FIREBASE SECTION
//////////////////////////////////////////////////////////////////////////////////////

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
  let userSignedIn = false;

  

 $("#submitBtn").click(function() {

  event.preventDefault()
  // let users = firebase.database().child('users/')
console.log("hey")

    let email = document.querySelector("#exampleInputEmail1")
    let username = document.querySelector("#exampleUserName")
    let password = document.querySelector("#exampleInputPassword1")
    


firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function(user) {
        displayName = username.value
        writeUserData(displayName, user) // possibly only need to pass displayName as parameter
    })


})

function writeUserData(displayName, user) { //possibly only need to pass in displayName here
    console.log("we're in")
    firebase.database().ref('users/' + displayName).set({
        username: displayName,
})

firebase.auth().onAuthStateChanged(user => {

    if(user && userSignedIn === false) {
      window.location = 'main.html'; //After successful login, user will be redirected to main.html
        }
        userSignedIn = true;
});

$("#exampleInputEmail1").val("");
$("#exampleUserName").val("");
$("#exampleInputPassword1").val("");
}

}




