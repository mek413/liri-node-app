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
    var song = "";
    for (var i = 3; i < query.length; i++) {
        song += query[i] + " ";
       }
    if (!song){
        song = "The Sign";
    }
    spotify
    .search({type: 'track', query: song, limit: 1})
    .then(response => {

        console.log("Album Name: " + response.tracks.items[0].album.name);

        for(var j = 0; j < response.tracks.items[0].artists.length;j++){
            console.log("Artists: " + response.tracks.items[0].artists[j].name);
        }
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Listen to the song here: " + response.tracks.items[0].external_urls.spotify);
    })
    .catch(err => {
        console.log(err);
    })

}
else if (command === "movie-this") {
    console.log("omdb API");
}
else if (command === "do-what-it-says") {
    console.log("ok man don't be so pushy");
}else{
    console.log("error command not found")
}