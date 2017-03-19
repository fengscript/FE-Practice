'use strict';
var fs = require('fs');

//OPEN
var cs = fs.createReadStream('./a.txt', 'utf-8');

cs.on('data', function (chunk) { 
  console.log('数据');
  console.log(chunk);
 })

 cs.on('end', function () { 
  console.log('数据读取完毕');
 })

 cs.on('err', function (err) { 
  console.log('数据读取出错'+err);
 })