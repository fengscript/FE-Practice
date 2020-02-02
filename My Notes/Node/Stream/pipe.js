'use strict';
var fs=require('fs')

var rs = fs.createReadStream('./a.txt');
var ws = fs.createWriteStream('copied from a.txt')

rs.pipe(ws)