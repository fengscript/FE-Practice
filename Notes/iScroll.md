# My Note

## DOM结构
UL元素能进行滚动。只有容器元素的第一个子元素能进行滚动，其他子元素完全被忽略。
```html
<div id="wrapper">
    <ul>
        <li>...</li>
        <li>...</li>
        ...
    </ul>
</div>
```




## 临时禁用
首先，实例化时候：
```javascript
var wrapper = null;
function loadScroll() {
    wrapper = new IScroll('#wrapper', {});
}
```
然后打印发现  `albumScroll` 有个 `enable` 属性， `false` 掉就禁用了滚动；


# 刷新！
重新计算包裹元素高度

如果DOM结构复杂，最好延时 100 或者200 ms
```javascript
setTimeout(function () {
    wrapper.refresh();
}, 0);
```
```