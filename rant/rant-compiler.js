var fs = require('fs');
var query = require('./rant-query.js');
var loader = require('./dic-loader.js');

var dicts = [];
var script;

var tokenRegex = /<.*?>/;

var matchCarrierMap = {};
var matchAssocMap = {};

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
	matchCarrierMap = {};
	matchAssocMap = {};
	var limit = 1000;
	while(hasToken() && limit > 0){
		processToken();
		limit--;
	}
	return script;
}

function hasToken(){
	return tokenRegex.test(script);
}

function processToken(){
	var token = script.match(tokenRegex)[0].replace(/(<|>)/g, '');
	if(token.includes('::')){
		//carriers
		//match
		if(token.includes('::=')){
			var label = token.split('::=')[1];
			if(!(label in matchCarrierMap)){
				var strippedToken = token.split('::=')[0];
				matchCarrierMap[label] = compileToken(strippedToken.split('::=')[0])[getSub(strippedToken)];
			}
			script = script.replace(tokenRegex, matchCarrierMap[label]);
		}

		//assoc
		else if(token.includes('::@')){
			var label = token.split('::@')[1];
			var strippedToken = token.split('::@')[0];
			var dict = getDict(getDictName(strippedToken));
			if(!(label in matchAssocMap)){
				var compiledToken = compileToken(strippedToken);
				matchAssocMap[label] = compiledToken.classes;
				script = script.replace(tokenRegex, compiledToken[getSub(strippedToken, dict)]);
			} else{
				query.setDic(dict);
				query.filterLinesOr(matchAssocMap[label]);
				script = script.replace(tokenRegex, query.getRandomLine()[getSub(strippedToken, dict)]);
			}
		}
	} else{
		replaceToken(token);
	}
}

function replaceToken(token){
	script = script.replace(tokenRegex, compileToken(token)[getSub(token, getDict(getDictName(token)))]);
}

function compileToken(token){
	var dictName = getDictName(token);
	var dict = getDict(dictName);
	var filters = getFilters(token);
	var sub = getSub(token, dict);

	query.setDic(dict);
	query.filterLines(filters);

	return query.getRandomLine();
}

function getFilters(token){
	var args = token.split('-');
	var filters = args.length == 1 ? [] : args.slice(1, args.length);
	if(filters.length > 0) filters[filters.length - 1] = filters[filters.length - 1].replace(/\..*/, '');
	return filters;
}

function getDictName(token){
	var args = token.split('-');
	var dictName = args[0].split('.')[0];
	return dictName;
}

function getSub(token, dict){
	var sub = token.split('.').length == 1 ? '@DEFAULT' : token.split('.')[1];
	if(sub == '@DEFAULT'){
		sub = dict.subs[0];
	}
	return sub;
}

function getDict(dictName){
	var dict;
	for (var i = 0; i < dicts.length; i++) {
		if(dicts[i].name == dictName){
			dict = dicts[i];
			break;
		}
	}
	return dict;
}