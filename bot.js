// tools.js
// ========
module.exports = {
    handle_action: function (receivedMsg) {  
        try {
            var input = receivedMsg.text.split(" ");
            var bot = {
                name:   input[0],
                action: input[1],
                param1: input[2],
                param2: input[3],
                param3: input[4],
            };    

            //each actions in a different module.
            switch (bot.action){
                case "search":
                    console.log('Searching...');
                    var search = require('./search');
                    var responseMsg = search.execute(bot);
                    break;
                default:
                    var responseMsg = '{ "type": "message", "text": "Error: Unknown action ' + bot.action + '" }';
            }
		}
		catch (err) {
            var responseMsg = "Error: " + err + "\n" + err.stack;
		}
        return responseMsg;
    }
};
  
  