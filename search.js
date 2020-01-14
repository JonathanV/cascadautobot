// search.js
// ========
module.exports = {
    execute: function (bot) {  

        //Find the command and extract the search keywords
        //var re =  new RegExp('\\b'+ 'Hey' + '\\b','i')
        //var match = re.exec(receivedMsg.text)		
        //if (match){
        //    var responseMsg = '{ "type": "message", "text": "Hey yourself!" }';	
        //} else {
        //    var responseMsg = '{ "type": "message", "text": "Tu me demande donc: ' + receivedMsg.text + '" }';	
        //}				
        var responseMsg = '{ "type": "message", "text": "Error." }';	
        var url = 'https://docs.cascades.com/guidelines/index.json';
        var url = 'C:\Users\Jo1\www\index.json';        
        const https = require('https');
        https.get(url, (resp) => {
          let data = '';
          
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
        
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            var responseMsg = '{ "type": "message", "text": "Error:' + body + '" }';
            console.log(body);
            let doc_json = JSON.parse(body);
            console.log(doc_json);
            // SEARCH JSON list
            var options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                  "title",  
                  "keywords"
                ]
              };
            var fuse = new Fuse(doc_json, options); // "list" is the item array
            var result = fuse.search(bot.param1);
            var responseMsg = '{ "type": "message", "text": "' + result.href + '" }';	              
          });
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });

        return responseMsg;
    }
};
  
  