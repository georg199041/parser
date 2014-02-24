var request = require('request');
var htmlparser = require("htmlparser2");
var fs = require('fs');
var util = require('util');
var data = [];


request('http://makeup.com.ua/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var obj = {};
        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs){
                if (name == 'img') {
                    console.log(attribs)
                }
            },
            onattribute: function(name, value) {
                
            }
            ontext: function(text){
                console.log(text)
            },
            onclosetag: function(tagname){
               // data.push()
            }
        });
        parser.write(body);
        parser.done(function() {
            fs.writeFile('./test.json', JSON.stringify(util.inspect(data, { showHidden: true, depth: 1 }), null, '\t'), function(err) {
                if (err) throw err;
            });
        });
    }
});

