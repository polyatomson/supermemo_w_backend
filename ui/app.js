var http = require('http');
var fs = require('fs');
var load_inp = require('./load_input.js');

http.createServer(function (req, res) {

  fs.readFile('index.html', function(err, data) {
    if(req.url === "/index.html" || req.url === "/"){
        fs.readFile('index.html', function(err, data) {
        //    res.writeHead(200, {'Content-Type': 'text/html'});
           res.write(data);
           res.end();
         });
       } 
    else if(req.url === "/styles.css"){
         fs.readFile('style.css', function(err, data) {
        //    res.writeHead(200, {'Content-Type': 'text/css'});
           res.write(data);
           res.end();
         });
        }
  });
}).listen(6969);