//  ***********************
//  Build the details for the selected municipality and render them
//  ***********************
function showMunicipalityDetail(d) {
  console.log('Selection2', selection);

  var a = d3.select('#detail').selectAll('p')
    .data(selection)
    .html(function(d) { return "<div>" + "<br>" +
      "<strong>" + window[setLanguage()]["municipality"] + ": " + "</strong>" + "<span id='content'>" + d.municipality + "</span>" + "<br>" +
      "<strong>" + window[setLanguage()]["municipalityID"] + ": " + "</strong>" + "<span id='content'>" + d.site + "</span>" + "<br>" +
      "<strong>" + window[setLanguage()]["altitude"] + ": " + "</strong>" + "<span id='content'>" + d.altitude + " " +
      window[setLanguage()]["altitudeUnit"] + "</span>" + "<br>" + 
      "<strong>" + window[setLanguage()]["landuse"] + ": " + "</strong>" + "<span id='content'>" + d.landuse + "</span>" + "<br>" + "<br>" + 
      "<strong>" + window[setLanguage()]["parameter"] + ": " + "</strong>" + "<span id='content'>" + d.substance + "</span>" + "<br>" + 
      "<strong>" + window[setLanguage()]["unit"] + ": " + "</strong>" + "<span id='content'>" + d.unit + "</span>" + "<br>" + 
      "<span id='content'>" + window[setLanguage()]["unitValueLegend"] + "</span>" + "</div>"});
    
  a.enter()
    .append('p')
    .html(function(d) { return "<div>" + "<br>" +
      "<strong>" + window[setLanguage()]["municipality"] + ": " + "</strong>" + "<span id='content'>" + d.municipality + "</span>" + "<br>" +
      "<strong>" + window[setLanguage()]["municipalityID"] + ": " + "</strong>" + "<span id='content'>" + d.site + "</span>" + "<br>" +
      "<strong>" + window[setLanguage()]["altitude"] + ": " + "</strong>" + "<span id='content'>" + d.altitude + " " +
      window[setLanguage()]["altitudeUnit"] + "</span>" + "<br>" + 
      "<strong>" + window[setLanguage()]["landuse"] + ": " + "</strong>" + "<span id='content'>" + d.landuse + "</span>" + "<br>" + "<br>" + 
      "<strong>" + window[setLanguage()]["parameter"] + ": " + "</strong>" + "<span id='content'>" + d.substance + "</span>" + "<br>" + 
      "<strong>" + window[setLanguage()]["unit"] + ": " + "</strong>" + "<span id='content'>" + d.unit + "</span>" + "<br>" + 
      "<span id='content'>" + window[setLanguage()]["unitValueLegend"] + "</span>" + "</div>"});

  d3.selectAll('#chart').html("");
  console.log("Substance, municipality: ", selection[0].substance, selection[0].municipality);
  //barChart(json_data_all, d.substance, d.municipality);
  barChart(json_data_all, selection[0].substance, selection[0].municipality);

  //Set the selected municipality
  //document.getElementById("selectedMunicipality").value = d.municipality;
  document.getElementById("selectedMunicipality").value = selection[0].municipality;
  //Set the info icon to "block" in the barchart area
  document.getElementById("municipalityDetails").style.display = "block";
  
  a.exit().remove(); 

}
