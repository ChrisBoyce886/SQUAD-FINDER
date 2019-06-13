/////////////////////////////////////////////////////////////////////////////////////////
                                //GOOGLE API SECTION
////////////////////////////////////////////////////////////////////////////////////////

//Global Variables.
var marker;
var usermarker;

//List Park location Names, latitude & longitude for the map to read.
var parkLocations = [
    {name: "Freedom Park", lat: 35.193978, lng: -80.842636},
    {name: "Frazier Park", lat: 35.232251, lng: -80.858032},
    {name: "Revolution Park", lat: 35.214758, lng: -80.876093},
    {name: "Southside Park", lat: 35.207150, lng: -80.872784},
    {name: "Bryant Neighborhood Park", lat: 35.227278, lng: -80.870150},
    {name: "Kirk Farm Park", lat: 35.321008, lng: -80.731887},
    {name: "Nevin Community Park", lat: 35.302511, lng: -80.834128},
    {name: "Renaissance Park", lat: 35.180768, lng: -80.90757},
    {name: "Latta Park", lat: 35.209623, lng: -80.850718},
];

//Begin function to load map with all accessories.
function initMap() {

//Grab UI element to place map and then set the map center to Charlotte, NC coordinates.
  var mapCenter = {lat: 35.227085, lng: -80.843124};
  map = new google.maps.Map(document.getElementById('google-maps-display'), {
    center: mapCenter,
    zoom: 11,
  });   

//Loop through park locations and add a custom marker on the map for each location.
  for (i = 0; i < parkLocations.length; i++){
    mapmarkerFinal = parkLocations[i];

    var marker = new google.maps.Marker({   
      position: mapmarkerFinal,
      map: map,
      icon: "assets/images/urbanpark.png",
      title: mapmarkerFinal.name,
      optimized: false,
      draggable: false,
      animation: google.maps.Animation.DROP,
    }); 
  };

//Bounce animation for when event button is clicked.
// function toggleBounce () {
//   if (marker.getAnimation() != null) {
//       marker.setAnimation(null);
//   } else {
//       marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }


// Create the location search box and link it to the UI element.
  var input = document.getElementById('location-SearchBox');
  var searchBox = new google.maps.places.SearchBox(input);

// Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });


// Listen for the event fired when the user selects a prediction and retrieve more details for that place.
  var markers = [];

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    };

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
    };
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };

// Create a marker for each place.
  markers.push(new google.maps.Marker({
    map: map,
    zoom: 20,
    icon: "assets/images/searchlocation.png",
    title: "Your search location",
    position: place.geometry.location,
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

//HTML5 geolocation.
function geolocation (){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

//Set User Location marker.
var usermarker = new google.maps.Marker({   
  position: pos,
  map: map,
  optimized: false,
  icon: "assets/images/locationmarker.png",
  title: "Your approx. location",
  draggable: false,
  animation: google.maps.Animation.DROP,
});

  infoWindow.setPosition(pos);
  infoWindow.setContent('Approx. location found.');
  infoWindow.open(map);
  map.setCenter(pos);
  }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
     });
    } else {
//If Browser doesn't support Geolocation.
    handleLocationError(false, infoWindow, map.getCenter());
  };
 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: Geolocation request denied. \n Please enter your location below!' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
};
};

//Run Geolocation function.
geolocation()
};


///////////////////////////////////////////////////////////////////////////////////////
//                              YELP API SECTION
//////////////////////////////////////////////////////////////////////////////////////

window.onload = function(){
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", locationDetails.photos[1]);
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", locationDetails.photos[1]);
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", locationDetails.photos[1]);
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", "assets/images/bryant-park.jpeg");
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", locationDetails.photos[1]);
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", locationDetails.photos[1]);
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", locationDetails.photos[1]);
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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
  
                $("#yelp-name").html(locationDetails.name);
                $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
                $("#yelp-rating").html("Rating: " + locationDetails.rating);
                $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
                $("#yelp-reviews-url").attr("href", locationDetails.url);
  
                if (locationDetails.display_phone === "") {
                  $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
                } else {
                $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
                }

                $("#yelp-photos").attr("src", locationDetails.photos[2]);
                $("#placeholder-photos").css('display', 'none');
                $("#yelp-photos").css('display', 'inline');
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

              $("#yelp-name").html(locationDetails.name);
              $("#yelp-address").html("Address: " + locationDetails.location.display_address[0] + ", " + locationDetails.location.display_address[1]);
              $("#yelp-rating").html("Rating: " + locationDetails.rating);
              $("#yelp-reviews-url").html("Explore Reviews" + " (" + locationDetails.review_count + " Reviews)");
              $("#yelp-reviews-url").attr("href", locationDetails.url);

              if (locationDetails.display_phone === "") {
                $("#yelp-phone-number").html("Phone Number: (980) 314-1000");
              } else {
              $("#yelp-phone-number").html("Phone Number: " + locationDetails.display_phone);
              }

              $("#yelp-photos").attr("src", locationDetails.photos[1]);
              $("#placeholder-photos").css('display', 'none');
              $("#yelp-photos").css('display', 'inline');
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

   let email = document.querySelector("#createUser")
   let username = document.querySelector("#userName")
   let password = document.querySelector("#createPassword")
  
firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
   .then(function(user) {
       displayName = username.value
       writeUserData(displayName, user)  
   })


})

function writeUserData(displayName, user) {
   console.log("we're in")
   firebase.database().ref('users/' + user.uid).set({
       username: displayName,
})


$("#submit").click(function(event) {
 event.preventDefault();

  let email = document.querySelector("#user")
  let password = document.querySelector("#password")

  firebase.auth().signInWithEmailAndPassword(email.value, password.value)

  firebase.auth().onAuthStateChanged(user => {

   if(user) {
     window.location = 'main.html'; 
       }
     
});

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
  return YYYY + "-" + MM + "-" + DD + '  @  ' + HH + ':' + II + ':' + SS + "  EST"
}

        
  
  
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
      //  image: preview
       })
  
       $("#squadLeader").val("");
       $("#inputEventName").val("");
       $("#eventDescription").val("");

     });
  
  // var eventRef = ref.child(key)
   let eventRef = firebase.database().ref("events")
   eventRef.on('child_added', function(childSnapshot){
     console.log(childSnapshot.val())
  
     var event = childSnapshot.val(); 
   console.log(event.leader)
     let eventButton = $("<button>").addClass("eventButton").addClass("collapsible").addClass(childSnapshot.key).addClass("rounded")
     let eventTitle = $("<p>").text(childSnapshot.val().name).attr("id", "eventTitle")
     console.log(eventTitle)
     let eventLeader = $("<p>").text(childSnapshot.val().leader)
     let eventDate = $("<p>").text(childSnapshot.val().eventDate)
     console.log(eventDate)
     let eventLocation = $("<a href=''>").attr("id", "eventLocation").text(childSnapshot.val().location)

     $("#eventLocation").click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:$(document).height()}, 'slow');
        var userInput = $(this).children().first().text();
        console.log(userInput);  
        moveMap()  
        return false;       
     });
     
  
     $(eventButton).append(eventLocation)
    //  $(eventButton).append(eventDate)
    //  $(eventButton).append(eventLeader)
     $(eventButton).append(eventTitle)
  
     let contentDiv = $("<div>").addClass("content");
      $(eventButton).append(contentDiv)
     $("#events-dump").prepend(eventButton)
  

     let detailText = document.createElement("p")
     detailText.id = "detailText"
     detailText.innerText = "Click to Open/Close Squad Details:  "
     let leaderHeader = document.createElement("p")
     leaderHeader.id = "eventLeaderInButton"
     leaderHeader.innerText = event.leader
     var elm = document.createElement('h1')
     elm.id = 'event-'+childSnapshot.key;
     $(elm).attr("id", "leaderHeader")
     elm.innerText = "Squad leader for this event will be:";
     let contentDivSelector = document.querySelector('.content')
     contentDivSelector.appendChild(elm);
     let eventName = document.createElement("p")
     eventName.id = "eventNameInButton"
     eventName.innerText = event.name
     let eventDateInButton = document.createElement("p")
     eventDateInButton.id = "eventDateInButton"
     eventDateInButton.innerText = event.eventDate
     let eventDescriptionInButton = document.createElement("p")
     eventDescriptionInButton.id = "eventDescriptionInButton"
     eventDescriptionInButton.innerText = event.description
     let eventHeaderInButton = document.createElement("p")
     eventHeaderInButton.id = "eventHeader"
     eventHeaderInButton.innerText = "This Squad Event is for: "
     let eventDateHeaderInButton = document.createElement("p")
     eventDateHeaderInButton.id = "eventDateHeader"
     eventDateHeaderInButton.innerText = "This Squad will be meeting around: "
    let checkmark = document.createElement("button")
    checkmark.id = "checkmark"
    checkmark.innerText = "✓"
    let eventDescriptionHeader = document.createElement("p")
    eventDescriptionHeader.id = "eventDescriptionHeader"
    eventDescriptionHeader.innerText = "Event Description:  "
    let xmark = document.createElement("button")
    xmark.id = "xmark"
    xmark.innerText = "X"

     $(contentDiv).append(detailText)
     $(detailText).append(elm)
      $(elm).append(leaderHeader)
      $(elm).append(eventHeaderInButton)
     $(elm).append(eventName)
     $(elm).append(eventDateHeaderInButton)
     $(elm).append(eventDateInButton)
     $(elm).append(eventDescriptionHeader)
     $(elm).append(eventDescriptionInButton)
     $(elm).append(checkmark)
     $(elm).append(xmark)

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

   $(document).on("click", "#checkmark", function() {
  
    $(this).toggleClass('buttonClassB');
  
 })
  
 $(document).on("click", "#xmark", function() {
  
    $(this).toggleClass('buttonClassA');

})
   firebase.auth().onAuthStateChanged(user => {
  
     if(user) {
   console.log("you're logged in!")     
   }
       
   });
  
//////////////////////////////////////////////////////////
////////////////// GOOGLE API INSERT /////////////////////
//////////////////////////////////////////////////////////

//Click function to find location when event button is clicked and moves map to that park location
$(document).on("click", ".eventButton", function parksLocation () {
   
//Set userInput to the selected event location
var userInput = $(this).children().first().text();
  console.log(userInput);

//Set function to move the map to the park location
function moveMap(){   

//Loop through all the parks and set new variable
for (i = 0; i < parkLocations.length; i++){
        
  parkLocationMatch = parkLocations[i];
  console.log(parkLocationMatch);

//If park name matches user input/park location
if (userInput == parkLocationMatch.name){
        
  mapCenter = parkLocationMatch;
  console.log(parkLocationMatch);

//Move map center to the location coordinates of the park, set to satellite imagery, and zoom in
map = new google.maps.Map(document.getElementById('google-maps-display'),{
  center: mapCenter,
  zoom: 18,
  icon: "assets/images/urbanpark.png",
  title: parkLocationMatch.name,
  mapTypeId: 'satellite',
  optimized: false,
  animation: google.maps.Animation.BOUNCE,
});
  
//For loop to set the markers for all the other parks if user decides to move the map around 
for (i = 0; i < parkLocations.length; i++){

  mapmarkerFinal = parkLocations[i];   

  var marker = new google.maps.Marker({   
    position: mapmarkerFinal,
    map: map,
    icon: "assets/images/urbanpark.png",
    title: mapmarkerFinal.name,
    optimized: false,
    draggable: false,
    animation: google.maps.Animation.DROP,        
  });  
};
} else {
    console.log("fail")          
  };
};
};

//Run moveMap function
moveMap();

///////////////////////////////////////////////////////////////
////////////////// END OF GOOGLE API INSERT ///////////////////
///////////////////////////////////////////////////////////////
  

     let parkLocation = document.getElementById("eventLocation")
    
     console.log($(this).children().first().text());

     return $(this).children().first().text();
  
   })
  
  
   document.getElementById('get_file').onclick = function() {
     document.getElementById('my_file').click();
   };

}