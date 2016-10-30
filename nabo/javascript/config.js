var survey = {
	survey0: "1985-89",
	survey1: "1990-94",
	survey2: "1995-99",
	survey3: "2000-04",
	survey4: "2005-09"
}
var color = {
	crop: "#CCA286",						/* "Ackerbau allgemein" */
	cropCultivation: "#CCA286",				/* "Ackerbau" */
	specialGrowing: "#2E5ED6",				/* "Spezialkulturen" */
	vegetableGrowing: "#2E5ED6",			/* "Gemüsebau" */
	fruitGrowing: "#2E5ED6",				/* "Obstbau" */
	viticulture: "#2E5ED6",					/* "Rebbau" */
	grassland: "#D6CD35",					/* "Grasland" */
	grasslandIntensiv: "#D6CD35",			/* "Grasland, intensiv" */
	grasslandExtensiv: "#D6CD35",			/* "Grasland, extensiv" */
	grasslandLessIntensive: "#D6CD35",    	/* "Grasland, wenig intensiv" */
	forest: "#41BF73",						/* "Wald" */
	deciduousForest: "#41BF73",				/* "Laubwald" */
	mixedForest: "#41BF73",					/* "Mischwald" */
	coniferousForest: "#41BF73",			/* "Nadelwald" */
	other: "#CC85C9", 						/* "Andere" */
	protectedSite: "#CC85C9",				/* "Schutzstandort" */
	urbanPark: "#CC85C9",					/* "Stadtpark" */
	guidanceLevel: "#DC0018",				/* "Richtwert" */ 
	maxValue: "#CCCCCC",					/* "Maximalwert" */
	default: "#E67D73",						/* Default circle color */
	currentTab: "#66AFE9",					/* Current tab color */
	normalTab: "#D8E8EF"					/* Normal tab color */
}

var guidanceLevel = {
	Cd: "0.8",								/* Cadmium */
	Co: "25",								/* Cobalt */
	Cr: "50",								/* Chrom */
	Cu: "40",								/* Kupfer */
	Hg: "0.5",								/* Quecksilber */
	Ni: "50",								/* Nickel */
	Pb: "50",								/* Blei */
	Zn: "150"								/* Zink */
}

var paramMapping = {
	//German
	Cadmium: "Cd",
	Kobalt: "Co",
	Chrom: "Cr",
	Kupfer: "Cu",
	Quecksilber: "Hg",
	Nickel: "Ni",
	Blei: "Pb",
	Zink: "Zn",	
	//English
	cadmium: "Cd",
	cobalt: "Co",
	chrome: "Cr",
	copper: "Cu",
	mercury: "Hg",
	nickel: "Ni",
	lead: "Pb",
	zinc: "Zn",
	//Italian
	cadmio: "Cd",
	cobalto: "Co",
	cromo: "Cr",
	rame: "Cu",
	mercurio: "Hg",
	nichelio: "Ni",
	piombo: "Pb",
	zinco: "Zn",
	//French
	cadmium: "Cd",
	cobalt: "Co",
	chrome: "Cr",
	cuivre: "Cu",
	mercure: "Hg",
	nickel: "Ni",
	plomb: "Pb",
	zinc: "Zn"

}

var publicationUrl = {
	//German
	nabo8509de: "http://www.bafu.admin.ch/publikationen/publikation/01809/index.html?lang=de",
	nabo8504de: "http://www.bafu.admin.ch/publikationen/publikation/01767/index.html?lang=de",
	//French
	nabo8509fr: "http://www.bafu.admin.ch/publikationen/publikation/01809/index.html?lang=fr", 
	nabo8504fr: "http://www.bafu.admin.ch/publikationen/publikation/01767/index.html?lang=fr"

}