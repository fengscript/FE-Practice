
## 增

```javascript
element.parentNode.appendChild(element);
```

获取图片的 `src`，需要 `e.getAttribute('src')`，不然直接 `e.src` 取到的是带主机地址的值：
`http://127.0.0.1:8080/3ds/app/smartsan_onestep/[object%20HTMLImageElement]`

对于h5 `dataset` 新属性要添加，需要用 `setAttribute()`

取的时候，可以`getAttribute` ，也可以从元素的 `dataset` 里面读取

## append appendChild
- parentNode.append()可以同时传入多个节点或字符串，没有返回值； >IE9
- parentNode.appendChild()只能传一个节点，且不直接支持传字符串(需要parentNode.appendChild(document.createTextElement('字符串'))代替)，返回追加的Node节点