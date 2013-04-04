var worker = function (allWords) {
  var redisClient = require("redis").createClient(),
      twitter = require("ntwitter"),
      credentials = require("./credentials.js");
      
  var t = new twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.access_token_key,
      access_token_secret: credentials.access_token_secret
  });

  t.stream(
    'statuses/filter',
    {track:allWords},
    function(stream) {
      stream.on('data', function(tweet) {
        console.log(tweet.text);
        for (var i = 0; i<allWords.length; i++) {
          if(tweet.text.indexOf(allWords[i]>-1)){
            redisClient.incr(allWords[i]);
          }
        }
      });
    }
  );
}

module.exports = worker;