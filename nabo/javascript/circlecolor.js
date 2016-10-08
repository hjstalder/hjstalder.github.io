function circlecolor(landuse) {
	
	switch (landuse) {
      	case window[setLanguage()]["cropCultivation"]:
        	return color.cropCultivation;
        	break;
      	case window[setLanguage()]["vegetableGrowing"]:
        	return color.vegetableGrowing;
        	break;
      	case window[setLanguage()]["grasslandIntensiv"]:
        	return color.grasslandIntensiv;
        	break;
      	case window[setLanguage()]["grasslandExtensiv"]:
        	return color.grasslandExtensiv;
        	break;
      	case window[setLanguage()]["grasslandLessIntensive"]:
        	return color.grasslandLessIntensive;
        	break;
      	case window[setLanguage()]["deciduousForest"]:
        	return color.deciduousForest;
        	break;
      	case window[setLanguage()]["mixedForest"]:
        	return color.mixedForest;
        	break;
      	case window[setLanguage()]["coniferousForest"]:
        	return color.coniferousForest;
        	break;
      	case window[setLanguage()]["fruitGrowing"]:
        	return color.fruitGrowing;
        	break;
      	case window[setLanguage()]["viticulture"]:
        	return color.viticulture;
        	break;
      	case window[setLanguage()]["protectedSite"]:
        	return color.protectedSite;
        	break;
      	case window[setLanguage()]["urbanPark"]:
        	return color.urbanPark;
        	break;
      	default:
        	return color.default;
    }
}