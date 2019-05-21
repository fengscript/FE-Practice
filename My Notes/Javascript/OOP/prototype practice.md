```js
function Book(id, name) {
    this.id = id;
    this.name = name;
    this.state = true;
    this.str = "str from construction";
}

Book.prototype = {
    str: "str from Book.prototype",   
    getStr:function(){
        // console.log(str);    //Uncaught ReferenceError: str is not defined   
        console.log(this.str);  // "str from construction" `prototype` 中使用  `this` 可以访问到 `prototype` 中设置的属性和方法，但是 **会被构造函数上用 `this` 定义的同名属性或方法覆盖**
        // console.log(this.prototype.str);
        console.log(Book.prototype.str);    
        // this.str = "change str from prototype"
    },
    changeStr:function(){
        this.str = "change str from prototype"  // 这里会把构造函数里面的 this.str 改掉
        //类的静态公有方法里面可以通过  `Class.prototype` 或者  `this.prototype` 访问到 `prototype` 中的方法，进而设置/修改 构造函数里面的属性和方法。但是，想从类的静态共有方法里面修改原型对象上的属性时，要注意原型对象上的同名方法或属性会被构造函数的覆盖，从而改掉的是构造函数里面的同名的属性和方法。
        // console.log(this.str);
    }
}


Book.getState = function () {
    console.log(this);  // f Book()...
    console.log(this.state);    // undefined 所以下面才会给 this.state 赋值成了 false  就是说 静态方法里面用 this 访问不到任何东西
    this.state = false; 
    console.log(this.state);    // false
    // console.log(this.prototype.state);  

}

Book.getStrStatic = function(){
    console.log(this.prototype.str);    //  "state from Book.prototype" 类的静态公有方法可以用 `Class.prototype` 或者  `this.prototype` 访问到 `prototype` 中的属性和方法
    console.log(Book.prototype.str);
}

Book.changeStateStatic = function  () {
    
}
var book1 = new Book(1, 'js')
var book2 = new Book(2, 'html');

book1.getStr();
// console.log(book1.state);   //true
// console.log(book2.state);   //true
Book.getStrStatic()
book1.changeStr();
book1.getStr();


// Book.change();
// console.log(book1.str);
```