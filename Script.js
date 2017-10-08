document.getElementById("base").onkeyup = function(){
	var PokémonText = this.value;
	var PokémonArray = PokémonText.split(" ");
	var PokémonList = Object.keys(Pokémon);
	var finalArray = [];
	for (i = 0; i < PokémonList.length; i++){
		if (PokémonArray.indexOf(PokémonList[i]) != -1 && finalArray.indexOf(PokémonList[i]) == -1){ // Pour éviter les doublons
			if (PokémonList[i].indexOf("-") != -1){
				var beforeDash = PokémonList[i].substring(0,PokémonList[i].indexOf("-"));
				var afterDash = PokémonList[i].replace(beforeDash+"-","");
				var pseudoFinalText = beforeDash+"-"+afterDash;
				if (pseudoFinalText.indexOf("Méga-") != -1 && pseudoFinalText.indexOf("Primo-") != -1){
					continue;
				}
				else if (pseudoFinalText == "Ho-Oh"){
					finalArray.push("Ho-Oh");
				}
				else {
					finalArray.push(beforeDash + " Forme " + afterDash);
				}
			}
			else {
				finalArray.push(PokémonList[i]);
			}
		}
	}
	document.getElementById("result").value = finalArray.join("/");
};
