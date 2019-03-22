var request = require('request');
var token = require('./secret');
var fs = require('fs');

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
  request.get(url)
     .on('error', function (err) {
       throw err;
     })
     .pipe(fs.createWriteStream(filePath));
}

let var1 = process.argv.slice(2)[0];
let var2 = process.argv.slice(2)[1];
if (!var1 || !var2) {
  throw 'At least 1 argument missing';
}
getRepoContributors(var1, var2, function(err, contributors) {
  console.log("Errors:", err);
  for (var item of contributors) {
    downloadImageByURL(item.avatar_url,"avatars/"+ item.login +".jpeg");
  }
});



