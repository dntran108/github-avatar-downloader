var request = require('request');
var token = require('./secret');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var objArr = [];
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body))
  });
}


function downloadImageByURL(url, filePath) {
  // ...
}


getRepoContributors("jquery", "jquery", function(err, contributors) {
  console.log("Errors:", err);
  for (var item of contributors) {
    console.log("Result "+ item.avatar_url);
  }

});
