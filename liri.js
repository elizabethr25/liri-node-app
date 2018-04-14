require("dotenv").config();

var fs = require("fs");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const keys = require('./keys.js')

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const arg1 = process.argv[2];
const arg2 = process.argv[3];

switch (arg1) {
    case 'my-tweets':
        tweets();
        break;
    case 'spotify-this-song':
        spotify();
        break;
    case 'movie-this':
        movie();
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
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log('Elizabeth tweeted: ' + tweets[i].text + " at " + tweets[i].created_at);
                fs.appendFile('log.txt', 'Elizabeth tweeted: ' + tweets[i].text + " at " + tweets[i].created_at);
            }
        }
        else {
            console.log('Error.')
        }

    });


//Spotify
function spotify () {}

}



