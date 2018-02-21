//Problem: We need a simple way to look at a user's badge count and javascript points from a web browser
//Solution: Use Node.js to perform the profile lookups and serve out template via HTTP
var router = require("./router.js");

// Create a web server
var http = require('http');
http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');

