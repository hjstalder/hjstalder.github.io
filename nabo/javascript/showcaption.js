//  ***********************
//  Build the details for the caption and render them
//  ***********************
function showCaption(dataMeasurement) { 

var captionRectSize = 12;
var captionSpacing = 6;
var selectedParam = "";
var height = captionRectSize + captionSpacing;
var maxValue = d3.max(dataMeasurement, function(d) { return d.value; }); 
console.log("Max Value: ", maxValue);

//If a parameter is selected, show the caption and the highest and the guidance Level
if(d3.select("#subID").property("value") != null && d3.select("#subID").property("value") != ""){ 
  //Mapping of parameter name (e.g. Cadmium) to the code (e.g. Cd)
  selectedParam = paramMapping[d3.select("#subID").property("value")];

  var colors = d3.scale.ordinal()
    .domain([window[setLanguage()]["crop"], 
          window[setLanguage()]["grassland"],
          window[setLanguage()]["forest"],
          window[setLanguage()]["specialGrowing"],
          window[setLanguage()]["other"]])
    .range([color.crop, color.grassland, color.forest, color.specialGrowing, color.other]);

  var caption = svg.selectAll(".caption")
    .data(colors.domain())
    .enter()
    .append('g')
    .attr('class', 'caption')
    .attr('transform', function(d, i) {
      var horz = -15;
      var vert = i * height + 400;
      return 'translate(' + horz + ',' + vert + ')';
    }); 

  caption.append('circle')
    .attr("cx", 5)
    .attr("cy", 5)
    .attr("r", 5) 
    .style('fill', colors);

  caption.append('text')
    .attr('x', captionRectSize + captionSpacing)
    .attr('y', captionRectSize - captionSpacing + 4)
    .text(function(d) { return d; });

  //Show the highest and the guidance Level
  var dataGlevel = ([window[setLanguage()]["maxValue"] + ": " + maxValue + " " + window[setLanguage()]["unitValueShort"],
                    window[setLanguage()]["guidanceLevel"] + ": " + guidanceLevel[selectedParam] + " " + window[setLanguage()]["unitValueShort"]]);

  var captionCircle = d3.scale.ordinal()
    .domain([maxValue, guidanceLevel[selectedParam]])
    .range([color.maxValue, color.guidanceLevel]);

  var glevel = svg.selectAll('.glevel')
    .data(captionCircle.domain())
    .enter()
    .append('g')
    .attr('class', 'glevel')
    .attr('transform', function(d, i) {
      var horz = 320;
      console.log("radius max: ", radius(maxValue));
      var vert = i * radius(maxValue) + 415; 
      return 'translate(' + horz + ',' + vert + ')';
    })

  // circle for the max value is not yet rendered if circleMax=0
  var circleMax = 0;
  // text for the max value is not yet written if textMax=0
  var textMax = 0;

  glevel.append('circle')
    .attr("cx", 20)
    .attr("cy", function(d) {
      console.log("circleold: ", circleMax);
      if(circleMax==0) {
        circleMax = 1;
        return 10;
      } else { 
        return 25;
      }
    })
    .attr("r", function(d) {
      //Calls the radius scale function
      console.log("radius wert: ", radius(d));
      return radius(d);}) 
    .style("stroke", "none")
    .style("fill", captionCircle);

  glevel.append('text')
    .data(dataGlevel)
    .attr('x', 47)
    .attr('y', function(d) {
      console.log("circleold: ", textMax);
      if(textMax==0) {
        textMax = 1;
        return 13;
      } else { 
        return 28;
      }
    })
    .attr("text-anchor", "start")
    .text(function(d, i) { return d; });


  // Text for no measurement
  var cross = [window[setLanguage()]["noMeasurement"]];  
  console.log("Cross text: 0");

  var xdataPoint = svg.selectAll('.xdataPoint')
    .data(cross)
    .enter()
    .append('g')
    .attr('class', 'xdataPoint')
    .attr('transform', function(d, i) {
      var horz = 320;
      console.log("radius max: ", radius(maxValue));
      var vert = i * radius(maxValue) + 415; 
      return 'translate(' + horz + ',' + vert + ')';
      })    

  xdataPoint.append('text')
    .attr('x', 15)
    .attr('y',70)
    .text(function(d) {
      console.log("Cross text: ", d);
      return "X";
    });

  xdataPoint.append('text')
    .attr('x', 47)
    .attr('y',70)
    .text(function(d) {
      console.log("Cross text: ", d);
      return d;
    });
  }
}
