/*There are 2 inputs and 1 button on the homepage.  
         
    Button 1 - #submit     
        On "click" needs to authenticate user and password. 

*/
//creates a variable to store input from form
var user = $('#user').val();
var password = $('#password').val();



/////////////////////////////////////////////////////////////////////////////
/* 
There are 6 inputs and 2 buttons on the main page that need script. 

    Button 1 :  #addEvent
        On "click" needs to --> 
            1)Retrieve input from form and list the event in the event display area.
            2)Connect to both API's 


    Button 2 : #eventSearch
        On "click" needs to -->
            1) Match the input from #searchInput with an event in the events list. 
            2) Highlight the searched events in the display area. 

*/

//creates a variable to store input from form for button 1.
var eventCreator = $('#squadLeader').val();
var eventName = $('#inputEventName').val();
var dateTime = $('#DT').val();
var location = $('#location').val();
var eventDescription = $('#eventDescription').val();
var teamRoster = $('#roster').val();

//creates a variable to store input from form for button 2.
var search = $('#searchInput').val();