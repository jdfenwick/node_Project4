var main = function () {
  var happyWords = ['happy', 'fun', 'joyful'],
      sadWords = ['sad', 'depressed', 'angry'],
      happyCount = 0,
      sadCount = 0;
  
  
  function wordCount(response){
    var resp = response.toString();
    for 9var i = 0; i < happyWords.length; i++){
      if (happyWords[i]=== response.key){
        $(".happy").append("<p>" + response.key + " : " + response.value + "</p>");
        happyCount = happyCount+parseInt(response.value);
      } else if(sadWords[i]===response.key) {
        $(".sad").append("<p>" + response.key + " : " + response.value + "</p>");
        sadCount = sadCount+parseInt(response.value);
      }
    }
  }
  $.getJSON(".counts.json", function (response) { 
    response.forEach(wordCounts);
    $("body").prepend("<p> Happy Count: " + happyCount + "</p>");
    $("body").prepend("<p> Sad Count: " + sadCount + "</p>");
  });
};

$(document).ready(main);