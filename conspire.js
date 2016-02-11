var gen = require('./conspiracy-gen.js');
var fb = require('./facebook.js');

setInterval(function(){
	var date = new Date();
	if(date.getMinutes() % 20 == 0){
		fb.postToFacebook(gen.generateConspiracy(), function(res){
			console.log("posted at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds() + ": " + res);
		});
	}
}, 60 * 1000);

