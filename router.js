var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var queryString = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

//2. Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  // if url == "/" && GET
  if(request.url === "/"){
    if(request.method.toLowerCase() === "get") {
      // show search field
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      // if url == "/" && POST

      //get the post data from body
      request.on("data", function(postBody) {
        console.log(postBody.toString());
        // extract the username
        var query = queryString.parse(postBody.toString());
        // redirect to /:username
        response.writeHead(303, {"Location": "/" + query.username});
        response.end();

      });



    }


  }

}
//3. Handle HTTP route GET /:username i.e. /patriciajohnson4
function user(request, response){
  // if url == "/.... (anything)"
  var username = request.url.replace("/", "");
  if(username.length > 0){ // making sure the username exists
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);
    //get json from Treehouse
    var studentProfile = new Profile(username);
    // on "end"
    studentProfile.on("end", function(profileJSON) {
      // show profile

      // store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javaScriptPoints: profileJSON.points.JavaScript
      }
      // Simple response
      renderer.view("profile", values, response); // instead of the blank object, we want the values from the json profile
      renderer.view("footer", {}, response);
      response.end();
    });

    // on "error"
    studentProfile.on("error", function(error){
      // show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });



    //studentProfile.on("end", console.dir)

  }
}

module.exports.home = home;
module.exports.user = user;