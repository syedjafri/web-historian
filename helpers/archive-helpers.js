var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var results = "";
  fs.readFile(exports.paths.list, function(err, data){
    results += data;
    results=results.split("\n");
    console.log("readListOfUrls");
    console.log("results array is: ");
    console.log(results);

    callback(results);
  });
};

exports.isUrlInList = function(url){
  url = url.trim();
  console.log("In isUrlInList");
  return exports.readListOfUrls(function (array){
    console.log("calling contains with url: "+url);
    for (var i=0; i<array.length; i++){
     
      console.log(array[i]+" " +url+" Match? "+(array[i]===url))
      console.log("array[i] length: "+array[i].length+" url length: "+ url.length)
      if (array[i]===url){
        return true;
      }
    } return false;
  });

};

exports.addUrlToList = function(url){
  fs.appendFile(exports.paths.list, url);
};

exports.isURLArchived = function(url){
  var checkPath = exports.paths.archivedSites+"/"+url;
  console.log("hey");
  fs.exists(checkPath, function(exists){
    console.log("Path: "+checkPath+" is: " +exists);
    return false;
  });
  /*[{
    url: google.com
    status: archived
  }, {
    url: amazon.com
    status: working
  },
  fs.readdir(exports.paths.archivedSites, function (err, files){
      for (var i=0; i<files.length; i++){
        if files[i] === url{
          return true
        }
      return false
      }
  });

  
  ]*/
};

exports.downloadUrls = function(list){

};
