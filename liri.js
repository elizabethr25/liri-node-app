require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

switch(process.argv[2]){
    case `my-tweets` : 
    tweets(); break;
    case `spotify-this-song`:
    spotify(); break;
    case `movie-this` :
    movie(); break;
    case `do-what-it-says` :
    doWhat(); break;
}