 /////////////////////////////////////////////////////////////////////////////////////
 window.onload = function(){

  // ///////////////////////////////////////////////////////////////////////////////////////
  //                                     //GOOGLE API SECTION
  // //////////////////////////////////////////////////////////////////////////////////////
  
  //Geolocation 
  var marker;
  var usermarker;
  var parkLocations = [
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
                          'Error: Geolocation request denied. \n Please enter your location below!' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
  
  }
  
  geolocation()
  
  }
  
  //$(document).on("click", "#eventSearch", function () {
    //    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
      //return false;
  
  // var eventmarker =    {
  //     position: parkLocations[i],
  //     map: map,
  //     zoom: 15,
  //     optimized: false,
  //     icon: "assets/images/locationmarker.png",
  //     title: parkLocations.name,
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
          }

