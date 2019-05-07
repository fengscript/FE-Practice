'use strict';

var http = require('http');
var url = require('url');

function start( route ) {
    function onReq (req, res) {
        console.log("raw req.url - " + req.url)
        var pathName = url.parse(req.url).pathname;
        
        console.log("Request for " + pathName + " received.");

        route(pathName);

        res.writeHead(200, {"Content-Type":"text/plain"});
        res.write("HELLO NODE");
        res.end();
    }
    http.createServer(onReq).listen(8888);
    console.log("Server start at localhost:8888")
}

exports.start = start;