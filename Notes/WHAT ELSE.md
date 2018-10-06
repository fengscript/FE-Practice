# iframe 
`contentWindow` 可取得 子窗口的 `document` 对象

```javascript
var x = document.getElementById("myframe");
var y = (x.contentWindow || x.contentDocument);
```

# postMessage
`otherWindow.postMessage(message, targetOrigin, [transfer]);`
即， `otherWindow` 接收一条消息，它的地址必须是 `targetOrigin` 

`otherWindow` 其他窗口的一个引用，比如iframe的contentWindow属性、执行window.open返回的窗口对象、或者是命名过或数值索引的window.frames。


直接 `window.onload` 触发不了，写在 `click` 里面就可以触发了