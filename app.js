// We need to 'require' the                                                                                                                            
// following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
    redisClient = require("redis").createClient(),
    app = express(),
    twitterWorker = require("./twitter.js");

var happyWords = ['happy', 'fun', 'joyful'],
    sadWords = ['sad', 'depressed', 'angry'],
    allWords = ['happy', 'fun', 'joyful', 'sad', 'depressed', 'angry'];  

// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public'
    "use strict";
    app.use(express.static(path.join(__dirname, 'public')));
});

// Create the http server and get it to                                                                                                                
// listen on the specified port 3000                                                                                                                   
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
});

twitterWorker(allWords); //call back to twitter.js file

app.get("/counts.json", function	(req, res) {
    redisClient.mget(allWords, function	(error, count) {
      var results = [];
	    if (error !== null) {
            // handle error here                                                                                                                       
              console.log("ERROR: " + error);
          } else {
            for (var i = 0; i<allWords.length; i++){
              results.push({
                "key":allWords[i],
                "value":count[i]
              });
            }
            
            //use res.json to return JSON objects instead of strings
            //make sure to change .get to .mget
        }res.json(results);
    });
});