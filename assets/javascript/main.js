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

    // ===================================================================
    var tFrequency = parseInt(trainFrequency);

    var firstTime = moment(trainFirstTime, "HH:mm");
    console.log("FIRST TRAIN: " + moment(firstTime, "HH:mm"));

    // Difference in minutes between the first train of the day and the current time
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("MINUTES FROM FIRST TRAIN: " + diffTime);

    // Remainder of the above difference when divided by the train frequency
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain;

    if (diffTime >= 0) { // If the first train has already arrived...
        tMinutesTillTrain = tFrequency - tRemainder;
    }
    else if (diffTime < 0) { // If the first train of the day hasn't arrived yet...
        tMinutesTillTrain = -diffTime + 1;
    }

    console.log("MINUTES UNTIL TRAIN: " + tMinutesTillTrain);

    // Next Train Time
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // ===================================================================


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(nextTrain).format("hh:mm A")),
        $("<td>").text(tMinutesTillTrain)
    );


    $("#train-table > tbody").append(newRow);
});