document.getElementById("base").onkeyup = function(){
	var Names = this.value.split("/");
	var finalArray = [];
	var PokémonList = Object.keys(EnglishPokémon);
	for(i = 0; i < PokémonList.length; i++){
		var Name = PokémonList[i];
		if (Names.indexOf(Name) != -1 && finalArray.indexOf(Name) == -1){
			finalArray.push(EnglishPokémon[Name]);
		}
		else continue;
	}
	document.getElementById("result").value = finalArray.join("/");
};
