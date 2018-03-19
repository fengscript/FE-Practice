'use strict';

// const ownName = __fileName;
// 上面这样子是不行滴。。。

console.log(__filename);

process.stdout.write("This is Node stdout to system");

process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
 });
 