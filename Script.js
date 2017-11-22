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
			if(current == "" || current.indexOf("{{Poké|") == -1) continue;
			else {
				var formCode = current.match(/\d{3}(?:[a-z]{1}|)/).toString();
				var isForm = false;
				if(formCode.match(/[a-z]/)){
					isForm = true;
				}
				current = current.remove(/\{\{Poké\|.*?\|/);
				current = current.toString().remove(/\}\}/).toString();
				if(isForm){
					var toReplace = ["Libegon","Monaflemit","Morpheo","M.Mime"];
					var toInsert = ["Libégon","Monaflèmit","Morphéo","M. Mime"];
					
					for(i = 0; i < toReplace.length; i++){
						if(current.indexOf(toReplace[i]) != -1){
							current = current.replace(toReplace[i],toInsert[i]);
						}
					}
				}
				finalArray.push(current);
			}
		}
	}
	else if (usage == "translate"){
		var learnersList = input.split("\n");
		while(learnersList.indexOf("TM/HM") != -1){
			learnersList.splice(0,1);
		}
		switch(true){
			case document.getElementById("SL").checked :
				var PokémonList = Object.keys(EnglishPokémon);
			break;
			case document.getElementById("USUL").checked :
				var PokémonList = Object.keys(EnglishPokémonUSUM);
			break;
			default : "";
		}
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
		for(i = 0; i < prepareArray.length; i++){
			if(prepareArray[i] != undefined){
				finalArray.push(prepareArray[i]);
			}
			else continue;
		}
	}
	else if(usage === "none"){
		finalArray = [];
		document.getElementById("base").value = "";
		document.getElementById("result").value = "";
	}
	
	document.getElementById("result").value = (finalArray.length?finalArray.join("/"):"");
}

String.prototype.remove = function(part){
	return this.replace(part,"");
};

var inputs = document.querySelectorAll("input[name='usage']");
for(i = 0; i < inputs.length; i++){
	inputs[i].addEventListener("click",function(){
		var id = this.id;
		switch(id){
			case "translate" : 
				document.getElementById("changeText").innerHTML = "Copiez-collez depuis le Pokédex Pokémon Showdown. Ne prenez que l'encadré TM/HM.";
				document.getElementById("Gen7Games").style.display = "inline";
			break;
			case "convert" : 
				document.getElementById("changeText").innerHTML = "Copiez-collez depuis l'éditeur de wikicode de Poképédia.";
				document.getElementById("Gen7Games").hide();
			break;
			default : 
				document.getElementById("changeText").innerHTML = "Admirez ce texte. Ou pas.";
				document.getElementById("Gen7Games").hide();
		}
	});
}

Object.prototype.hide = function(){
	this.style.display = "none";
	var nodes = this.childNodes;
	for(i = 0; i < nodes.length; i++){
		nodes[i].checked = false;
		nodes[i].value = "";
	}
};
