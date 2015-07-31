var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers.js');
var fs = require('fs');

var actions = {
  'GET': function(req, res) {
    /* if your router needs to pattern-match endpoints */
     var parsedUrl = url.parse(req.url);
     var endPoint;
     
     // If  '/'  is passed in, return site assests
     if (parsedUrl.pathname === '/'){
      endPoint = '/index.html';
      helper.serveAssets(res, endPoint, false, 200);
     } else {
      // else return archive list site
      endPoint = parsedUrl.pathname;
      helper.serveAssets(res, endPoint, true, 200);
     }
    
  },
  
  'POST': function(req, res) {
    console.log("Making a POST Request")
    helper.writeAssets(req, res); // adds url to the list
  }
}; 

exports.handleRequest = function(req, res) {

  var action = actions[req.method];
  action(req, res);

};

