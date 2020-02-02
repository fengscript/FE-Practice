'use strict';
// 创建 Buffer 对象
const buf = Buffer.from("fengyanggang", "ascii");
// const buf = new Buffer.from("fengyanggang","ascii");

console.log("创建 Buffer 对象 " + buf.toString("utf-8"));
console.log("创建 Buffer 对象 " + buf.toString("base64"));

// 写入缓冲区
const buf2 = Buffer.alloc(256);
const len = buf2.write("fengyanggang")

console.log("写入字节数" + len);

// 读取缓冲区
const buf3 = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    buf3[i] = i + 97;
}

// console.log(buf3.toString());
// console.log(buf3.toJSON());
// console.log(JSON.stringify(buf3.toJSON()));



/***
 *COPY 
 */
// `buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])`
const buf4 = Buffer.from("Name");
const buf5 = Buffer.from("fengyanggang");

buf4.copy(buf5);

console.log(buf5.toString());

const buf6 = Buffer.from("Age");
const buf7 = Buffer.from("26");
buf6.copy(buf7, 1);
console.log(buf7.toString());