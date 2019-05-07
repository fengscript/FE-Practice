仅仅供我自己这个菜鸡参考：
```javascript
function test (a) {
    return function () {
        console.log(a)
    }
}

test("b")
test("c")()
```
