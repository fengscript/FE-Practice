> 这份文档随手记我自己学到的设计模式

# 观察者模式与发布/订阅模式

## 区别

观察者模式对象间的一种一对多关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新

而发布订阅模式侧重点在于订阅者订阅事件，发布者发布信息，至于订阅者接受信息之后的处理并不关心

### 发布-订阅模式

广泛用于异步编程

无需过多关注对象在异步运行期间的内部状态，只需要订阅事件发生点即可

可以让两个对象松散耦合，不用知道彼此的细节。

自定义事件就是一个典型的 发布-订阅模式：

比如：
```javascript
var Event = (function() {
  var clientList = {},
    listen,
    trigger,
    remove;

  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function() {
    var key = [].shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };

  remove = function(key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l > 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          // 这里的对比，只有传入函数名或者变量名才能对比，直接传进去函数，永远是false
          fns.splice(l, 1);
        }
      }
    }
  };

  return {
    listen,
    trigger,
    remove
  };
})();
```
