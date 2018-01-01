$(function() {
// push the data to firebase
// display the data in the top div 
// use moment JS to calculate how long the train takes to arrive
// 


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAt0OLB0OXz0sRI5pe3gkiVE2ct8rftdQY",
    authDomain: "train-tracker-65106.firebaseapp.com",
    databaseURL: "https://train-tracker-65106.firebaseio.com",
    projectId: "train-tracker-65106",
    storageBucket: "train-tracker-65106.appspot.com",
    messagingSenderId: "30416502725"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database

let database = firebase.database();

// Creates onClick event to add new train to firebase and 
// html

$("#addTrain").on('click', function(){
    event.preventDefault();

    // capture info from the 4 inputs what the add train button is clicked
  
    let newTrainName    = $('#nameInput').val().trim();
    let newDestination  = $('#destinationInput').val().trim();
    let newTime         = moment($("#timeInput").val().trim(), "HH:mm").format("X");
    let newFrequency    = $('#frequencyInput').val().trim();

    console.log(newTrainName);
    console.log(newDestination);
    console.log(newTime);
    console.log(newFrequency);

    //Creates a local temporary object to store new train info

    let newTrain = {
      name: newTrainName,
      destination: newDestination,
      time: newTime,
      frequency: newFrequency
    }

    // Adds new train object to database
    database.ref().push(newTrain);

    // Clears text input boxes
   $('#nameInput').val("");
   $('#destinationInput').val("");
   $('#timeInput').val("");
   $('#frequencyInput').val("");
});

// Create a Firebase Event for adding train to database
// and a row in the html when user adds entry

database.ref().on("child_added", function(childSnapshot, prevChildKey){
  console.log(childSnapshot.val());

  // store everything into a variable
  let trainName   = childSnapshot.val().name;
  let destination = childSnapshot.val().destination;
  let time        = childSnapshot.val().time;
  let frequency   = childSnapshot.val().frequency;

  // test and debug

  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  // Calculate next arrival and minutes away
  let nextArrivalMath = moment.unix(time, "X").add(frequency, "minutes");
  let nextArrival = nextArrivalMath.format("h:mm:a");
  // console.log(nextArrival);

  let minutesAway = nextArrivalMath.diff(moment(), "minutes");

  
  // add each train's data into table
  $('#train-table > tbody').append(`<tr><td> ${trainName} </td><td> ${destination} </td><td> ${frequency} </td><td> ${nextArrival} </td><td> ${minutesAway}</td></tr>`)
    // < tr > <td> ${} <tr><td> ${minutesAway}
});

// updates the hmtl when a train arrives

// if(nextArrival = moment(){

//   $("")
// })

});

// next arrival = first train + frequency = converted to a time
//                1:00 pm     + 15        = 1:15

// Minutes away = next arrival - current time