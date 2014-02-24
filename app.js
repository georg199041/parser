var request = require('request');
var htmlparser = require("htmlparser2");
var fs = require('fs');
var util = require('util');
var json = require('format-json');
var data = [];
var test = {'test': 123, 'test2': 'trere'}

request('http://makeup.com.ua/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var obj = {};

        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs){
                if (name == 'img') {
                    data.push(attribs);
                }
            },
            onattribute: function(name, value) {
                
            },
            ontext: function(text){
                //console.log(text)

            },
            onclosetag: function(tagname){
               // data.push()
            },
            onend: function() {
                fs.writeFile('./test.json', json.diffy(data), function(err) {
                    if (err) throw err;
                });
            }
        });
        parser.write(body);
        parser.done();
    }
});

