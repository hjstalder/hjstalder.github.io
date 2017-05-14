// ***********************
// Organize the modal boxes 
// ***********************
function modalbox_parameter () {
	document.getElementById('modaltitel').innerHTML = d3.select("#subID").property("value");

	if(d3.select("#subID").property("value") != null && d3.select("#subID").property("value") != "") {
		document.getElementById('modaltext').innerHTML = window[setLanguage()][paramMapping[d3.select("#subID").property("value")]+ "_descr"];
	} else {
		document.getElementById('modaltext').innerHTML = window[setLanguage()]["noHeavyMetal"];
	}	
}

function modalbox_landuse () {
	document.getElementById('modaltitel').innerHTML = d3.select("#landuseID").property("value");

	if(d3.select("#landuseID").property("value") != null && d3.select("#landuseID").property("value") != "") {
		document.getElementById('modaltext').innerHTML = landuseDescription(d3.select("#landuseID").property("value"));
	} else {
		document.getElementById('modaltext').innerHTML = window[setLanguage()]["noLanduse"];
	}	
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

function landuseDescription(landuse) {
	
	switch (landuse) {
      	case window[setLanguage()]["cropCultivation"]:
        	return window[setLanguage()]["cropCultivation_descr"];
        	break;
      	case window[setLanguage()]["vegetableGrowing"]:
        	return window[setLanguage()]["vegetableGrowing_descr"];
        	break;
      	case window[setLanguage()]["grasslandIntensiv"]:
        	return window[setLanguage()]["grasslandIntensiv_descr"];
        	break;
      	case window[setLanguage()]["grasslandExtensiv"]:
        	return window[setLanguage()]["grasslandExtensiv_descr"];
        	break;
      	case window[setLanguage()]["grasslandLessIntensive"]:
        	return window[setLanguage()]["grasslandLessIntensive_descr"];
        	break;
      	case window[setLanguage()]["deciduousForest"]:
        	return window[setLanguage()]["deciduousForest_descr"];
        	break;
      	case window[setLanguage()]["mixedForest"]:
        	return window[setLanguage()]["mixedForest_descr"];
        	break;
      	case window[setLanguage()]["coniferousForest"]:
        	return window[setLanguage()]["coniferousForest_descr"];
        	break;
      	case window[setLanguage()]["fruitGrowing"]:
        	return window[setLanguage()]["fruitGrowing_descr"];
        	break;
      	case window[setLanguage()]["viticulture"]:
        	return window[setLanguage()]["viticulture_descr"];
        	break;
      	case window[setLanguage()]["protectedSite"]:
        	return window[setLanguage()]["protectedSite_descr"];
        	break;
      	case window[setLanguage()]["urbanPark"]:
        	return window[setLanguage()]["urbanPark_descr"];
        	break;
      	default:
        	return window[setLanguage()]["noLanduse"];
    }
}