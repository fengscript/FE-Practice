'use strict';

// const ownName = __fileName;
// 上面这样子是不行滴。。。

console.log(__filename);

/**
 * process
 */
process.stdout.write("This is Node stdout to system");
// process.stdout.write("Please Wtire Something:");
// process.stdin.write("Please Wtire Something:");
// .write("This is Node stdout to system");

process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
 });
 

