/**
 * 1.2.2 
 */

'use strict';
//导入HTTP模块
var http = require('http')

var server = http.createServer(function (req, res) {
  // 参数是一个 requestListner 函数 有 request response 两个参数
  console.log(req.method + ':' + req.url);
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('<h1>HELLO NODE HTTP</h1>')

})

server.listen(8888)
console.log('Server is running now at:http://127.0.0.1:8080/');