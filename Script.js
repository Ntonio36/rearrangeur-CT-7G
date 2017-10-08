document.getElementById("base").onkeyup = function(){
	var PokémonText = this.value;
	var PokémonArray = PokémonText.split(" ");
	var PokémonList = Object.keys(Pokémon);
	var finalArray = [];
	for(i = 0; i < PokémonList.length; i++){
		if (PokémonArray.indexOf(PokémonList[i]) != -1 && finalArray.indexOf(PokémonList[i]) == -1){ // Pour éviter les doublons
			finalArray.push(PokémonList[i]);
		}
	}
	document.getElementById("result").value = finalArray.join("/");
};