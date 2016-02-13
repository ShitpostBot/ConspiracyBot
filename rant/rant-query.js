var dic;
var activeLines;

exports.setDic = function(dict){
	dic = dict;
	activeLines = dict.content;
}

exports.filterLines = function(classes){
	activeLines = [];
	for(var i = 0; i < dic.content.length; i++){
		var line = dic.content[i];
		var matches = true;

		for(var c = 0; c < classes.length; c++){
			var cls = classes[c];
			var contains = false;
			for(var l = 0; l < line.classes.length; l++){
				if(line.classes[l] == cls){
					contains = true;
					break;
				}
			}
			if(!contains){
				matches = false;
				break;
			}
		}

		if(matches){
			activeLines.push(line);
		}
	}
}

exports.filterLinesOr = function(classes){
	activeLines = [];
	for(var i = 0; i < dic.content.length; i++){
		var line = dic.content[i];
		var matches = false;
		for(var c = 0; c < classes.length; c++){
			var cls = classes[c];
			for(var l = 0; l < line.classes.length; l++){
				if(line.classes[l] == cls){
					matches = true;
					break;
				}
				if(matches) break;
			}
			if(matches) break;
		}
		if(matches){
			activeLines.push(line);
		}
	}
}

exports.removeFilters = function(){
	activeLines = dic.content;
}

exports.getRandomLine = function(){
	var len = activeLines.length;
	return activeLines[Math.floor(Math.random() * len)];
}