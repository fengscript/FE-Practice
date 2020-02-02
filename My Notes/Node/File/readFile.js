'use strict';
var fs=require('fs')

// 异步读取
console.log("开始异步读取");
fs.readFile('a.txt','utf-8',function (err, data) { 
  if(err){console.log(err);}
  else{console.log(data)}
})

console.log("异步读取结束");


// 同步读取

console.log("开始同步读取");
var data = fs.readFileSync('a.txt')
console.log(data.toString());
console.log("同步读取结束");

