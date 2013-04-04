var http = require('http');

var numberOfServerHits = 0; //stores number of times server is pinged

http.createServer(function (req, res) { //JSON call
  res.writeHead(200, {'Content-Type': 'text/plain'});
  numberOfServerHits++;
  res.write("First Line!");
  res.end("Hellow World!\n");
}).listen(3000);

console.log('Server running on port 3000');