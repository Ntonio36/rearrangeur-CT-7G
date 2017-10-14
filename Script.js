function getWikicode(){
	var finalArray = [];
	var usage = document.querySelector("input[type='radio']:checked").id || "";
	var input = document.getElementById("base").value;
	if(usage == "convert"){
		var split = input.split("\n");
		for(i = 0; i < split.length; i++){
			var formFullName = "";
			var current = split[i];
			var formCode = current.match(/\d{3}(?:[a-z]{1}|)/).toString();
			if(formCode.match(/[a-z]/)){
				var formID = formCode.toString();
				formFullName = formes[formID[3]];
			}
			current = current.remove(/\{\{Poké\|.*?\|/);
			current = current.toString().remove(/\}\}/).toString();
			if(formFullName != ""){
				current = current + " forme " + formFullName;
			}
			finalArray.push(current);
		}
	}
	else if (usage == "translate"){
		var Names = input.split("/");
		var PokémonList = Object.keys(EnglishPokémon);
		for(i = 0; i < PokémonList.length; i++){
			var Name = PokémonList[i];
			if (Names.indexOf(Name) != -1 && finalArray.indexOf(Name) == -1){
				finalArray.push(EnglishPokémon[Name]);
			}
			else continue;
		}
	}
	else if(usage === "none"){
		finalArray = [];
	}
	document.getElementById("result").value = (finalArray.length?finalArray.join("/"):"");
	document.getElementById("base").value = "";
}

String.prototype.remove = function(part){
	return this.replace(part,"");
}

var formes = {
	a : "Alola",
	b : "Blanc",
	n : "Noir",
};
