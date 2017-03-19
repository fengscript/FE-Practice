'use strict';
var fs = require('fs');

//write
var ws1 = fs.createWriteStream('./pipe for write and read.txt', 'utf-8');
console.log('开始写入数据');
ws1.write('使用Stream写入文本数据 \n');
ws1.write('END\n');
ws1.write('LINE3');
ws1.end();
console.log('开始生成文件');
var ws2 = fs.createWriteStream('./pipe for write and read2.txt', 'utf-8');
ws2.write(new Buffer('二进制数据块写入……\n', 'utf-8'))
ws2.write('END');
ws2.end();

//read
var rs = fs.createReadStream('./pipe for write and read.txt', 'utf-8')
rs.on('data', function (chunk) { 
  console.log('开始读取数据');
  console.log('数据读取结果：'+chunk);
 })

 rs.on('end', function () { 
  console.log('数据读取完毕');
 })

 rs.on('err', function (err) { 
  console.log('数据读取出错'+err);
 })