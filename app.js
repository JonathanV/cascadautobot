//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
const crypto = require('crypto');

var constants = require('./constants);
var sharedSecret = constants.sharedSecret;

var bot = require('./bot');
const bufSecret = Buffer(sharedSecret, "base64");

var bot = require('./bot');
var http = require('http');
var PORT = process.env.port || process.env.PORT || 8080;

http.createServer(function(request, response) { 
	var payload = '';
	// Process the request
	request.on('data', function (data) {
		payload += data;
	});
	
	// Respond to the request
	request.on('end', function() {
		try {
			// Retrieve authorization HMAC information
			var auth = this.headers['authorization'];
			// Calculate HMAC on the message we've received using the shared secret			
			var msgBuf = Buffer.from(payload, 'utf8');
			var msgHash = "HMAC " + crypto.createHmac('sha256', bufSecret).update(msgBuf).digest("base64");
			// console.log("Computed HMAC: " + msgHash);
			// console.log("Received HMAC: " + auth);

			//------------
			//To test without auth:
			//------------
			// var receivedMsg = JSON.parse(payload);
			// var responseMsg = bot.handle_action(receivedMsg);
			// response.write(responseMsg);
			// response.end();
			//------------

			response.writeHead(200);
			if (msgHash === auth) {
				var receivedMsg = JSON.parse(payload);
				//Handle message
				var responseMsg = bot.handle_action(receivedMsg);
			} else {
				var responseMsg = '{ "type": "message", "text": "Error: message sender cannot be authenticated." }';
			}
			response.write(responseMsg);
			response.end();
		}
		catch (err) {
			response.writeHead(400);
			return response.end("Error: " + err + "\n" + err.stack);
		}
	});		

}).listen(PORT);

console.log('Listening on port %s', PORT);