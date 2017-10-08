document.getElementById("base").onkeyup = function(){
	var PokémonText = this.value;
	PokémonText = PokémonText.replace(/\{\{Poké\|\d{1,3}\|/g,"");
	PokémonText = PokémonText.replace(/\}\}/g,"");
	var PokémonArray = PokémonText.split("\n");
	var finalArray = [];		
	for (i = 0; i < PokémonArray.length; i++){
		finalArray.push(PokémonArray[i]);
	}
	document.getElementById("result").value = finalArray.join("/");
};
