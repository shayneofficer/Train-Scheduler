// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdto1JzrqJd3w_v87bxHbfS7kQo-b3Ey4",
    authDomain: "train-scheduler-4a899.firebaseapp.com",
    databaseURL: "https://train-scheduler-4a899.firebaseio.com",
    projectId: "train-scheduler-4a899",
    storageBucket: "train-scheduler-4a899.appspot.com",
    messagingSenderId: "243256776343"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTime = $("#first-train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: trainFirstTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    // var newRow = $("<tr>").append(
    //     $("<td>").text(trainName),
    //     $("<td>").text(trainDestination),
    //     $("<td>").text(trainFrequency),
    //     $("<td>").text(trainName),
    //     $("<td>").text(trainName)
    // );

    // $("#train-table > tbody").append(newRow);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainName),
        $("<td>").text(trainName)
    );


    $("#train-table > tbody").append(newRow);
});