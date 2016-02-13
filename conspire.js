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
query.setDic(loader.loadDic('Rantionary/celebrities.dic'));
query.filterLines(['jewish']);
for(var i = 0; i < 10; i++){
	console.log(query.getRandomLine().full);
}