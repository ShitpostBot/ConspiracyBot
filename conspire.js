var gen = require('./conspiracy-gen.js');
var fb = require('./facebook.js');

/*setInterval(function(){
	var date = new Date();
	if(date.getMinutes() % 20 == 0){
		gen.reloadFiles();
		fb.postToFacebook(gen.generateConspiracy(), function(res){
			console.log("posted at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds() + ": " + res);
		});
	}
}, 60 * 1000);*/

var loader = require('./rant/dic-loader.js');
var query = require('./rant/rant-query.js');
var compiler = require('./rant/rant-compiler.js');

compiler.loadDictionary('Rantionary');

console.log(compiler.rant("<celeb-singer-songwriter> is a singer songwriter. Their favorite country is <country-europe>"));