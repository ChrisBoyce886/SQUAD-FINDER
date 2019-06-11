// ///////////////////////////////////////////////////////////////////////////////////////
//                                     //GOOGLE API SECTION
// //////////////////////////////////////////////////////////////////////////////////////

//Geolocation 
var marker;
var usermarker;
var parkLocation = [
    {name: "Freedom Park", lat: 35.193978, lng: -80.842636},
    {name: "Frazier Park", lat: 35.232251, lng: -80.858032},
    {name: "Revolution Park", lat: 35.214758, lng: -80.876093},
    {name: "Southside Park", lat: 35.207150, lng: -80.872784},
    {name: "Bryant Park", lat: 35.227278, lng: -80.870150},
    {name: "Kirk Farm Park", lat: 35.321008, lng: -80.731887},
    {name: "Nevin Community Park", lat: 35.302511, lng: -80.834128},
    {name: "Renaissance Park", lat: 35.180768, lng: -80.90757}
]

function initMap() {
  var mapCenter = {lat: 35.227085, lng: -80.843124};
  map = new google.maps.Map(document.getElementById('google-maps-display'), {
    center: mapCenter,
    zoom: 11
  });   

  
  for (i=0;i < parkLocation.length; i++){
   mapmarkerFinal = parkLocation[i];

   var marker = new google.maps.Marker({   
    position: mapmarkerFinal,
    map: map,
    icon: "assets/images/urbanpark.png",
    title: mapmarkerFinal.name,
    optimized: false,
    draggable: false,
    animation: google.maps.Animation.DROP,
  }); 
  //marker.addListener('click', toggleYelp); 
}

//function toggleYelp(){


//}

//Bounce animation for when event is clicked
// function toggleBounce () {
//   if (marker.getAnimation() != null) {
//       marker.setAnimation(null);
//   } else {
//       marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }

// Add click listener to toggle bounce
// google.maps.event.addListener(mapmarkerFinal, 'click', function () {
//   toggleBounce();
//   infowindow.open(map, mapmarkerFinal);
//   setTimeout(toggleBounce, 1500);
// });


// Create the search box and link it to the UI element.

var input = document.getElementById('location-SearchBox');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});

var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: "assets/images/locationmarker.png",
      title: "Your location",
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});

infoWindow = new google.maps.InfoWindow;

  //Try HTML5 geolocation.
  function geolocation (){
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

 var usermarker = new google.maps.Marker({   
    position: pos,
    map: map,
    optimized: false,
    icon: "assets/images/locationmarker.png",
    title: "Your approx. location",
    draggable: false,
    animation: google.maps.Animation.DROP
  });

      infoWindow.setPosition(pos);
      infoWindow.setContent('Approx. location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: Geolocation request denied. \n Please enter you location below!' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

}geolocation()

}

//$(document).on("click", "#eventSearch", function () {
  //    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
    //return false;

// var eventmarker =    {
//     position: parkLocation[i],
//     map: map,
//     zoom: 15,
//     optimized: false,
//     icon: "assets/images/locationmarker.png",
//     title: parkLocation.name,
//     draggable: false,
//     animation: google.maps.Animation.DROP
// }
// google.maps.event.addListener(marker, toggleBounce)

// function toggleBounce() {

//   if (marker.getAnimation() != null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
//  console.log($(this).children().first().text());
 //});

 
 




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

window.onload = function(){
///////////////////////////////////////////////////////////////////////////////////////
//YELP API SECTION
//////////////////////////////////////////////////////////////////////////////////////

  $(document).on("click", ".eventButton", function () {

    // needs to target the user input with this one
    var userInput = $(this).children().first().text();

    if (userInput === "Freedom Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Charlotte NC Parks";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[0].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })
    } else if (userInput === "Frazier Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Charlotte NC Parks";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[12].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })
    } else if (userInput === "Revolution Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Charlotte NC Parks";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[21].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })
    } else if (userInput === "Bryant Neighborhood Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Charlotte NC Parks";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[40].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })
    } else if (userInput === "Renaissance Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Charlotte NC Parks";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[25].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })
    } else if (userInput === "Southside Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Charlotte NC Parks";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[32].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })
    } else if (userInput === "Nevin Community Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Nevin Park";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[10].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })

      } else if (userInput === "Latta Park") {

        var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Charllote NC Parks";
  
        $.ajax({
            url: idQueryUrl,
            method: "GET",
            headers: {
              Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
            }
          })
          .then(function ({
            businesses
          }) {
            console.log(businesses);
  
            var businessId = businesses[6].id;
  
            var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;
  
            $.ajax({
                url: locationDetailsQueryUrl,
                method: "GET",
                headers: {
                  Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
                }
              })
              .then(function (locationDetails) {
                console.log(locationDetails);
  
                $("#yelp-name").html("Name: " + locationDetails.name);
                $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
                $("#yelp-rating").html("Rating: " + locationDetails.rating);
                $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
                $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
                $("#yelp-photos").attr("src", locationDetails.photos[1]);
              })
  
          })

    } else if (userInput === "Kirk Farm Park") {

      var idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parks&limit=50&location=" + "Kirk Farm Park";

      $.ajax({
          url: idQueryUrl,
          method: "GET",
          headers: {
            Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
          }
        })
        .then(function ({
          businesses
        }) {
          console.log(businesses);

          var businessId = businesses[4].id;

          var locationDetailsQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessId;

          $.ajax({
              url: locationDetailsQueryUrl,
              method: "GET",
              headers: {
                Authorization: "Bearer yShZGFWIbJ9Olkk75ty9dI8OJCTDjhr4wn3sgNtn_yyXVrV4HpMUcrFByNA_K1fzoNASGPf70XBvwTn3nVV0BhvcG6tqIHs0XP46d4Jy2JEyQIGlW0IDFqCs16v5XHYx"
              }
            })
            .then(function (locationDetails) {
              console.log(locationDetails);

              $("#yelp-name").html("Name: " + locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-review-count").html("Review Count: " + locationDetails.review_count);
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              $("#yelp-photos").attr("src", locationDetails.photos[1]);
            })

        })
    }
})


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
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();

  $("#create").click(function(event) {

   event.preventDefault()


    let users = firebase.database().child('users/')
 console.log("hey")

     let email = document.querySelector("#createUser")
     let username = document.querySelector("#userName")
     let password = document.querySelector("#createPassword")
    


 firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
     .then(function(user) {
         displayName = username.value
         writeUserData(displayName, user)  
     })


 })


 $("#submit").click(function(event) {
   event.preventDefault();
  
   console.log("button clicked")
    let email = document.querySelector("#user")
     let password = document.querySelector("#password")
  
   firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  
     firebase.auth().onAuthStateChanged(user => {

     if(user) {
       window.location = 'main.html'; 
         }
       
 });
  
   })


 function writeUserData(displayName, user) {
     console.log("we're in")
     firebase.database().ref('users/' + user.uid).set({
         username: displayName,
 })



 $("#exampleInputEmail1").val("");
 $("#exampleUserName").val("");
 $("#exampleInputPassword1").val("");
 }


console.log("connected")



  document.getElementById("addBtn").addEventListener("click", e => {

    event.preventDefault()
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

       usersRef = firebase.database().ref('users')
   usersRef.orderBy("uid").startAt(uid).endAt(uid).on("value", function(snapshot) {
     var user = snapshot.val();
     console.log(user)
   });
  
      
    
    
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
      //  let name = user.displayName
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
       console.log(childSnapshot.val())
    
       var event = childSnapshot.val(); 
     console.log(event.leader)
       let eventButton = $("<button>").addClass("eventButton").addClass("collapsible").addClass(childSnapshot.key)
       let eventTitle = $("<p>").text(childSnapshot.val().name)
       let eventLeader = $("<p>").text(childSnapshot.val().leader)
       let eventDate = $("<p>").text(childSnapshot.val().eventDate)
       let eventLocation = $("<p>").attr("id", "eventLocation").text(childSnapshot.val().location)
    
       $(eventButton).append(eventLocation)
       $(eventButton).append(eventDate)
       $(eventButton).append(eventLeader)
       $(eventButton).append(eventTitle)
    
       let contentDiv = $("<div>").addClass("content");
        $(eventButton).append(contentDiv)
       $("#events-dump").prepend(eventButton)
    
       var elm = document.createElement('p')
       elm.id = 'event-'+childSnapshot.key;
       elm.innerText = event.leader;
       let contentDivSelector = document.querySelector('.content')
       contentDivSelector.appendChild(elm);
    
       let eventName = document.createElement("p")
       eventName.id = "eventNameInButton"
       eventName.innerText = event.name
       $(elm).append(eventName)
    
       var coll = document.getElementsByClassName(childSnapshot.key);
    
       for (i = 0; i < coll.length; i++) {
         coll[i].addEventListener("click", function() {
           this.classList.toggle("active");
           var content = elm;
           console.log(content)
            if (content.style.display === "block") {
             content.style.display = "none";
            } else {
             content.style.display = "block";
            }
         });
       }
     })
    
     firebase.auth().onAuthStateChanged(user => {
    
       if(user) {
     console.log("you're logged in!")     
     }
         
     });
    
     $(document).on("click", ".eventButton", function parkLocation () {
    
       let parkLocation = document.getElementById("eventLocation")
      
       console.log($(this).children().first().text());

       return $(this).children().first().text();
    
     })
    
    
     document.getElementById('get_file').onclick = function() {
       document.getElementById('my_file').click();
     };
}