var fs = require("fs");
var loadedDic;
var lines;
var attributes = {};
var content = [];
var lastContentIndex = -1;

var activeClasses = [];

//loads all text in as a string, and saves it interally
//dic: the filepath of the dictionary
function loadText(dicName){
	loadedDic = fs.readFileSync(dicName).toString();
}

function getContent(){
	lines = loadedDic.replace(/(\r|\r\n|\n\r)/g, '\n').split('\n');
	for(var i = 0; i < lines.length; i++){
		processLine(lines[i].replace(/( |\t)*/, ''), i);
	}
}

function processLine(line, lineNo){
	if(line.startsWith('>')){
		var obj = {};
		lastContentIndex++;
		var subs = line.replace('> ', '').split('/');
		for(var i = 0; i < subs.length; i++){
			obj[attributes.subs[i]] = subs[i];
		}
		obj.classes = activeClasses.slice();
		content[lastContentIndex] = obj;

	} else if(line.startsWith('#class add')){
		activeClasses.push(line.split(' ')[2]);


	} else if(line.startsWith('#class remove')){
		var classToRemove = line.split(' ')[2];
		var newActiveClasses = [];
		for(var i = 0; i < activeClasses.length; i++){
			if(activeClasses[i] != classToRemove){
				newActiveClasses.push(activeClasses[i]);
			}
		}
		activeClasses = newActiveClasses;


	} else if(line.startsWith('#')){
		line = line.replace('#', '');
		var arr = line.split(' ');
		var label = arr[0];
		var arguments = arr.slice(1, arr.length);
		attributes[label] = arguments;


	} else if(line.startsWith('| class')){
		var classes = line.split(' ').slice(2, line.split(' ').length);
		for(var i = 0; i < classes.length; i++){
			content[lastContentIndex].classes.push(classes[i]);
		}
	}
}

function getObject(){
	var obj = {
		'name': attributes.name,
		'subs': attributes.subs
	}
	obj['content'] = content;
	return obj;
}

exports.loadDic = function(file){
	loadText(file);
	getContent();
	return getObject();
}