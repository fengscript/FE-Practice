整理一下，首先， `跨域` 并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了，比如可以在 `F12 - NetWork - XHR`中看到返回的数据

同源策略要求源相同才能正常进行通信，即协议、域名、端口号都完全一致。


`<script>` 标签的src属性并不被同源策略所约束，所以可以获取任何服务器上脚本并执行。


常见跨域方式：
- JSONP
- CORS
- WebSocket
- postMessage

## JSONP
- 仅支持 `get`
- JSONP请求一定需要对方的服务器做支持返回 `json`格式的数据。

原理是利用 `<script>`标签允许跨域加载资源的特性，网页可以得到跨域服务器的 `JSON` 数据。
（还有 `<img/>、<link>`也可以跨域加载资源）

工作流程：
1. 声明一个回调函数，其函数名(如fb)当做参数值要传递给跨域请求数据的服务器，函数形参为要获取的目标数据(服务器返回的data)。
2. 创建一个 `<script>` 标签，把跨域的接口地址赋给 `script` 的 `src` ,在这个地址中向服务器传递该函数名（可以通过问号传参:?callback=fn）。
3. 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串,例如：传递进去的函数名是fn，它准备好的数据是`fn([{"name":"test"}])`。
4. 最后服务器把准备的数据通过HTTP协议返回给客户端，客户端会执行通过 `<script>` 标签 `src` 拿回来的内容，即那个塞了一堆数据的函数，于是我们就可以对返回的数据进行操作。



来看看淘宝这个API：
http://suggest.taobao.com/sug?q

```html
<script>
function FYGJsonPTest (data) {
  console.log(data);
}
</script>
<script src="http://suggest.taobao.com/sug?q=aaa&callback=FYGJsonPTest"></script>
```


[部分摘自](https://segmentfault.com/a/1190000016756432)

当然实际可操作的地方更多，根据服务器配合，可以自定义回调函数的名字或者临时组装一个 `script` 标签用完再删除掉等等（jQuery的 ajax的 JSONP 模式就是包装了这些活儿）
## CORS
在检测到跨域访问时，浏览器会检查响应头 `Access-Control-Allow-Origin` 是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败，`JavaScript` 将无法获取到响应的任何数据。

`GET`、`POST`为简单请求，对于 `PUT`，`DELETE`等其他类型如`application/json`的POST 请求，发送 `ajax` 之前，浏览器会先发送一个称为 `preflighted` 的 `OPTIONS` 请求，询问目标服务器是否接受接下来的请求的方法，服务器响应的 `Access-Control-Allow-Methods`头中确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误

整个 `CORS` 通信过程，都是浏览器自动完成，不需要用户参与，需要服务器支持，要求浏览器(>IE10) `php`
```php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST,GET");
```
浏览器检测到响应头带上了CORS，并且允许的源包括了本网站，那么就不会拦截请求响应。



## WebSocket
`WebSocket` 实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案，和 `HTTP` 都是应用层协议，都基于 `TCP` 协议

## postMessage
这个体验过了，很麻烦，主要用在 `iframe` 和 `window.open` 打开的窗口和父窗口进行通信

### jQuery的ajax
`crossDomain`参数

使用 `Ajax` 以 `jsonp` 获取数据失败时，试试加上
```js
crossDomain: true
```

```
crossDomain (默认: 同域请求为false， 跨域请求为true)
类型: Boolean
如果你想在同一域中强制跨域请求（如JSONP形式），例如，想服务器端重定向到另一个域，那么需要将crossDomain设置为 true 。 ( 1.5 新增)
```




# ajax略记
工作原理：
利用 `XMLHttpRequest` 对象向服务器发送 `异步` 请求而从服务器获取数据

1. 创建 `XMLHttpRequest` 对象
2. 在 `XMLHttpRequest` 的 `onreadystatechange` 的事件上监测状态变化：
  1. `request.readyState` 为 `4` ，即数据正常发送完成，
    1. 继续判断如果 `request.status` 为 `200` ，则正确获得服务器响应， 通过 `request.responseText` 拿到响应的文本
    2. `request.status` 不为 `200`，则根据状态码再判断
  2. `request.readyState` 不为 `4`，则 HTTP 请求还在继续
3. `request.open('GET', '/api/categories')`打开 `HTTP` 链接
4. `request.send()` 发送请求

抄一个实现：
```javascript
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...');
```

我的妈，来个 `Promise`版的：
```javascript
var getJSON = function (url) { 
  var promise=  new Promise(function (resolve, reject) { 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'json';
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();

    function handler() {
      if(this.readyState !== 4){return}
      if(this.status == 200){
        resolve(this.respo
        nse);
      }else{
        reject(new Error(this.statusText))
      }
    }
  });
  return promise;
}
getJSON("???").then(function (json) { 
  console.log('Content:'+json)
}, function (Error) { 
  console.error('出错',error)
})
```