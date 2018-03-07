
> 柯里化是这样的一个转换过程，把接受多个参数的函数变换成接受一个单一参数(译注：最初函数的第一个参数)的函数，如果其他的参数是必要的，返回接受余下的参数且返回结果的新函数
> http://blog.jobbole.com/77956/

先体验一下：

```javascript
var sendMsg = function (from, to, msg) {
    alert(["Hello " + to + ",", msg, "Sincerely,", "- " + from].join("\n"));
};

var sendMsgCurried = curry(sendMsg); // returns function(a,b,c)
 
var sendMsgFromJohnToBob = sendMsgCurried("FYG")("fyg"); // returns function(c)
 
sendMsgFromJohnToBob("Come join the curry jsvascript!"); 
```



```javascript
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    // 获取第一个参数，即要柯里化的函数 
    return function () {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

var fn = function (a, b, c) {
    return [a, b, c]
}

console.log(fn("a", "b", "c"));

console.log(sub_curry(fn, "a")("b", "c"));
console.log(sub_curry(fn, "a", "b")("c"));
console.log(sub_curry(fn, "a", "b", "c")());
```

然后，来一个正式的 curry 处理函数：
```javascript
function curry(fn, len) {
    len = len || fn.length;
    return function () {
        if (arguments.length < len) {
            var combined = [fn].concat(toArray(arguments));
            return len - arguments.length > 0
                    ? curry(sub_curry.apply(this, combined), len - arguments.length)
                    : sub_curry.call(this, combined)
        }else{
            return fn.apply(this, arguments)
        }
    }
}
```
