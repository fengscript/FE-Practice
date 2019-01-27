# Where

- 默认绑定
  - 独立函数调用，指向 `window`（严格模式指向 `undefined` ）， `Node`中貌似是指向 `undefined`的
- 隐式绑定
- 显式绑定
- new 绑定


## 隐式绑定丢失
方法内部用forEach遍历时候，匿名函数中的引用值环境变成了Window
```javascript
function Outline(opt) {
    this.outLineArr = [];
}
Outline.prototype = {
    constructor: Outline,
    remove(meshes) {
        console.log(this); // this 指向Outline
        var _this = this; // 所以在这里搞事
        if (Array.isArray(meshes)) {
            meshes.forEach(i => {
                scene.getMeshByName(i).renderOutline = 0;
            })
        } else if (arguments.length > 1) {
            arguments.forEach(function(item) {
                console.log(this);  //这里 this会指向 Window 而不是 Outline
                console.log(_this.outLineArr)   //搞事以后就正常了
            })
        }
    }
}
```


经典的，事件绑定内部 `this` 是指向触发事件的 `element` 的
```javascript
let str = document.getElementById('text');
console.log(this);

document.getElementById('btn1').addEventListener('click', function (e) {
    console.log(this);
    console.log(str.value);
});
```
