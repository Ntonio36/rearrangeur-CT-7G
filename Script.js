function getWikicode(){	
	var prepareArray = [];
	var usage = document.querySelector("input[type='radio']:checked").id || "";
	var input = document.getElementById("base").value;
	var finalNames = [];
	if(usage == "convert"){
		var strippedNumbers = input.match(/\d{3}(a|)/g);
		var strippedNames = input.match(/\|[A-Z].+(?=\}\})/g).join().remove(/\|/g).split(",");
		// En résumé, on tire le nom du Pokémon
		// Avec la diversité des combinaisons de caractères dont sont formés les noms, il fallait bien être créatif pour pouvoir
		// tous les prendre
		var toReplace = {
			"Libegon" : "Libégon",
			"Monaflemit" : "Monaflèmit",
			"Morpheo" : "Morphéo",
			"M.Mime" : "M. Mime",
			"Heledelle" : "Hélédelle",
			"Insecateur" : "Insécateur",
			"Nœunœuf" : "Noeunoeuf",
			"Remoraid" : "Rémoraid",
			"Skelenox" : "Skelénox",
			"Meditikka" : "Méditikka",
			"Skélénox" : "Skelénox",
			"Lumineon" : "Luminéon"
		};
		finalNames = strippedNames.map(function(editedName){
			var name = editedName;
			if(toReplace[editedName]){
				name = toReplace[editedName];
			}
			if(strippedNumbers[strippedNames.indexOf(editedName)].indexOf("a") != -1){ 
			// Si le numéro Dex qui correspond au Pokémon contient a
				name += " forme(a) nom(d'Alola) lien(" + name + " d'Alola)";
			}
			return name;
		});
	}
	else if (usage == "translate"){
		switch(document.querySelector("input[name='game']:checked").id){
			case "SL" :
				var PokémonList = EnglishPokémon;
			break;
			case "USUL" :
				var PokémonList = EnglishPokémonUSUM;
			break;
			default : "";
		}
		var EnglishNames = Object.keys(PokémonList);
		var frenchNames = EnglishNames.map(function(name){
			return PokémonList[name];
		});
		for(englishName in PokémonList){
			var nameMatched = input.indexOf(englishName) != -1;
			if(nameMatched && finalNames.indexOf(PokémonList[englishName]) == -1){
				finalNames.push(PokémonList[englishName]);
			}
		}
		finalNames = finalNames.sort(function(poke, followingPoke){
			return finalNames.indexOf(poke) > finalNames.indexOf(followingPoke);
		});
	}
	else if(usage === "none"){
		finalNames = [];
		document.getElementById("base").value = "";
		document.getElementById("result").value = "";
	}
	if(finalNames.length){
		document.getElementById("result").value = finalNames.join("/");
	}
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

String.prototype.exists = function(){
	if([undefined, null, false, ""].indexOf(this) == -1){
		return true;
	}
	else return false;
};
