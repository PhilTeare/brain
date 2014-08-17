var http = require('http');
var underscore = require('underscore');
var express = require('express');
var nn = require('../lib/brain.js');
fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('../client/app.html', 'utf8', function(err, data){
	  res.end(data);
  });
  
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');