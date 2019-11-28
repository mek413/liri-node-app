require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv;

if (command === "concert-this") {
    var band = "";
    for (var i = 3; i < query.length; i++) {
     band += query[i];
    }
      
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
        function(response){
            console.log("----- Events -----")

            for (var i = 0;i<response.data.length;i++) {
                console.log("")
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " +
                response.data[i].venue.region + " " + response.data[i].venue.country);
                console.log("Date of Event: " + moment(response.data[i].datetime).format("MMMM Do YYYY"));
                console.log("")
                console.log("=======================================================")
            }
        }
    ).catch(err => {
        console.log(err)
    })
}
else if (command === "spotify-this-song") {
    console.log("spotify API");
}
else if (command === "movie-this") {
    console.log("omdb API");
}
else if (command === "do-what-it-says") {
    console.log("ok man don't be so pushy");
}else{
    console.log("error command not found")
}