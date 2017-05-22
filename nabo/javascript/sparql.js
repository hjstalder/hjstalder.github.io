// ***********************
// SPARQL data access 
// ***********************
var d3sparql = {
  version: "sparql.js version 2016-06-12",
  debug: false  // Set to true for showing debug information
}

// ***********************
// XMLHTTPRequest to retrieve the data from the endpoint https://lindas-data.ch/sparql
// ***********************
d3sparql.query = function(json, endpoint, sparql, callback) {
  var url = endpoint + "?query=" + encodeURIComponent(sparql);
  if (sparql.debug) { console.log(endpoint); }
  if (sparql.debug) { console.log(url); }
  var mime = "application/sparql-results+json";
  var object = 0;
  d3.xhr(url, mime, function(error, request) {

    if(error) {
      // ***********************
      // If there is an error, write the error message to the console
      // ***********************
      console.log('error', error);
      // ***********************
      // Read the data from the saved file
      // ***********************
      d3sparql.readfile(json, callback);
    } else { 
      var json_data = request.responseText;
      console.log("Zeile-Jetzt");
      console.log("json_data", json_data);
      object = JSON.parse(json_data);
      // ***********************
      // If the json file is empty, read the data from the saved file
      // ***********************
      if(object.results.bindings.length == 0 ) {
          console.log("Leer");
          d3sparql.readfile(json, callback);
      } else {
          callback(error, json, object);
      }
    }
  });
}
// ***********************
// Read the data from the saved file and write a message
// ***********************
d3sparql.readfile = function(json, callback) {
      document.getElementById('error').innerHTML = window[setLanguage()]["errortext"];
      // ***********************
      // Read the data from the saved file with the current language
      // ***********************
      var filename = "sparql/dataUBD66_" + setLanguage() + ".json";
      queue()
          .defer(d3.json, filename)
          .await(function(error, data){ 
              if(error) {
                console.log('error', error);
              }
              console.log("data sparql1-de: ", data);
              object = data;
              callback(error, json, object);
          });
}

