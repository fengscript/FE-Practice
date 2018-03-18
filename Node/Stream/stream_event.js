'use strict';
var fs = require('fs');

//OPEN
var cs = fs.createReadStream('./a.txt', 'utf-8');

cs.on('data', function (chunk) { 
  console.log('数据');
  console.log(chunk);
 })
//  let data = '';
//  cs.on('data', function (chunk) { 
//    console.log('开始读取数据');
//    console.log(chunk);
//    data += chunk;
//  })
 cs.on('end', function () { 
  console.log('数据读取完毕');
 })

 cs.on('error', function (err) { 
  console.log('数据读取出错'+err);
 })