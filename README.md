# Train-Scheduler

## About
This app pulls data from a firebase realtime database to display the name, destination, frequency, next arrival and minutes away of train lines. Additional train lines can also be written into the database using the submission form. Time-related computation is done using moment.js.

## TODO
1. Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).
2. Try adding update and remove buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
3. As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.