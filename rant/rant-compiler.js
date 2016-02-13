var fs = require('fs');
var query = require('./rant-query.js');
var loader = require('./dic-loader.js');

var dicts = [];
var script;

var tokenRegex = /<.*?>/;

exports.loadDictionary = function(dir){
	var files = fs.readdirSync(dir);
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		if (file.endsWith('.dic')) {
			dicts.push(loader.loadDic(dir+'/'+file));
		}
	}
}

exports.rant = function(rantScript){
	script = rantScript;
	while(hasToken()){
		processToken();
	}
	return script;
}

function hasToken(){
	return tokenRegex.test(script);
}

function processToken(){
	var token = script.match(tokenRegex)[0].replace(/(<|>)/g, '');
	var args = token.split('-');
	var dictName = args[0];
	var filters = args.length == 1 ? [] : args.slice(1, args.length);
	if(filters.length > 0) filters[filters.length - 1] = filters[filters.length - 1].replace(/\..*/, '');
	var sub = token.split('.').length == 1 ? '@DEFAULT' : token.split('.')[1];

	var dict;
	for (var i = 0; i < dicts.length; i++) {
		if(dicts[i].name == dictName){
			dict = dicts[i];
			break;
		}
	}

	if(sub == '@DEFAULT'){
		sub = dict.subs[0];
	}

	query.setDic(dict);
	query.filterLines(filters);

	script = script.replace(tokenRegex, query.getRandomLine()[sub]);
}