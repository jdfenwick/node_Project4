var main = function () {
  var happyWords = ['happy', 'fun', 'joyful'],
      sadWords = ['sad', 'depressed', 'angry'],
      happyCount = 0,
      sadCount = 0;
  
  
  function wordCount(response){
    var resp = response.toString();
    for (var i = 0; i < happyWords.length; i++){
      if (happyWords[i]=== response.key){
        happyCount = happyCount+parseInt(response.value);
      } else if(sadWords[i]===response.key) {
         sadCount = sadCount+parseInt(response.value);
      }
    }
  }
  $.getJSON("/counts.json", function (response) { 
    response.forEach(wordCount);
    $('.happy').append("<p> Happy Count: " + happyCount + "</p>");
    $('.sad').append("<p> Sad Count: " + sadCount + "</p>");
  });
};

$(document).ready(main);