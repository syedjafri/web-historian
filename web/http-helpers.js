var path = require('path');
var fs = require('fs');
var fetcher = require('../workers/htmlfetcher.js');
var archive = require('../helpers/archive-helpers');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, archived, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  

  switch (path.extname(asset)) {
    case '.html':
    headers['Content-Type'] = 'text/html';
    break;
    case '.css':
    headers['Content-Type'] = 'text/css';
    break;
  }


  asset = archived ? archive.paths.archivedSites+"/"+asset+"/index.html" : 
  archive.paths.siteAssets+asset;

  console.log("Got to serveAssets");
  fs.readFile(asset, 'utf8', function(err, data){
    if (!(err)) {
      // Send response back when file is done reading
      res.writeHead(200, headers);
      res.write(data);
      res.end();
    } else {
      sendResponse(res, 404);
    }
  });
};

exports.writeAssets = function(req, res) {
  
  var statusCode=302;
  var data="";
  console.log("In Write Assest");
  req.on('data', function(chunk) { data += chunk; });
  req.on('end', function() {
    console.log(data);

  });
  var url = data.split("=")[1] + '\n';
  var flag = archive.isUrlInList(url);

  setTimeout(function(){
    
    

    if (!(flag)){
      console.log("Asset NOT Found: Making Local Copy")
      archive.addUrlToList(url);
      fetcher.getUrlContents(url);
      sendResponse(res, statusCode);
    } else {
      console.log("Asset Found: Serving Local Copy")
      exports.serveAssets(res, url, true, 200);
    }

  },2000); 

  
  


};

function sendResponse(res, statusCode){
  res.writeHead(statusCode, headers);
  res.end();
}