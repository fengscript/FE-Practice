
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