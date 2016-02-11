var FB = require('facebook-node');
var fs = require('fs');

var accessToken = fs.readFileSync('token.txt').toString();

FB.setAccessToken(accessToken);

exports.postToFacebook = function(msg, callback){
	FB.api('me/feed', 'post', {'message': msg}, function(res){
  		if(!res || res.error) {
    		console.log(!res ? 'error occurred' : res.error);
    		return;
  		}

  		callback(res.id);
	});
}