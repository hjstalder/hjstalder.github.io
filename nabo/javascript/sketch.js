//  ***********************
//  Main javascript file
//  Read the data
//  Build the visualization (map, circle, tooltip) and render it
//  Call the other javascript files
//  ***********************

//Width and height
var wd = 588;
var hd = 280;

//Variables needed
var data = [];
var dataDetail = [];
var json_data_all = null; //Save the json file from the sparql request
var surveyValue = 0;
var projection = null;
var path = null;
var valueExtent = [0, 0];
var radius = null;
var selection = [];
var formatYearMonthDay = d3.time.format("%Y-%m-%d");
var formatYear = d3.time.format("%Y");
var formatYearTwo = d3.time.format("%y");

var margin = {top: 60, right: 10, bottom: 60, left: 20},
    w = 588 - margin.left - margin.right,
    h = 550 - margin.top - margin.bottom;

//Create SVG element
var svg = d3.select("#vis")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var detail = d3.select("#detail")
  .append("detail")
  .attr("width", wd)
  .attr("height", hd);
  
//when the dropdown list for the measured parameter changes, remove the 
//circle and render the circle for the actual parameter
d3.select("#subID").on("change", function() {
    updateData(json_data_all);
});

d3.select("#landuseID").on("change", function() {
    console.log("Landuse value: ", this.value);
    updateData(json_data_all);
});

//This loads the swiss-cantons.geo.json for the map,
//the sparql query and the endpoint for the sparql request
//queue make sure to wait for all the files before calling the callback 
queue()
//When the input range changes update the circle 
  .defer(d3.json, "map/swiss-cantons.geo.json")
  .defer(d3.text, "sparql/sparql-ubd66-complete.rq")
  .defer(d3.text, "sparql/endpoint.txt")
  .await(ready);

//Reloading data when the sampling or parameter or landuse changes
function updateData(json_data) {

  //Remove the circles, details, barchart and icon
  d3.selectAll('.visual').remove();
  d3.selectAll('#detail').html("");
  d3.selectAll('#chart').html("");
  d3.selectAll('.glevel').remove();
  d3.selectAll('.caption').remove();
  d3.selectAll('.visualcross').remove();
  d3.selectAll('.xdataPoint').remove();
  //Set the info icon to "none" in the barchart area
  document.getElementById("municipalityDetails").style.display = "none";

  var head = json_data.head.vars;
  var bindings = json_data.results.bindings;
  var measurement = null;
  var places = null;
  var dataMeasurement = [];
  var landuseGroup = [];

  console.log("UBD66-Bindings: ", bindings);

  data.length = 0;
  bindings.forEach(function(d) { 
  
    //If the measurement.value is undefined or "NAN" then write 0    
    if(d.measurement == undefined || d.measurement.value == "NAN") {
      measurement = 0; 
      //console.log("Measurment: ", d.municipality.value, d.measurement);
    } else { 
      measurement = +d.measurement.value; 
    };

    //Read all measurement for one parameter. It's needed to draw the circles in the same range for one parameter
    if(d.parameter.value==d3.select("#subID").property("value")) {
      dataMeasurement.push({
        value: measurement
      });
    }

    /* Console output to test the coordinates -> delete at the end of project
    console.log("Value einzeln y-min: ", +d.lv03_y_min.value);  
    console.log("Value einzeln y-max: ", +d.lv03_y_max.value);    
    console.log("Value y: ", (+d.lv03_y_min.value + +d.lv03_y_max.value)/2);
    console.log("Value einzeln x-min: ", +d.lv03_x_min.value);  
    console.log("Value einzeln x-max: ", +d.lv03_x_max.value);    
    console.log("Value x: ", (+d.lv03_x_min.value + +d.lv03_x_max.value)/2);
    */

    //if landuse value is not a real value, just select the rows for parameter and survey
    if(d3.select("#landuseID").property("value") == "" || d3.select("#landuseID").property("value") == "1") {
      if (d.survey.value==surveyValue         
        && d.parameter.value==d3.select("#subID").property("value")) {
        data.push({
        altitude: +d.altitude.value,
        date: formatYearMonthDay(new Date(d.date.value)),
        landuse: d.landuse.value,
        lon: CHtoWGSlng((+d.lv03_y_min.value + +d.lv03_y_max.value)/2, (+d.lv03_x_min.value + +d.lv03_x_max.value)/2),
        lat: CHtoWGSlat((+d.lv03_y_min.value + +d.lv03_y_max.value)/2, (+d.lv03_x_min.value + +d.lv03_x_max.value)/2),
        value: measurement,   
        municipality: d.municipality.value,
        substance: d.parameter.value,
        plot: +d.plot.value,
        year: formatYear(new Date(d.date.value)),
        site: +d.site.value,
        survey: +d.survey.value,
        unit: d.unit.value
        });
      }
    } else { 
      //  If a group of landuse is selected (e.g. grassland all)
      //  build an array with all landuse values for this group
      landuseGroup = buildLanduseGroup(d3.select("#landuseID").property("value"));
      for (i = 0; i < landuseGroup.length; i++) {
       if (d.survey.value==surveyValue 
          && d.parameter.value==d3.select("#subID").property("value") 
          //&& d.landuse.value==d3.select("#landuseID").property("value")) {
          && d.landuse.value==landuseGroup[i]) {
          data.push({
          altitude: +d.altitude.value,
          date: formatYearMonthDay(new Date(d.date.value)),
          landuse: d.landuse.value,
          lon: CHtoWGSlng((+d.lv03_y_min.value + +d.lv03_y_max.value)/2, (+d.lv03_x_min.value + +d.lv03_x_max.value)/2),
          lat: CHtoWGSlat((+d.lv03_y_min.value + +d.lv03_y_max.value)/2, (+d.lv03_x_min.value + +d.lv03_x_max.value)/2),
          value: measurement,   
          municipality: d.municipality.value,
          substance: d.parameter.value,
          plot: +d.plot.value,
          year: formatYear(new Date(d.date.value)),
          site: +d.site.value,
          survey: +d.survey.value,
          unit: d.unit.value
          });
        } //if
      } //for 
    }
  });
  //Sort the data by value (measurement)
  data.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  data.forEach(function(d) { 
    console.log("Daten sortiert: ", d.value);
  });

  helpers(dataMeasurement);
}

//Call sparql query
function ready(error, json, sparqlinput, endpoint) {
  if (error) {
    console.log('error', error);
    return;
  }
  //Set the language to sparql file
  var sparql = sparqlinput.replace(/%language/g, setLanguage().toUpperCase());

  //If there is no secure environment for lindas (https://lindas-data.ch/sparql) then read the data from the saved file
  if (getLindasServer() == "http") {
    //Read the data from the saved file
    console.log("stardog");
    d3sparql.readfile(json, readyall);
  } else {
    //Call the sparql query
    d3sparql.query(json, endpoint, sparql, readyall);
  }
}

//Build and draw the map
//Build the dropdowns
//Build the data arrays for processing
function readyall(error, json, json_data) {
  if (error) {
    console.log('error', error);
    return;
  }
  console.log('json', json);
  console.log('csv', json_data);
  console.log("json_data.length: ", json_data.results.bindings.length);

  //Save all data
  json_data_all = json_data;

  //****** DRAW THE MAP *****************
  //This calculates a suitable projection for the geodata provided, using the bounding box of the geodata
  projection = getProjection(json);

  //Create a d3 path generator for the map
  path = d3.geo.path()
    .projection(projection);

  //Draw the map into the svg
  svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "none")
    .style('stroke', 'grey')

  //Read all the landuse values and create the dropdown list  
  landuseValues(json_data);
  //Read all the parameter (heavy metal) values and create the dropdown list  
  parameterValues(json_data);  
  //Read all the survey values and create the dropdown list  
  surveyValues(json_data);  
  //Load the data
  updateData(json_data);

}

//Set the radius scale function
//Build the caption and the guidance level
function helpers(dataMeasurement) {

  //If the parameter scale=guideValue is set in the URL then show the circles radius in dependence of guide value
  var range = [];
  if(d3.select("#subID").property("value") != null && d3.select("#subID").property("value") != "" && getScale() == "guideValue"){
    
    var selectedParam = paramMapping[d3.select("#subID").property("value")];
    range = [0, guidanceLevel[selectedParam]];

    radius = d3.scale.sqrt()
      .domain(range)
      .range([2, 7]);
      
  } else { 
  
  // ********* INIT HELPERS **********
  valueExtent = [0, d3.max(dataMeasurement, function(d) {
    return d.value;
  })];
  console.log('valueExtent', valueExtent);
  //This is used to map the value measurement to a suitable circle area
  radius = d3.scale.sqrt()
    .domain(valueExtent)
    .range([2, 18]);
    //.range([2, 30]);
  }
  //show the caption and the guidance level
  showCaption(dataMeasurement);
  //render the circles
  render();
}

function setForm(d) {
  console.log("setForm: ", radius(d.value));
  return 'circle';
}

//Render the circles and the tooltips
function render() {
  console.log("render", data);

  //render all the circles and 'x'
  setDataPoints();

  //Render the tooltips
  //an enter update exit cyle is used here, this is because tooltip need to 
  //be able to appear and dissapear again
  //read more about enter, update, exit 
  //here https://bl.ocks.org/mbostock/3808218
  // or here https://medium.com/@c_behrens/enter-update-exit-6cafc6014c36#.ub5qm51n3
  console.log('Selection Value', selection);

  //If the measurement value is 0, then write "no measurement" 
  var valueTooltip = "";
  selection.forEach(function(d) { 
    if(d.value == 0) { 
        valueTooltip = window[setLanguage()]["valueNA"];
    } else {
        valueTooltip = d.value + " " + d.unit; 
    };
  });

  var s = d3.select('body').selectAll('.tooltip')
    .data(selection);


  //If the access if from a mobile device then show a differnt tooltip
  if (mobileCheck()) { 
    //Enter
    s.enter()
      .append('div')
      .classed('tooltip', true);

    //Update, set the position and the content of the tooltip
    s.style('top', function(d) {
        return (projection([d.lon, d.lat])[1] - 28) + 'px';
      })
      .style('left', function(d) {
        return projection([d.lon, d.lat])[0] + 'px';
      })
      .html(function(d) { return "<div>" + 
        window[setLanguage()]["municipality"] + ": " + d.municipality + "<br>" + 
        window[setLanguage()]["measurement"] + ": " + valueTooltip + "<br>" +
        window[setLanguage()]["altitude"] + ": " + d.altitude + " " +
        window[setLanguage()]["altitudeUnit"] + "<br>" +  
        window[setLanguage()]["landuse"] + ": " + d.landuse + "<br>" +
        window[setLanguage()]["dateSampling"] + ": " + d.date + "<br>" + 
        "<a href='#' ontouchstart='showMunicipalityDetail()'><font color='#66AFE9'>" + window[setLanguage()]["howto"] + "</font></a>" + "</div>"});

    s.exit().remove();

   } else { 
   
    //Enter
    s.enter()
      .append('div')
      .classed('tooltip', true);

    //Update, set the position and the content of the tooltip
    s.style('top', function(d) {
        return (projection([d.lon, d.lat])[1] - 28) + 'px';
      })
      .style('left', function(d) {
        return projection([d.lon, d.lat])[0] + 'px';
      })
      .html(function(d) { return "<div>" + 
        window[setLanguage()]["municipality"] + ": " + d.municipality + "<br>" + 
        window[setLanguage()]["measurement"] + ": " + valueTooltip + "<br>" +
        window[setLanguage()]["altitude"] + ": " + d.altitude + " " +
        window[setLanguage()]["altitudeUnit"] + "<br>" +  
        window[setLanguage()]["landuse"] + ": " + d.landuse + "<br>" +
        window[setLanguage()]["dateSampling"] + ": " + d.date + "<br>" + "</div>"});

    s.exit().remove();

  }
}

function deselectCircle(d) {
  selection = [];
  render();
}

function selectCircle(d) {
  selection = [d];
  render();
}

function getProjection(json) {

  var projection = d3.geo.mercator()

  projection
    .scale(1)
    .translate([0, 0]);

  var boundsGenerator = d3.geo.path()
    .projection(projection);

  bounds = boundsGenerator.bounds(json);
  console.log('bounds', bounds);

  //Calculate the scale and translation values from the bounds, width, and height
  var scale = 1 / Math.max((bounds[1][0] - bounds[0][0]) / w, (bounds[1][1] - bounds[0][1]) / h),
    translation = [(w - scale * (bounds[1][0] + bounds[0][0])) / 2, (h - scale * (bounds[1][1] + bounds[0][1])) / 2];

  projection
    .scale(scale)
    .translate(translation);

  return projection;
}