'use strict';
//导入HTTP模块
var
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path');
  
  //从命令行参数获取 root 目录
  var root = path.resolve(process.argv[2] || '.');
  console.log('获取到静态目录： '+root);
  //创建服务器
var server = http.createServer(function (request, response) { 
    console.log(request.method + ':' + request.url);
  //获取URL的Path 
    var pathname = url.parse(request.url).pathname;
  //获取对应的本地文件路径
    var filePath = path.join(root, pathname);
  //获取文件状态
    fs.stat(filePath, function (err, stats) {
      if (!err && stats.isFile()) {
        console.log('200'+ request.url);

        response.writeHead(200)
        fs.createReadStream(filePath).pipe(response)
      }else{
        console.log('404'+request.url)
        response.writeHead(404)
        response.end('404 NOT FOUND')
      }
    })
 })

 server.listen(8080)
 console.log('Server is running now at:http://127.0.0.1:8080/');