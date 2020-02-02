'use strict';
var fs=require('fs')
var data = 'This paragraph will write in a file by node'
 fs.writeFile('./a.txt', data, function(err) {
    if(err){console.log(err);}
    else{console.log('WRITE OK')}
 })