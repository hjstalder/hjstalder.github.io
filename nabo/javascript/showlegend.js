//  ***********************
//  Build the details for the legend and render them
//  ***********************
function showLegend(dataMeasurement) { 

var legendRectSize = 12;
var legendSpacing = 6;
var selectedParam = "";
var height = legendRectSize + legendSpacing;
var maxValue = d3.max(dataMeasurement, function(d) { return d.value; }); 

//If a parameter is selected, show the legend and the highest and the guidance Level
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

  var legend = svg.selectAll(".legend")
    .data(colors.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var horz = -15;
      var vert = i * height + 400;
      return 'translate(' + horz + ',' + vert + ')';
    }); 

  legend.append('circle')
    .attr("cx", 5)
    .attr("cy", 5)
    .attr("r", 5) 
    .style('fill', colors);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing + 4)
    .text(function(d) { return d; });

  //Show the highest and the guidance Level
  var dataGlevel = ([window[setLanguage()]["maxValue"] + ": " + maxValue + " " + window[setLanguage()]["unitValueShort"],
                    window[setLanguage()]["guidanceLevel"] + ": " + guidanceLevel[selectedParam] + " " + window[setLanguage()]["unitValueShort"]]);

  var legendCircle = d3.scale.ordinal()
    .domain([maxValue, guidanceLevel[selectedParam]])
    .range([color.maxValue, color.guidanceLevel]);

  var glevel = svg.selectAll('.glevel')
    .data(legendCircle.domain())
    .enter()
    .append('g')
    .attr('class', 'glevel')
    .attr('transform', function(d, i) {
      var horz = 320;
      console.log("radius max: ", radius(maxValue));
      var vert = i * radius(maxValue) + 425; 
      return 'translate(' + horz + ',' + vert + ')';
    })

  var circleold = 0;

  glevel.append('circle')
    .attr("cx", 20)
    .attr("cy", function(d, i) {
      var cyValue = i * circleold;
      circleold = radius(d) + 3;
      return cyValue;
    })
    .attr("r", function(d) {
      //Calls the radius scale function
      console.log("radius wert: ", radius(d));
      return radius(d);}) 
    .style("stroke", "none")
    .style("fill", legendCircle);

  glevel.append('text')
    .data(dataGlevel)
    .attr('x', 47)
    .attr('y', function(d,i) { return radius(maxValue) *i +5}) 
    .attr("text-anchor", "start")
    .text(function(d, i) { return d; });
  }
}
