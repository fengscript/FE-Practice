# Web 安全

https://segmentfault.com/a/1190000019158228
几种攻击方式:

- XSS  Cross-Site Scripting 跨站脚本攻击
- CSRF Cross-site request forgery 跨站请求伪造
- 点击劫持
- URL 跳转漏洞

## XSS

攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈，发起蠕虫攻击等

可以分为

- 反射型(非持久型)
- 存储型(持久性)
- DOM 型

1. 反射型：
   需要构造表单提交页面，并引导用户点击
   ==这里暂时存疑==

- 攻击者构造出特殊的 URL，其中包含恶意代码。
- 诱导用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
- 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
  反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等
  如：

```javascript
location.href = `/error?type=<script>alert('恶意内容')<\/script>`;
```

防范：
对于 `url` 的查询参数一定要转义再输出到页面“

```javascript
app.get("/welcome", function(req, res) {
  //对查询参数进行编码，避免反射型 XSS攻击
  res.send(`${encodeURIComponent(req.query.type)}`);
});
```

2. DOM 型
   使用了 .innerHTML、.outerHTML、.appendChild、document.write() API 将 **不可信** 内容插入到页面

- 攻击者构造出特殊数据，其中包含恶意代码。
- 用户浏览器执行了恶意代码。
- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

防范：

1. 对于类似 `src` 的 `url` 链接，使用 `encodeURIComponent`
2. 对于输入内容，要进行编码，比如：
   ```javascript
   function encodeHtml(str) {
     return str
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&apos;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;");
   }
   ```


3. 存储型
前端输入内容未做过滤，攻击者构建的攻击代码直接存储在服务器，每个打开被攻击页面的用户都会被攻击代码影响到

防范：前端后端都做转义

除了**对不受信任的输入内容做限制、长度做控制之外**，其他防范策略：
1.  HTTP的 Content-Security-Policy 头部策略
  
    服务端只允许加载同域资源：`Content-Security-Policy: default-src 'self'` 
    
    前端：`<meta http-equiv="Content-Security-Policy" content="form-action 'self';">`
2.  HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。

3. 验证码 / Token：防止脚本冒充用户提交危险操作

## CSRF
受害者在被攻击网站登录之后留下 `cookie` ，攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

防范：

1. 验证码 / Token
2. 
3. 判断 `referer` 属性，但是不能全部依赖于此

## 点击劫持

比如在按钮上放一个透明层添加点击事件达成攻击目的

# Fetch API

`fetch(url, initObject)`

Q&A:

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- 默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。自从 2017 年 8 月 25 日后，默认的 credentials 政策变更为 same-originFirefox 也在 61.0b13 中改变默认值

就是你得这样子自己处理一下：

```javascript
fetch("notExists")
  .then(function(response) {
    if (response.status !== 200) {
      // make the promise be rejected if we didn't get a 200 response
      throw new Error("Not 200 response");
    } else {
      // go the desired response
    }
  })
  .catch(function(err) {
    // some error here
  });
```

来自 MDN 一个封装

```javascript
// Example POST method implementation:

postData("http://example.com/answer", { answer: 42 })
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error));

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json"
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  }).then(response => response.json()); // parses response to JSON
}
```

other details：
返回的 `Body mixin` 被 `request` 和 `response` 实现，允许声明 `响应 / 请求` 的报文类型：

- Body.body
- Body.bodyUsed
- Body.arrayBuffer()
- Body.blob()
- Body.formData()
- Body.json()
- Body.text()

对应的，请求中 `body`属性就可以放入对应类型的数据： `json`、`text`、`blob`、`formData` 或其他
比如上传多个文件：

```javascript
var formData = new FormData();
var photos = document.querySelector("input[type='file'][multiple]");

formData.append("title", "My Vegas Vacation");
formData.append("photos", photos.files);

fetch("https://example.com/posts", {
  method: "POST",
  body: formData
})
  .then(response => response.json())
  .then(response => console.log("Success:", JSON.stringify(response)))
  .catch(error => console.error("Error:", error));
```

比如取图片回来：

```javascript
var myImage = document.querySelector(".my-image");
fetch("flowers.jpg")
  .then(function(response) {
    return response.blob();
  })
  .then(function(response) {
    var objectURL = URL.createObjectURL(response);
    myImage.src = objectURL;
  });
```

其他 `init`

1. credentials:
   - 'include' : 让浏览器发送包含凭据的请求（即使是跨域源）
   - 'same-origin': 只想在请求 URL 与调用脚本位于同一起源处时发送凭据
   - 'omit': 确保浏览器不在请求中包含凭据
2. body:

```javascript
error: TypeError: Failed to execute 'json' on 'Response': body stream is locked
    at login.html:76
// 出现这个错误时候，对 response.json() 只能调用一次
```

> Response methode like 'json', 'text' can be called once, and then it locks.





# 移动端性能调优

1. 上 http2.0
2. 上 CDN
3. 服务器 Gzip 文件压缩
4. 设置浏览器缓存
5. 优化 js 文件加载顺序
6. 合并多个CSS文件
7. 图片、字体文件优化处理
8. 尽量避免重定向?
9. PWA AMP
10.  webpack thunk打包


谷歌AMP可以利用谷歌提供的CDN做缓存网页的内容。谷歌AMP缓存是一个基于proxy的内容分发网络：

- AMP缓存在分发启用了AMP的文件（例如网站页面，资源文件等）时发挥作用。
- AMP缓存获取AMP HTML页面，进行缓存，并提升页面性能。
- 为了获得性能最大化，AMP缓存从使用了http2.0的相同的来源加载HTML页面，JavaScript文件以及所有的图片。
- 谷歌AMP有一个内置的有效性验证特性，能够确认一个网站页面在AMP缓存上有效运行



从代码上


1. Web Worker

2. 做好重构，优化代码性能

3. 循环、同步改异步

4. 引用类型值的手动释放，减少闭包 

   在闭包中的局布变量会自动回收有些情况不会被 回收一直占用空间，如异步，计时器，事件绑定 不会被 回收最好手动处理一下

5. CSS3动画开启硬件加速

6. 触发频繁的事件用 theottle 或者 debounce

   - `throttle`：节流 给定时间间隔内只执行一次事件
   - `debounce`：防抖 通过推迟每次事件执行的时间来减少不必要的事件触发
   - mouse move 时减少计算次数：debounce
   - input 中输入文字自动发送 ajax 请求进行自动补全： debounce
   - ajax 请求合并，不希望短时间内大量的请求被重复发送：debounce
   - resize window 重新计算样式或布局：debounce 或 throttle
   - scroll 时触发操作，如随动效果：throttle
   - 对用户输入的验证，不想停止输入再进行验证，而是每n秒进行验证：throttle

7. 事件代理


# border-radius 有锯齿
图片是 RGB565 的，换个图片试试？

正常的RGB24是由24位即3个字节来描述一个像素，R、G、B各8位。而实际使用中为了减少图像数据的尺寸，如视频领域，对R、G、B所使用的位数进行的缩减，如你所说的RGB565和RGB555。
RGB565 就是R-5bit，G-6bit，B-5bit
RGB555 就是R-5bit，G-5bit，B-5bit
RGB888 就是R-8bit，G-8bit，B-8bit ；其实这就是RGB24

至于BMP那是RGB的像素数据基础上增加位图头数据而成的文件格式。


一般BMP是BGR888
jpeg是YUV的

其他的要看对这种格式的描述或者问当事人.

RGB565 是16位的，2个字节，5+6+5，第一字节的前5位是R，后三位+第二字节前三位是G，第二字节后5位是B。

RGB555 也是16位的，2个字节，RGB各5位，有1位未用。

RGB888 是24位的，3个字节。







# iframe

**iframe和iframe的关系**

首先需要说明的是，w3c已经不推荐使用frame，而推荐使用iframe，iframe也就是inline frame（行内frame），顾名思义它具有css的行内框特性，正是因为这一特性才引出来iframe 高度100%时，出现垂直滚动条

**通过window获取iframe**

window.frames是个伪数组，可以通过window.frames[index]或window.frames[name]来获取iframe 
window.frames[index],索引是从左往右，从上往下的，从0开始，通常我们使用window.frames[name]来获取frame

**通过iframe获取window、document**
如果想获取iframe里的window或者document，可以使用 
iframe.contentWindow、iframe.contentDocument 
iframe.contentDocument=iframe.contentWindow.document，不过iframe.contentDocument在IE8及以下的版本不支持。

**window获取顶级窗口、父窗口**
获取顶级窗口：window.top 
获取父级窗口：window.parent 
导航栏回退：history.back(); 注意回退的请求，会有缓存。 
前进：history.forward() history.back()和history.forward()仅仅是为了方便分别代替history.go(-1)和history.go(1)

