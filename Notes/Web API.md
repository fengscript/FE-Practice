# Blob
一个 `Blob` 对象表示一个不可变的, 原始数据的类似文件对象。 `Blob` 表示的数据不一定是一个JavaScript原生格式 `blob` 对象本质上是 js 中的一个对象，里面可以储存大量的二进制编码格式的数据。

## prop / method
- Blob.size  对象中所包含数据的大小（字节）
- Blob.type  Blob对象所包含数据的MIME类型
- Blob.slice()  返回一个新的 Blob对象，包含了源 Blob对象中指定范围内的数据。

## use
```js
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)],
  {type : 'application/json'});
```

### read
通过使用 FileReader 的其它方法可以把Blob读取为字符串或者数据URL。
```javascript
var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result 包含转化为类型数组的blob
});
reader.readAsArrayBuffer(blob);
```

# FileReader
FileReader接口有4个方法，其中3个用来读取文件，另一个用来中断读取。无论读取成功或失败，方法并不会返回读取结果，这一结果存储在result属性中。


- readAsBinaryString	将文件读取为二进制编码
- readAsText	将文件读取为文本
- readAsDataURL	将文件读取为DataURL
- abort	终端读取操作

## event trigger

- onabort	中断
- onerror	出错
- onloadstart	开始
- onprogress	正在读取
- onload	成功读取
- onloadend	读取完成，无论成功失败

[分片上传、粘贴上传图片](https://www.cnblogs.com/wangfajing/p/7202139.html)
# atob
在 `Node` 里面主要要先 `require` 进去 `atob`；

WindowOrWorkerGlobalScope.atob() 对用 `base-64` 编码过的字符串进行解码 。

可以先 `window.btoa()` 编码数据，在接受数据之后，使用 `atob()` 方法再将数据解码。
```javascript
let encodedData = window.btoa("Hello, world"); // 编码
let decodedData = window.atob(encodedData); // 解码
```
