# 1 addEventListner 的第三个参数
```javascript
target.addEventListener(type, listener, {
    capture: Boolean,
    passive: Boolean,
    once: Boolean
});

target.addEventListener(type, listener, useCapture);
```

useCapture:false
在DOM树中，注册了该listener的元素，是否会先于它下方的任何事件目标，接收到该事件。

沿着DOM树向上冒泡的事件不会触发被指定为use capture（也就是设为true）的listener。当一个元素嵌套了另一个元素，两个元素都对同一个事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。

## 安全检测
```javascript
// ref https://github.com/WICG/EventListenerOptions/pull/30
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}
  		 
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
	capture: false,
	passive: true
} : false);

```
添加 `passive: true` 参数后，touchmove事件不会阻塞页面的滚动（同样适用于鼠标的滚轮事件）

那些不支持参数 `options` 的浏览器，会把第三个参数默认为 `useCapture` ,即设置 `useCapture` 为 `true` 

# 2 addEventListner 的this
使用 `addEventListener()` 为一个元素注册事件的时候，句柄里的 `this` 值是该元素的引用。其与传递给句柄的 `event` 参数的 `currentTarget` 属性的值一样。

# 3 document.createEvent()
创建一个指定类型的事件。其返回的对象必须先初始化并可以被传递给 element.dispatchEvent

`document.createEvent(type)`
```javascript
// 创建事件
var event = document.createEvent('Event');

// 定义事件名为'build'.
event.initEvent('build', true, true);

// 监听事件
elem.addEventListener('build', function (e) {
  // e.target matches elem
}, false);

// 触发对象可以是任何元素或其他事件目标
elem.dispatchEvent(event);
```
type:
事件类型可能包括"UIEvents", "MouseEvents", "MutationEvents", 或者 "HTMLEvents"
参照:https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent

## elem.dispatchEvent(event);
向一个指定的事件目标派发一个事件,  以合适的顺序触发受影响的 事件目标