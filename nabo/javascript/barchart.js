//  ***********************
//  Build the details for the barchart and render them
//  ***********************
function barChart(json_data, substance, i_municipality) {

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y"));

    console.log("Bar x: ", x);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return d.value + " " + d.unit;
  })

dataDetail = [];
dataParam = [];
value = 0;

//Read all data for the next steps
var head = json_data.head.vars;
var bindings = json_data.results.bindings;
var measurement = null;

bindings.forEach(function(z) {    

    //If the measurement.value is undefined or "NAN" then write 0   
    if(z.measurement == undefined || z.measurement.value == "NAN") { 
      measurement = 0; 
    } else { 
      measurement = +z.measurement.value; 
    };

    //Read the data for one parameter and ALL municipality
    if (z.parameter.value==substance) {
      dataParam.push({
        altitude: +z.altitude.value,
        date: formatYearMonthDay(new Date(z.date.value)),
        landnutzung: z.landuse.value,
        value: measurement,   
        municipality: z.municipality.value,
        substance: z.parameter.value,
        plot: +z.plot.value,
        year: formatYear(new Date(z.date.value)),
        site: +z.site.value,
        survey: +z.survey.value,
        unit: z.unit.value      
      });
    }    

    //Read the data for one parameter and ONE municipality
    if (z.parameter.value==substance && z.municipality.value==i_municipality) {
      dataDetail.push({
        altitude: +z.altitude.value,
        date: formatYearMonthDay(new Date(z.date.value)),
        landnutzung: z.landuse.value,
        value: measurement,   
        municipality: z.municipality.value,
        substance: z.parameter.value,
        plot: +z.plot.value,
        year: formatYear(new Date(z.date.value)),
        site: +z.site.value,
        survey: +z.survey.value,
        unit: z.unit.value      
      });
    }
 });

console.log("barchart detail: ", dataDetail);
console.log("dataParam: ", dataParam);

//Sort the data by year
dataDetail.sort(function (a, b) {
  if (a.year > b.year) {
    return 1;
  }
  if (a.year < b.year) {
    return -1;
  }
  // a must be equal to b
  return 0;
});

console.log('Chart4: ', dataDetail);
console.log('height: ', height);

svg.call(tip);

dataDetail.forEach(function(s,i) {

  var maxYaxis = 0;
  //Round the value for a suitable y axis
  if(d3.max(dataParam, function(d) { return d.value; }) < 10) {
    maxYaxis = Math.ceil(d3.max(dataParam, function(d) { return d.value; }));
  } else if(d3.max(dataParam, function(d) { return d.value; }) < 100) { 
    maxYaxis = (Math.ceil(d3.max(dataParam, function(d) { return d.value / 10; }))) * 10;
  } else { 
    maxYaxis = (Math.ceil(d3.max(dataParam, function(d) { return d.value / 100; }))) * 100;
  }
 
  x.domain(dataDetail.map(function(d) { return parseDate(String(d.year)); }));
  y.domain([0, maxYaxis]);

  console.log('Chart5: ', s.value);
  console.log('Chart6: ', i);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "+1em")
      .attr("dy", "+1em");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

  svg.selectAll(".bar")
      .data(dataDetail)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(parseDate(String(d.year))); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { 
        console.log("Hoehe Bar: ", height - y(d.value));
        return height - y(d.value); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  var dataLine = [];
  var linelevel = guidanceLevel[paramMapping[substance]];
  console.log("LineLevel: ", y(linelevel));

  dataLine.push({
    x1: 0,
    y1: y(linelevel),
    x2: width,
    y2: y(linelevel)
  });

  console.log("dataLine: ", dataLine);

  svg.selectAll(".line")
      .data(dataLine)
      .enter().append("line")
      .attr("x1", function(d) { return d.x1; }) 
      .attr("y1", function(d) { return d.y1; })
      .attr("x2", function(d) { return d.x2; })
      .attr("y2", function(d) { return d.y2; })
      .attr("stroke-width", 1)
      .attr("stroke", color.guidanceLevel);      
  });
}