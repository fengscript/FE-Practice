# scrollTop

## 页面滚动到指定位置
```javascript
var scrollHeight = document.scrollTop
                || document.documentElement.scrollTop
                || window.pageYOffset;



scrollHeight = document.getElementById(el).offsetTop;
// 或者
scrollHeight = document.getElementById(el).offsetTop;
```


## documentElement
`Document.documentElement` 是一个会返回文档对象（document）的根元素的只读属性（如HTML文档的 <html> 元素）。

使用这个只读属性能很方便的获取到任意文档的根元素。

`HTML` 文档通常包含一个子节点 `<html>`，可能在它前面还有个 `DOCTYPE` 声明。`XML` 文档通常包含多个子节点：根元素，DOCTYPE 声明，和 processing instructions。

所以使用 `document.documentElement` 来获取根元素, 而不是 `document.firstChild`