

## opacity
```javascript
single.velocity("fadeIn", {
    duration: 300
});
```

```javascript
container.velocity({
    opacity: [1, "easeInSine", 0],
});
```

默认配置
```javascript
 container.velocity({
    width: "500px",
}, {
    duration: 2000,
    easing: "ease",
    queue: "",
    begin: undefined,
    progress: undefined,
    complete: undefined,
    display: undefined,
    visibility: undefined,
    loop: false,
    delay: false,
    mobileHA: true
});
```


# display 和 visibility
要将 `display:none` 或者 `visibility:hidden` 的元素添加显示动画，只要在 `option` 里面写入期望的 `display` /  `visibility` 值，`velocity` 会自动处理，如
```css
.a{
    opacity: 0;
    display: none;
}
```

```javascript
a.velocity({
    opacity: 1
}, {
    duration: 200,
    delay: 300,
    display:"block",
});
```
则可以实现先将元素  `display:block` ，再进行透明度过渡


# chaining
可以如下，链式调用
```javascript
sendingTips.velocity({
    opacity: 1
}, {
    display: "block",
}).velocity({
    opacity: 0
}, {
    delay: 600,
    display: "none",
});
```
