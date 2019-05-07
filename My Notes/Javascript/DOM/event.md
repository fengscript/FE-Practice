## eventDelegate

## addEventListener
第三个参数可以传进去一个对象：
```javascript
{
  once : false,
  captrue: true,
  passive: true
}
```

如：
```javascript
document.getElementById('box').addEventListener('click', function (e) {
  console.log("target :" + e.target);
  console.log("tagName :" + e.target.tagName);
}, {
  once: true,
  captrue: false,
  passive: true
});
```




## removeEventListener
```javascript
var div = document.getElementById('div');
var listener = function (event) {
  /* do something here */
};
div.addEventListener('click', listener, false);
div.removeEventListener('click', listener, false);
```



# Custom Event & Simulate Event
自定义事件：自定义一个任意事件，然后绑定到目标元素，然后指定派发

模拟事件：通过程序模拟一次事件的发生（比如指定时间可以执行一次鼠标点击而不需要手动去点）

## 模拟鼠标事件
通过对应构造函数来设置，比如模拟一次鼠标点击： `new MouseEvent('click',function(){})`

```javascript
// 假设这是元素的原本的点击事件
dom.addEventListener("click",function(){
  console.log("你点击了元素 - dom")
})

// 开始
// 来一个模拟鼠标事件
var evt = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  view: window,
});


// 然后可以随时触发，调用一次下面的 dispatchEvent，上面的点击事件就会被触发一次
dom.dispatchEvent(evt);
```

参考：

https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent

> 注意：`createEvent()` 构造函数已经被废弃，不推荐使用

## 自定义事件
通过 `new Event()` 构造函数来设置：
```javascript
// 实例化一个事件
var myEvent = new Event('myCustomEvent', {
    'detail': '我是一个自定义事件'
});

// 给元素绑定事件
document.getElementById('box1').addEventListener('myCustomEvent', function (e) {
    write("点击了区域1")

});

// 触发事件
document.getElementById('box1').dispatchEvent(myEvent)
```

### 添加自定义数据
可以使用 `CustomEvent` 的 `detail` 属性 向事件对象添加更多数据
如
```javascript
var event = new CustomEvent('build', { 'detail': elem.dataset.time });

function eventHandler(e) {
  log('The time is: ' + e.detail);
}
```

> 感觉用处没有模拟事件多

参考：
https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event

https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events

https://www.cnblogs.com/lvdabao/p/3315942.html