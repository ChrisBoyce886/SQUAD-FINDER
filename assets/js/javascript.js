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

    if(user) {
      window.location = 'main.html'; //After successful login, user will be redirected to main.html
        }

    
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

  // uploading profile picture to firebase 
  // var fileButton = document.getElementById('profilePicture');

  // fileButton.addEventListener('change', function(e){

  //   let file = e.target.files[0]

  //   let storageRef = firebase.database().ref(user + '/profilePicture/' + file.name)

  //   let task = storageRef.put(file);

  //   let user = firebase.auth().currentUser;

  //   task.on('state_changed',

  //   function progress(snapshot){
  //     let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
  //     uploader.value = percentage;
  //   })
  // })

  var readURL = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        let file = e.target.files[0]

        let storageRef = firebase.database().ref(user + '/profilePicture/' + file.name)
        
        let task = storageRef.put(file);
        
        let user = firebase.auth().currentUser;
        
        task.on('state_changed',
          function progress(snapshot){
       let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
       uploader.value = percentage;
     })
            $('.profile-pic').attr('src', e.target.result);
  
        }

        reader.readAsDataURL(input.files[0]);
    }
}


$(".profile-pic").on('change', function(){
    readURL(this);
});

$(".upload-button").on('click', function() {
   $(".profile-pic").click();
});


$(".dropbtn").click(function(event) {
  document.getElementById("myDropdown").classList.toggle("show");
})




function writeUserData(displayName, user) { //possibly only need to pass in displayName here
    console.log("we're in")
    firebase.database().ref('users/' + user.uid).set({
        displayName: displayName,
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

 }



