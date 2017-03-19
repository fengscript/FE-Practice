'use strict';
//导入HTTP模块
var http = require('http')

var server = http.createServer(function (req, res) { 
  console.log(req.method + ':' + req.url);
  res.writeHead(200, 
    {'Content-Type':'text/html'}
  );
  res.end('<h1>HELLO NODE HTTP</h1>')

 })

 server.listen(8080)
 console.log('Server is running now at:http://127.0.0.1:8080/');