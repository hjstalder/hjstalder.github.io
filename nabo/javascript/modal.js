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
	document.getElementById('modaltitel').innerHTML = d3.select("#landuseID").property("value");
	document.getElementById('modaltext').innerHTML = "";
	document.getElementById('loreipsum').innerHTML = window[setLanguage()]["loreipsum"];	
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
	document.getElementById('handlingTitel').innerHTML = window[setLanguage()]["hometext5"];
	//document.getElementById('handlingText').innerHTML = window[setLanguage()]["hometext6"];

    if (mobileCheck()) { 
      document.getElementById('handlingText').innerHTML = window[setLanguage()]["hometext6mobile"];
    } else {
      document.getElementById('handlingText').innerHTML = window[setLanguage()]["hometext6"];
    }




}
