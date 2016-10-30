// ***********************
// Organize the modal boxes 
// ***********************
function modalbox_parameter () {
	console.log("modalbox: ", d3.select("#subID").property("value"));
	document.getElementById('modaltitel').innerHTML = d3.select("#subID").property("value");

	document.getElementById('modaltext').innerHTML = "<a href='" + window[setLanguage()]["glossarUrl"] + "'" + "target='_blank'>" + 
    window[setLanguage()]["glossarUrlText"] + "</a>";	

    document.getElementById('loreipsum').innerHTML = window[setLanguage()]["loreipsum"];
}

function modalbox_landuse () {
	console.log("modalbox: ", d3.select("#landuseID").property("value"));
	console.log("modalbox1: ", document.getElementById('modaltitel'));
	document.getElementById('modaltitel').innerHTML = window[setLanguage()]["landusetext0"];
	document.getElementById('modaltext').innerHTML = window[setLanguage()]["landusetext1"];
	document.getElementById('loreipsum').innerHTML = "";
}

function modalbox_municipality (selectedMunicipality) {
	console.log("modalbox: ", d3.select("#landuseID").property("value"));
	console.log("modalbox selection: ", selectedMunicipality.value);

	document.getElementById('modaltitel').innerHTML = selectedMunicipality.value;
	document.getElementById('modaltext').innerHTML = "";
	document.getElementById('loreipsum').innerHTML = window[setLanguage()]["loreipsum"];	
}

function modalbox_handling () {
	console.log("modalbox: ", d3.select("#landuseID").property("value"));
	console.log("modalbox1: ", document.getElementById('modaltitel'));
	document.getElementById('handlingTitle').innerHTML = window[setLanguage()]["hometext5"];
	document.getElementById('handlingTitleVis').innerHTML = window[setLanguage()]["hometext5"];
	document.getElementById('explanationTitle').innerHTML = window[setLanguage()]["hometext7"];
	document.getElementById('explanationTitleVis').innerHTML = window[setLanguage()]["hometext7"];
	document.getElementById('explanationText').innerHTML = window[setLanguage()]["hometext8"];
	document.getElementById('explanationTextVis').innerHTML = window[setLanguage()]["hometext8"];

    if (mobileCheck()) { 
      document.getElementById('handlingText').innerHTML = window[setLanguage()]["hometext6mobile"];
      document.getElementById('handlingTextVis').innerHTML = window[setLanguage()]["hometext6mobile"];
    } else {
      document.getElementById('handlingText').innerHTML = window[setLanguage()]["hometext6"];
      document.getElementById('handlingTextVis').innerHTML = window[setLanguage()]["hometext6"];
    }




}
