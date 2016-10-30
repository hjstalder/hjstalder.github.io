//  ***********************
//  Read the language.
//  Build the start text, tabulators, dropdown lists and the slider and render them.
//  ***********************
// The default language is german
var language = "de";

// ***********************
// Organize the tabulators 
// ***********************
function opentab(evt, register) {
  console.log("setactive", evt.currentTarget.className);

    // Declare all variables
    var i, tabcontent, tablinks;

    // Set the start-tab back to the normal backgroundColor
    document.getElementById("starttab").style.backgroundColor = color.normalTab;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(register).style.display = "block";
    evt.currentTarget.className += " active";
}

function opentabVis(evt, register) {
  //console.log("setactive", evt.currentTarget.className);

    // Declare all variables
    var i, tabcontent, tablinks;

    // Set the start-tab back to the normal backgroundColor
    document.getElementById("starttab").style.backgroundColor = color.normalTab;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(register).style.display = "block";
    document.getElementById("tabvis").click();
}

// The home tab is the start tab
// This function is called on <body onload>
function setactive(evt, register) { 

    // Set the text for the information tooltips
    document.getElementById("tooltiptext_parameter").innerHTML = window[setLanguage()]["parameterinfo"];
    document.getElementById("tooltiptext_landuse").innerHTML = window[setLanguage()]["landuseinfo"];
    //document.getElementById("tooltiptext_place").innerHTML = window[setLanguage()]["placeinfo"];
    document.getElementById("tooltiptext_vis").innerHTML = window[setLanguage()]["linkVis"];
    document.getElementById("tooltiptext_handling").innerHTML = window[setLanguage()]["hometext5"];    
    document.getElementById("tooltiptext_handling_vis").innerHTML = window[setLanguage()]["hometext5"];    

    // Set the name of the tabs
    document.getElementById("tabhome").innerHTML = window[setLanguage()]["tabhome"];
    document.getElementById("tabvis").innerHTML = window[setLanguage()]["tabvis"];

    // After onload the page, show the start-tab as the current tab
    document.getElementById(register).style.display = "block";
    document.getElementById("starttab").style.backgroundColor = color.currentTab;
   
	  // Set the content in the right language in the tab home
    document.getElementById('text0').innerHTML = window[setLanguage()]["hometext0"];
    document.getElementById('text1').innerHTML = window[setLanguage()]["hometext1"];
    document.getElementById('text2').innerHTML = window[setLanguage()]["hometext2"];
    document.getElementById('text3').innerHTML = window[setLanguage()]["hometext3"];
    document.getElementById('text4').innerHTML = window[setLanguage()]["hometext4"];

    // External link to the NABO publications
    document.getElementById("publication8504").href = window[setLanguage()]["nabo8504"];
    document.getElementById("publication8509").href = window[setLanguage()]["nabo8509"];
    document.getElementById("pubtext8504").innerHTML = window[setLanguage()]["pubtext8504"]; 
    document.getElementById("pubtext8509").innerHTML   = window[setLanguage()]["pubtext8509"]; 

    //Set the info icon to "none" in the barchart area
    document.getElementById("municipalityDetails").style.display = "none"; 
}

// ***********************
// Set the language
// Read the language from the url and set the variable language. Default is "de".
// ***********************
function setLanguage() {
  var key = 'lang';
	var langValue = getParameter(key);

	switch (langValue) {
      case 'de':
      	language = "de";
        break;
      case 'en':
        language = "en";
        break;
      case 'fr':
        language = "fr";
        break;
      case 'it':
        language = "it";
        break;
      default:
        language = "de";
        break; 
    }
    return language;
}
// ***********************
// Get the scale value
// Read the scale parameter from the url. 
// If the parameter scale=guideValue is set in the URL then show the circles radius in dependence of guide value
// ***********************
function getScale() {
  //Read scale paramter from the url
  var key = 'scale';
  var scaleValue = getParameter(key);
  return scaleValue;
}
// ***********************
// Get the secure value
// Read the secure parameter from the url.
// If the parameter lindasServer=no then read the data file and not the online sparql access 
// ***********************
function getLindasServer() {
  var key = 'lindasServer';
  var lindasServerValue = getParameter(key);
  return lindasServerValue;
}
// ***********************
// Read the value from the url
// ***********************
function getParameter(key) {
  var query = window.location.search.substring(1); 
  var pairs = query.split('&');
 
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    if(pair[0] == key) {
      if(pair[1].length > 0)
        return pair[1];
    }  
  }
  return undefined;  
}

// ***********************
// Organize the dropdown lists 
// ***********************
//build the dropdown list for landuse - function dropdown_landuse and landuseValues
function dropdown_landuse(landuse_data) {

    var selectElement = document.getElementById('landuseID');
    var counter = 0;

    // **********************************
    // The order of the dropdown is fix
    // **********************************
    // The frist entry of the list is fix
    // **********************************
    var option = document.createElement('option');
    option.text = window[setLanguage()]["chooseLanduse"];
    option.value = "";
    selectElement.options[counter] = option;
  
    // **********************************
    // Crop values
    // **********************************    
    var landuseGroup = buildLanduseGroup(window[setLanguage()]["chooseCrop"]);
    console.log("landuseGroup: ", landuseGroup.length);
    for(var y=0;y<landuseGroup.length;y++){
        var option = document.createElement('option'); 
        console.log("landuseGroup2: ", landuseGroup[y]);
        option.text = landuseGroup[y];
        option.value = landuseGroup[y];
        counter = counter+1;
        selectElement.options[counter] = option;
        // Delete the grouped element in the array. 
        // If there is an element left at the end of grouping, 
        // then show this element at the end of the dropdown list
        for(var r=0;r<landuse_data.length;r++){
          if(landuse_data[r].key==landuseGroup[y]){
            console.log("zähler", r);
            landuse_data.splice(r,1);            
          }
        }
    }

    // **********************************
    // All grassland
    // **********************************
    var option = document.createElement('option');
    option.text = window[setLanguage()]["chooseGrassland"];
    option.value = window[setLanguage()]["chooseGrassland"];
    counter = counter+1;
    selectElement.options[counter] = option;

    // Grassland values
    var landuseGroup = buildLanduseGroup(window[setLanguage()]["chooseGrassland"]);
    console.log("landuseGroup: ", landuseGroup.length);
    for(var y=0;y<landuseGroup.length;y++){
        var option = document.createElement('option'); 
        console.log("landuseGroup2: ", landuseGroup[y]);
        option.text = landuseGroup[y];
        option.value = landuseGroup[y];
        counter = counter+1;
        selectElement.options[counter] = option;
        // Delete the grouped element in the array. 
        // If there is an element left at the end of grouping, 
        // then show this element at the end of the dropdown list
        for(var r=0;r<landuse_data.length;r++){
          if(landuse_data[r].key==landuseGroup[y]){
            console.log("zähler", r);
            landuse_data.splice(r,1);            
          }
        }
    }
    // **********************************
    // All forest
    // **********************************
    var option = document.createElement('option');
    option.text = window[setLanguage()]["chooseForest"];
    option.value = window[setLanguage()]["chooseForest"];
    counter = counter+1;
    selectElement.options[counter] = option;

    // Forest values
    var landuseGroup = buildLanduseGroup(window[setLanguage()]["chooseForest"]);
    console.log("landuseGroup: ", landuseGroup.length);
    for(var y=0;y<landuseGroup.length;y++){
        var option = document.createElement('option'); 
        console.log("landuseGroup2: ", landuseGroup[y]);
        option.text = landuseGroup[y];
        option.value = landuseGroup[y];
        counter = counter+1;
        selectElement.options[counter] = option;
        // Delete the grouped element in the array. 
        // If there is an element left at the end of grouping, 
        // then show this element at the end of the dropdown list
        for(var r=0;r<landuse_data.length;r++){
          if(landuse_data[r].key==landuseGroup[y]){
            console.log("zähler", r);
            landuse_data.splice(r,1);            
          }
        }
    }
    // **********************************
    // All special growing
    // **********************************
    var option = document.createElement('option');
    option.text = window[setLanguage()]["chooseSpecialGrowing"];
    option.value = window[setLanguage()]["chooseSpecialGrowing"];
    counter = counter+1;
    selectElement.options[counter] = option;

    // special growing values
    var landuseGroup = buildLanduseGroup(window[setLanguage()]["chooseSpecialGrowing"]);
    console.log("landuseGroup: ", landuseGroup.length);
    for(var y=0;y<landuseGroup.length;y++){
        var option = document.createElement('option'); 
        console.log("landuseGroup2: ", landuseGroup[y]);
        option.text = landuseGroup[y];
        option.value = landuseGroup[y];
        counter = counter+1;
        selectElement.options[counter] = option;
        // Delete the grouped element in the array. 
        // If there is an element left at the end of grouping, 
        // then show this element at the end of the dropdown list
        for(var r=0;r<landuse_data.length;r++){
          if(landuse_data[r].key==landuseGroup[y]){
            console.log("zähler", r);
            landuse_data.splice(r,1);            
          }
        }
    }

    // **********************************
    // All othter
    // **********************************
    var option = document.createElement('option');
    option.text = window[setLanguage()]["chooseOther"];
    option.value = window[setLanguage()]["chooseOther"];
    counter = counter+1;
    selectElement.options[counter] = option;

    // Othter values
    var landuseGroup = buildLanduseGroup(window[setLanguage()]["chooseOther"]);
    console.log("landuseGroup: ", landuseGroup.length);
    for(var y=0;y<landuseGroup.length;y++){
        var option = document.createElement('option'); 
        console.log("landuseGroup2: ", landuseGroup[y]);
        option.text = landuseGroup[y];
        option.value = landuseGroup[y];
        counter = counter+1;
        selectElement.options[counter] = option;
        // Delete the grouped element in the array. 
        // If there is an element left at the end of grouping, 
        // then show this element at the end of the dropdown list
        for(var r=0;r<landuse_data.length;r++){
          if(landuse_data[r].key==landuseGroup[y]){
            console.log("zähler", r);
            landuse_data.splice(r,1);            
          }
        }
    }

    // If there is an element left at the end of grouping, 
    // then show this element at the end of the dropdown list
    for(var i=0;i<landuse_data.length;i++){
      counter = counter+1;
      var option = document.createElement('option');	
      option.text = landuse_data[i].key;
      option.value = landuse_data[i].key;
      selectElement.options[counter] = option;
 	}
}
function landuseValues(json_data) {

  var head = json_data.head.vars;
  var bindings = json_data.results.bindings;		

  var landuse_data = d3.nest()
    .key(function(d) { return d.landuse.value;})
    .rollup(function(d) { return d.length;})
    .entries(bindings);

  console.log("landuse data: ", landuse_data);    

  //Sort the landuse value 
  //By default, the sort() method sorts the values as strings in alphabetical and ascending order.
  landuse_data.sort(function (a, b) {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  dropdown_landuse(landuse_data);
}

//build the dropdown list for parameter (heavy metal) - function dropdown_parameter and parameterValues
function dropdown_parameter(parameter_data) {

    var selectElement = document.getElementById('subID');

    // the frist entry of the list is fix
    var option = document.createElement('option');
    option.text = window[setLanguage()]["chooseParameter"];
    option.value = "";
    selectElement.options[0] = option;

    for(var i=0;i<parameter_data.length;i++){
      var option = document.createElement('option');	
      option.text = parameter_data[i].key;
      option.value = parameter_data[i].key;
      selectElement.options[i+1] = option;
 	}
}
function parameterValues(json_data) {

  var head = json_data.head.vars;
  var bindings = json_data.results.bindings;		

  var parameter_data = d3.nest()
    .key(function(d) { return d.parameter.value;})
    .rollup(function(d) { return d.length;})
    .entries(bindings);

  //Sort the parameter value
  //By default, the sort() method sorts the values as strings in alphabetical and ascending order.
  parameter_data.sort(function (a, b) {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  dropdown_parameter(parameter_data);
}

// ***********************
// Organize the slider
// ***********************
function surveyValues(json_data) {

  var head = json_data.head.vars;
  var bindings = json_data.results.bindings;		

  var survey_years = d3.nest()
    .key(function(d) { return d.survey.value;})
    .key(function(d) { return formatYear(new Date(d.date.value));}) 
    .rollup(function(d) { return d.length;})
    .entries(bindings);   

  console.log("SurveyYears: ", survey_years);

  document.getElementById('survey').innerHTML = window[setLanguage()]["chooseSurvey"];

  slider(survey_years);
}
function slider(survey_data) { 

	//var sliderticks = [1,2,3,4,5,6];  --> test for 6 ticks
  var sliderticks = [];
	for(var i=0;i<survey_data.length;i++){
		sliderticks.push(survey_data[i].key);
	}

  console.log("sliderticks", sliderticks.length);

  //Set the surveyValue to the last period
  surveyValue = sliderticks.length;

 	//Draw the slider (slider.js)
  d3.select("#slider").call(d3.slider()
                              .axis(d3.svg.axis().orient("bottom")                             
                              .ticks(sliderticks.length)
                              .tickFormat(d3.format("0"))).min(d3.min(sliderticks)).max(d3.max(sliderticks))
                              .step(1)
                              .value(d3.max(sliderticks))
                              .on("slide", function(evt, value) {
                                   setTimeout(function() {updateYear(value)},10);
                               }));

  //Test for 6 periods
  //for(var i=0; i<6; i++) {
  //    document.getElementById("slider").getElementsByTagName("text")[i].textContent = "2000-0"+i;
  //}

  for(var i=0; i<survey_data.length; i++) {
      for(j=0; j<survey_data[i].values.length; j++) {
      var lastElement = survey_data[i].values.length-1;
      var period = survey_data[i].values[0].key + "-" + formatYearTwo(new Date(survey_data[i].values[lastElement].key));
      document.getElementById("slider").getElementsByTagName("text")[i].textContent = period;
    }
  }
    
  //Set the text for the ticks
  //for(var i=0;i<survey_data.length;i++){ 
  //  document.getElementById("slider").getElementsByTagName("text")[i].textContent = survey["survey"+i];
 	//}

    console.log("slider-wert: ", d3.select("#slider").property("value"));
}
function updateYear(value) {
	//Fill the survey values --> global variable
	surveyValue = value;
	console.log("Slider-Value: ", surveyValue); 
	updateData(json_data_all);
}

function mobileCheck() { 
  console.log("Mobile: ", navigator.userAgent);
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
      return true;
    } else {
      return false;
    }
}

function openpub8504() {


}

 

