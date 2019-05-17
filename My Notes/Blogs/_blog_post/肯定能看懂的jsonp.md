---
title: 肯定能看懂的jsonp
date: 2018-12-27 23:00:00
tags: 
    - javascript
    - 前端
    - ajax
toc: true
categories: 前端
---


`jsonp`是以前我们用来解决跨域问题的主要手段之一，当时刚接触到我是懵逼的，这个东西跟 `json` 有个毛的关系？

为什么在 `Postman` 里面可以跑通的接口，浏览器里面就不行了？


## JSONP
首先，浏览器的同源策略要求的正常通信，包括**协议、域名、端口号**都要完全一致。

<!-- more -->

`跨域` 并不是请求发不出去，请求可以正常发出去，服务端能收到请求并正常返回结果，只是`结果被浏览器拦截了`，比如你可以在 `F12 - NetWork - XHR`中看到返回的数据

我们晓得， `HTML` 有一些标签可以填进去 `src` 属性来加载外面的资源，比如： `<script>`,`<img>`，而这些标签加载资源，是**可以跨域加载的**。

`jsonp` 就是利用这些标签能跨域加载资源的特性，来获取服务器上的脚本并执行


为什么会被叫做 `jsonp` ？ 它名字的意义是 `json + padding`，即，把服务器上的数据，以 `json` 格式拼接 / 附加（padding）成字符串，然后发回来拼接后的函数及参数


流程：
1. 声明一个回调函数，其函数名(如fb)当做参数值要传递给跨域请求数据的服务器，函数形参为要获取的目标数据(服务器返回的data)。
2. 创建一个 `<script>` 标签，把跨域的接口地址赋给 `script` 的 `src` ,在这个地址中向服务器传递该函数名（可以通过问号传参:?callback=fn）。
3. 服务器接收到请求后，会把传递进来的函数名和它需要给你的数据拼接成一个 `json` 字符串,例如：传递进去的函数名是fn，它准备好的数据是`fn([{"name":"test"}])`。
4. 最后服务器把准备的数据返回给客户端，浏览器通过 `<script>` 标签 `src` 拿到前面拼接好的内容执行，于是我们就可以对拿到的数据进行操作。



比如淘宝这个API：
`http://suggest.taobao.com/sug`
有两个参数
- `q`：你要查询的商品名称
- `callback`：你给它的回调函数名字


比如
```html
...html
<script>
function FYGJsonPTest (data) {
  console.log(data);
}
</script>
<script src="http://suggest.taobao.com/sug?q=aaa&callback=FYGJsonPTest"></script>
```


[部分摘自 segmentfault](https://segmentfault.com/a/1190000016756432)

当然实际可操作的地方更多，根据服务器配合，可以自定义回调函数的名字或者临时组装一个 `script` 标签用完再删除掉等等（比如 `jQuery` 的 `ajax` 的 `JSONP` 模式就是包装了这些活儿）


在 `jQuery` 使用 `ajax` 以 `jsonp` 获取数据失败时，试试加上
```js
crossDomain: true
```

 `jsonp`的缺点：
- 仅支持 `get`请求
- JSONP请求一定需要对方的服务器做支持返回 `json`格式的数据。




## CORS
`CORS` 本名曰： `Cross-Origin Resource Sharing` ，是H5自带的一项特性，规定了浏览器在跨域访问资源时和服务器怎么通信


在检测到跨域访问时，浏览器会检查响应头 `Access-Control-Allow-Origin` ，如果包含本域，则跨域请求成功，不是则请求失败，我们就拿不到到响应的数据。

它将对服务器的请求分为了 `简单请求` 和 `复杂请求` 两种
- `简单请求`：`GET`、`POST`
- `复杂请求`：`PUT`，`DELETE`等其他类型如`application/json`的 `POST` 请求

对于 `复杂请求` ，在发送 `ajax` 之前，浏览器会先发送一个称为 `preflighted` 的 `OPTIONS` 请求，询问目标服务器是否接受接下来的请求的方法，服务器响应的 `Access-Control-Allow-Methods`头中包含将要发送请求的 `Method` 时，才会继续发送请求，否则将抛出错误

整个 `CORS` 通信过程，都是浏览器自动完成，不需要用户参与，**需要服务器支持**

比如一个`php`服务器的设置：
```php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST,GET");
```

不过这种设置存在安全性隐患，因为 `Allow-Origin` 设置成了 `*` 通配符，会允许所有域，项目上最好设置成自己服务器的域名和目录



常见其他跨域方式：
- WebSocket
- postMessage

可以自己了解一下

然后大家可以在研究一下开始的问题： *为什么在 `Postman` 里面可以跑通的接口，浏览器里面就不行了？*