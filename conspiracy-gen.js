var conspirers, wrongdoings, nouns, actions;

exports.reloadFiles = loadFiles;

exports.generateConspiracy = function(){
	var conspirer = getConspirer();
	var wrongdoing = getWrongdoing();
	var noun = getNoun();
	var action = getAction();
	return "If {} {}, then why {} {}?".format(conspirer, wrongdoing, noun, action);
}

function loadFiles(){
	conspirers = require('./conspirers.json');
	wrongdoings = require('./wrongdoings.json');
	nouns = require('./nouns.json');
	actions = require('./actions.json');
}

function getRandom(arr){
	var len = arr.length;
	return arr[Math.floor(Math.random() * len)];
}

function getConspirer(){
	return getRandom(conspirers);
}

function getWrongdoing(){
	return getRandom(wrongdoings);
}

function getNoun(){
	return getRandom(nouns);
}

function getAction(){
	return getRandom(actions);
}

//stolen from stackoverflow
//http://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function
String.prototype.format = function() {
    var str = this;
    var i = 0;
    var len = arguments.length;
    var matches = str.match(/{}/g);
    if( !matches || matches.length !== len ) {
        throw "wrong number of arguments";
    }
    while( i < len ) {
        str = str.replace(/{}/, arguments[i] );
        i++;
    }
    return str;
};

loadFiles();