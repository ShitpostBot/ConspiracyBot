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

var compiler = require('./rant/rant-compiler.js');

compiler.loadDictionary('Rantionary');
compiler.loadDictionary('ConspiracyDict');

console.log(compiler.rant("<noun-food.s> can cause <disease>!"));
console.log(compiler.rant("<group-shady> absolutely created <disease-infectious>, they've been spreading it via <noun-animal.s> for years."));
console.log(compiler.rant("<celeb::@a> works for <group>. There's no denying that. Have you seen <pron.acc::@a> <face> when <pron.nom::@a> walks past a <noun-job>? Yeah. That can only mean one thing: They have a deal with the <place.s>"));
console.log(compiler.rant("Of course <group> are just a bunch of <adj> <noun-mammal.s>! Just look at their long record of <verb.ing> people just because they're a <noun-job>."));