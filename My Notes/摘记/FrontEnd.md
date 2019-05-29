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
