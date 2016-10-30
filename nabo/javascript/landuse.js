//  ***********************
//  If a group of landuse is selected (e.g. grassland all)
//	build an array with all landuse values for this group
//  ***********************
function buildLanduseGroup(landuse) {
	var landuseGroup = [];
	switch (landuse) {
      	case window[setLanguage()]["chooseCrop"]:
      		landuseGroup = [window[setLanguage()]["cropCultivation"]];
        	return landuseGroup;
        	break;
        case window[setLanguage()]["chooseGrassland"]:
      		landuseGroup = [window[setLanguage()]["grasslandIntensiv"], window[setLanguage()]["grasslandLessIntensive"], window[setLanguage()]["grasslandExtensiv"]];
        	return landuseGroup;
        	break;	
      	case window[setLanguage()]["chooseForest"]:
      		landuseGroup = [window[setLanguage()]["deciduousForest"], window[setLanguage()]["mixedForest"], window[setLanguage()]["coniferousForest"]];
        	return landuseGroup;
        	break;
      	case window[setLanguage()]["chooseSpecialGrowing"]:
      		landuseGroup = [window[setLanguage()]["vegetableGrowing"], window[setLanguage()]["fruitGrowing"], window[setLanguage()]["viticulture"]];
        	return landuseGroup;
        	break;
      	case window[setLanguage()]["chooseOther"]:
      		landuseGroup = [window[setLanguage()]["protectedSite"], window[setLanguage()]["urbanPark"]];
        	return landuseGroup;
        	break;
      	default:
      		landuseGroup = [landuse];
        	return landuseGroup;
    }
}
