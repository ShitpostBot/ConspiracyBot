var compiler = require('./rant/rant-compiler.js');
var fs = require('fs');

var sentences;

exports.generateConspiracy = function(){
	return compiler.rant(fetchRandomSentence());
}

exports.reloadFiles = function(){
	compiler.clearDicts();
	compiler.loadDictionary('Rantionary');
	compiler.loadDictionary('ConspiracyDict');
	sentences = fs.readFileSync('sentences.txt').toString().replace(/(\r|\n\r|\r\n)/, '').split('\n');
}

function fetchRandomSentence(){
	return sentences[Math.floor(Math.random() * sentences.length)];
}

exports.reloadFiles();