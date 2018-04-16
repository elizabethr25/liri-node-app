require('dotenv').config();

var request = require("request");
var fs = require('fs');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const omdb = require('omdb');
const keys = require('./keys.js')

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const arg1 = process.argv[2];
const arg2 = process.argv[3];

var x = "";
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
        x = x + "+" + process.argv[i];
    } else {
        x = x + process.argv[i];
    }
}

switch (arg1) {
    case 'my-tweets':
        tweets();
        break;
    case 'spotify-this-song':
        if (x) {
            spotifySong(x);
        } else {
            spotifySong('The Sign');
        }
        break;
    case 'movie-this':
        if (x) {
            movie(x);
        } else {
            movie('Mr. Nobody');
        }
        break;
    case 'do-what-it-says':
        doWhat();
        break;
    case '':
        if (arg2 === 'undefined') {
            console.log(`You requested ${arg2}`);
        }
        else {
            console.log('Defaulting to The Sign');
        }

    default:
        console.log("We don't know what you're taking about.")
}


//Twitter
function tweets() {
    var screenName = { screen_name: 'Elizabe47127458' };
    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
        // console.log(JSON.stringify(data));
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                //Console.log tweets 
                console.log('Elizabeth tweeted: ' + tweets[i].text + " at " + tweets[i].created_at);
                //Append tweets to log.txt file 
                fs.appendFile('log.txt', 'Elizabeth tweeted: ' + tweets[i].text + " at " + tweets[i].created_at);
            }
        }
        else {
            console.log('Error.')
        }

    });
}

//Spotify
function spotifySong(song) {
    spotify.search({ type: 'track', query: song }, function (error, data) {
        // console.log(JSON.stringify(data));
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                //Artists 
                console.log('Artist: ' + data.tracks.items[i].artists[0].name);
                fs.appendFile('log.txt', 'Artist: ' + data.tracks.items[i].artists[0].name);
                //Song's name
                console.log('Song name: ' + data.tracks.items[i].name);
                fs.appendFile('log.txt', 'Song name: ' + data.tracks.items[i].name);
                //Link to song
                console.log('Link to song: ' + data.tracks.items[i].external_urls.spotify);
                fs.appendFile('log.txt', 'Link to song' + data.tracks.items[i].external_urls.spotify);
                //Album
                console.log('Album: ' + data.tracks.items[i].album.name);
                fs.appendFile('log.txt', 'Album: ' + data.tracks.items[i].album.name);
                //Break
                console.log('------------------------');
                // fs.appendFile('log.txt', '------------------------');
            }
        }
        else {
            return console.log('An error occurred:');
        }
    });
}

// OMDb





function movie(name) {
    var queryURL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
    // console.log(queryURL);
    request(queryURL, function (error, response, body) {
        if (error) {
            return console.log(error);
        }
        if (movie.length < 1) {
            return console.log('No movies were found!');
        }
        else {
            // console.log(typeof body);
            // console.log(body);
            console.log('Movie title: ' + JSON.parse(body).Title);
            console.log('Year movie came: ' + JSON.parse(body).Year);
            console.log('IMDb Rating of the Movie: ' + JSON.parse(body).imdbRating);
            console.log('Country where the movie was produced: ' + JSON.parse(body).Country);
            console.log('Language of the movie: ' + JSON.parse(body).Language);
            console.log('Plot of the movie: ' + JSON.parse(body).Plot);
            console.log('Actors in the movie: ' + JSON.parse(body).Actors);
        }
    });
}

//Do what it says
function doWhat() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');

        spotifySong(txt[1]);
    }
)};

