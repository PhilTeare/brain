var http = require('http');
var underscore = require('underscore');
var express = require('express');
var qs = require('querystring');
var nn = require('../lib/brain.js');
fs = require('fs');


http.createServer(function (req, res) {
	if (req.url=="/"){
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile('../client/app.html', 'utf8', function(err, data){
			res.end(data);
		});
	}
	else{
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 10 * Math.pow(10, 6)) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
        });
		
        req.on('end', function () {

            var POST = qs.parse(body);
            // use POST

    		if (req.url=="/in"){
    			var NN = require('../lib/brain.js');
    			var nn = new NN.NeuralNetwork();
    			var data = decodeRequest(POST);
    			if (data.length > 0){
    				resp = nn.train(data);
    			}
    			res.writeHead(200, {'Content-Type': 'text/javascript'});
    			res.end(resp);	
    		}
        });

		}
	}).listen(8082, '127.0.0.1');

//http://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers

function decodeRequest(POST){
	
	var facts = []
	for (i in POST){
		facts.push({input:str2ab(POST[i]), output: POST[i+1]});
	}
	return facts;
}

function str2ab(str) {
	str = decodeURI(str);
	  //var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	  var bufView = [];// new Uint16Array(buf);
	  for (var i=0, strLen=str.length; i<strLen; i++) {
	    //bufView[i] = str.charCodeAt(i);
		  bufView.push(str.charCodeAt(i));
	  }
	  return bufView;// buf;
	}
console.log('Server running at http://127.0.0.1:8082/');