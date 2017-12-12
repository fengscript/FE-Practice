原文: https://www.w3cplus.com/javascript/offset-scroll-client.html


- window.innerHeight	浏览器窗口高度，如果存在水平滚动条，则包括滚动条
- window.outerHeight	浏览器窗口整个高度，包括窗口标题、工具栏、状态栏等
- window.innerWidth	    浏览器窗口宽度，如果存在垂直滚动条，则包括滚动条
- window.outerWidth	    浏览器窗口整个宽度，包括侧边栏，窗口镶边和调正窗口大小的边框

![innerHeight](https://www.w3cplus.com/sites/default/files/blogs/2017/1711/window-scroll-1.png)

IE8 以下不支持 `window.innerHeight` 等属性，可以读取 `documentElement` 和 `body` 的高度。它们的大小和 `window.innerHeight` 是一样的

```javascript
document.documentElement.clientHeight
document.body.clientHeight
```
`documentElement` 即 `html` 元素

- document.documentElement.clientHeight：不包括整个文档的滚动条，但包括<html>元素的边框
- document.body.clientHeight：不包括整个文档的滚动条，也不包括<html>元素的边框，也不包括<body>的边框和滚动条

![clientHeight](https://www.w3cplus.com/sites/default/files/blogs/2017/1711/window-scroll-6.png)











