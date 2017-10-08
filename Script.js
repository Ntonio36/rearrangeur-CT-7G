document.getElementById("base").onkeyup = function(){
	var PokémonText = this.value;
	var alolanFlag = false;
	PokémonText = PokémonText.replace(/\{\{Poké\|\d{1,3}/g,"");
	PokémonText = PokémonText.replace(/\}\}/g,"");
	var PokémonArray = PokémonText.split("\n");
	var finalArray = [];		
	for (i = 0; i < PokémonArray.length; i++){
		if(PokémonArray[i].indexOf("d'Alola") != -1){
			alolanFlag = true;
			PokémonArray[i] = PokémonArray[i].replace(" d'Alola","");
		}
		PokémonArray[i] = PokémonArray[i].replace("|","");
		var currentText = PokémonArray[i];
		finalArray.push(PokémonArray[i]+(alolanFlag?" forme Alola":""));
	}
	document.getElementById("result").value = finalArray.join("/");
};
