# My Note
## 使用
### 1 DOM结构
"#scroller" 元素能进行滚动。只有容器元素的第一个子元素能进行滚动，其他子元素完全被忽略。
```html
<div id="wrapper">
    <div id="scroller">
        ...
    </div>
</div>
```

### 2 css
"#scroller" 元素要有实际宽高，要进行水平滚动时，需要宽度大于容器，容器需要 `overflow:hidden`，参考：
```css
#scroll1{
    width: 20rem;
    border: 1px solid red;
    height: 3rem;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 9999999;
    overflow: hidden;
}
#box{
    width: 30rem;
    height: 3rem;
    background: green;
}
```

### 3 实例化
```javascript
var wrapper = null;
function loadScroll() {
    wrapper = new IScroll('#wrapper', {});
}
```



## 临时禁用
首先，实例化之后，打印发现实例上有个 `enable` 属性， `false` 掉就禁用了滚动；


## 是否滚动
发现实例上有个 `moved` 属性：
```javascript
e.addEventListner("touchmove",()=>{
    console.log(myScroll.moved)
},false)
```
可以实时获取是否滚动

# 刷新位置
拉到一边后不能自动恢复
```javascript
setTimeout(function () {
    wrapper.scrollTo(0, 0)
}, 100);
```


# 刷新容器！
重新计算包裹元素高度

如果DOM结构复杂，最好延时 100 或者200 ms
```javascript
setTimeout(function () {
    wrapper.refresh();
}, 0);
```