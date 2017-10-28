function getWikicode(){
	var finalArray = [];
	var prepareArray = [];
	var usage = document.querySelector("input[type='radio']:checked").id || "";
	var input = document.getElementById("base").value;
	if(usage == "convert"){
		var split = input.split("\n");
		for(i = 0; i < split.length; i++){
			var formFullName = "";
			var current = split[i];
			var formCode = current.match(/\d{3}(?:[a-z]{1}|)/).toString();
			var isForm = false;
			if(formCode.match(/[a-z]/)){
				isForm = true;
			}
			current = current.remove(/\{\{Poké\|.*?\|/);
			current = current.toString().remove(/\}\}/).toString();
			if(isForm){
				current = current.replace("d'Alola","forme Alola");
			}
			finalArray.push(current);
		}
	}
	else if (usage == "translate"){
		var learnersList = input.split("\n");
		while(learnersList.indexOf("TM/HM") != -1){
			learnersList.splice(0,1);
		}
		var PokémonList = Object.keys(EnglishPokémon);
		for(x = 0; x < learnersList.length; x++){
			var currentRow = learnersList[x];
			for(i = 0; i < PokémonList.length; i++){
				var Name = PokémonList[i];
				if (currentRow.indexOf(Name) != -1 && finalArray.indexOf(Name) == -1){
					prepareArray[i] = EnglishPokémon[Name];
				}
				else continue;
			}
		}
		finalArray = prepareArray.map(function(name){
			return name != undefined;
		});
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

var inputs = document.querySelectorAll("input[type='radio']");
for(i = 0; i < inputs.length; i++){
	inputs[i].addEventListener("click",function(){
		var id = this.id;
		switch(id){
			case "translate" : document.getElementById("changeText").innerHTML = "Copiez-collez depuis le Pokédex Pokémon Showdown. Ne prenez que l'encadré TM/HM.";
			break;
			case "convert" : document.getElementById("changeText").innerHTML = "Copiez-collez depuis l'éditeur de wikicode de Poképédia.";
			break;
			default : document.getElementById("changeText").innerHTML = "Admirez ce texte. Ou pas.";
		}
	});
}
