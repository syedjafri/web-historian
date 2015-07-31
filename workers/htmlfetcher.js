// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

/* set status to working.. */
/* start download, callback = set status = archived */
var http = require('http');
var url = require('url');
var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var fs = require('fs');


exports.getUrlContents = function(url) {
 // create folder
 // save html
   url=url.split("\n")[0];
   console.log("URL was: "+url);

   var options = {
    host: url,
    port: 80,
    path: '/' 
  };
  console.log (options);
  var data="";
  var checkPath = archive.paths.archivedSites;
  var filename="/index.html";
  

  http.get(options, function(res) {
    res.on('data', function(chunk) { data += chunk; });

    res.on('end', function() {
      fs.exists(checkPath+"/"+url, function(exists){
        if (!exists){
          fs.mkdir(checkPath+"/"+url, function(){
            var fd=checkPath+"/"+url+filename;
            fs.writeFile(fd, data);
          });
        }
      
      });
      console.log("Got response: ");
      console.log("data logs here");
    });
    res.on('error', function(e) {
      console.log("Got error: " + e.message);
    });

  });
};