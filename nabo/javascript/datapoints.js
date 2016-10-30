//  ***********************
//  Render all the circles and the 'x' if there is
//  no measurement value.
//  The rendering of these different forms has to
//  happen in two different steps
//  ***********************
function setDataPoints() { 
	var dataNoMeasurement = [];
	var dataWithMeasurement = [];
	//read all data with a measurement value and 
	//read all data without a measurement value
  	data.forEach(function(d) { 
    	if(d.value==0) {
   			dataNoMeasurement.push({
        	altitude: d.altitude,
        	date: d.date,
        	landuse: d.landuse,
        	lon: d.lon,
        	lat: d.lat,
        	value: d.value,   
        	municipality: d.municipality,
        	substance: d.substance,
        	plot: d.plot,
        	year: d.year,
        	site: d.site,
        	survey: d.survey,
        	unit: d.unit
        	});
    	} else {
   			dataWithMeasurement.push({
        	altitude: d.altitude,
        	date: d.date,
        	landuse: d.landuse,
        	lon: d.lon,
        	lat: d.lat,
        	value: d.value,   
        	municipality: d.municipality,
        	substance: d.substance,
        	plot: d.plot,
        	year: d.year,
        	site: d.site,
        	survey: d.survey,
        	unit: d.unit
        	});
    	}
  	});

  	//render all the circles
  	svg.selectAll('.visual')
    	.data(dataWithMeasurement)
    	.enter()
    	.append('circle')
    	.attr('class', 'visual')
    	.attr('cx', function(d) {
      		var proj = projection([d.lon, d.lat]);
      		return proj[0];
    		})
    	.attr('cy', function(d) {
     	 	var proj = projection([d.lon, d.lat]);
      		return proj[1];
    		})
    	.attr('r', function(d) {
      		//calls the radius scale function
      		return radius(d.value);
    		})
    	.style('fill', function(d) {
      		return circlecolor(d.landuse);
    		})  
    	.style('stroke','white') //white
    	.on('mouseover', selectCircle)
    	.on('mouseout', deselectCircle)
    	.on('click', showMunicipalityDetail) 

    //render all the 'x' if there is no measurement value	
  	svg.selectAll('.visualcross')
    	.data(dataNoMeasurement)
    	.enter()
    	.append('text')
    	.text('x')
    	.attr('class', 'visualcross')
    	.attr('x', function(d) {
      		var proj = projection([d.lon, d.lat]);
      		//proj[0]-3 because the position of the x is not like middle point of the circle
      		return proj[0]-3;
    		})
    	.attr('y', function(d) {
      		var proj = projection([d.lon, d.lat]);
      		//proj[1]+3 because the position of the x is not like middle point of the circle
      		return proj[1]+3;
    		})
    	.style('fill', function(d) {
      		//d3.select(this).moveToFront();
      		return circlecolor(d.landuse);
    		})  
    	.style('stroke', "none")
    	.on('mouseover', selectCircle)
    	.on('mouseout', deselectCircle)
    	.on('click', showMunicipalityDetail)
}