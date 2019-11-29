require("dotenv").config();

var fs = require("fs");
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
    if (!band){
        band = "Maroon 5";
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
        console.log("Please check spelling. Otherwise band not found")
    })
}
else if (command === "spotify-this-song") {
    var song = "";
    for (var i = 3; i < query.length; i++) {
        song += query[i] + " ";
       }
    if (!song){
        song = "The Sign Ace";
    }
    spotify
    .search({type: 'track', query: song, limit: 1})
    .then(response => {

        console.log("Album Name: " + response.tracks.items[0].album.name);

        for(var j = 0; j < response.tracks.items[0].artists.length;j++){
            console.log("Artist(s): " + response.tracks.items[0].artists[j].name);
        }
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Listen to the song here: " + response.tracks.items[0].external_urls.spotify);
    })
    .catch(err => {
        console.log("Please check spelling. Otherwise artist not found");
    })

}
else if (command === "movie-this") {
    var movie = "";
    for (var i = 3; i < query.length; i++) {
        if (i > 3 && i < query.length) {
            movie = movie + "+" +  query[i];
          } else {
            movie += query[i];
        
          }
    }
    if (!movie){
        movie = "Mr Nobody";
    }
      
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=3139364f").then(
        function(response){
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("Imdb Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    ).catch(err => {
        console.log("Please check spelling. Otherwise movie not found")
    })
}
else if (command === "do-what-it-says") {
    
    fs.readFile("random.txt", "utf8", (error, data) => {
        
        var formatData = data.split(",");
        
        // command = formatData[0];
        query[3] = formatData[1];
        var song = query[3];
        
        spotify
        .search({type: 'track', query: song, limit: 1})
        .then(response => {

            console.log("Album Name: " + response.tracks.items[0].album.name);

            for(var j = 0; j < response.tracks.items[0].artists.length;j++){
                console.log("Artist(s): " + response.tracks.items[0].artists[j].name);
            }
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Listen to the song here: " + response.tracks.items[0].external_urls.spotify);
        })
        .catch(err => {
            console.log("Please check spelling. Otherwise artist not found");
        })
    })
}else{
    console.log("error command not found. Commands are... concert-this <bandname> ||spotify-this-song <songtitle> || movie-this <movietitle> ||  do-what-it-says")
}