```javascript
function Obj(id, name) {
    // 私有属性
    var id = id;
    var name = "";
    // 私有方法
    var checkId = () => {
        return id;
    }
    // 对象公有属性
    this.name = name;
    this.age = 26;
    this.num = 0;
    // 特权方法
    this.setNum = () => {
        this.num++;
    }
    this.getNum = () => {
        console.log(this.num)
    }
    this.setName = (str) => {
        name = str;
    }
    this.getName = () => {
        console.log(name);
    }

    // 构造器
    this.setName(name)
    // 直接给类添加公有方法
    Obj.prototype.sayName = () => {
        console.log("Obj.prototype.sayName " + this.name)
    }
    Obj.prototype.sayHi = () => {
        console.log("hi1")
    }
}

Obj.prototype = {
    type: 'Boolean',
    state: 0,
    sayType() {
        console.log(this.age);
        console.log(Obj.prototype.type)
    },
    sayType2: () => {
        console.log(this.age);
        console.log(Obj.prototype.type)
    },
    sayHi() {
        console.log('hi2')
    },
    changeState() {
        this.state++;
    },
    sayState() {
        console.log(this.state++)
    }
}
Obj.color = "red";
Obj.sayColor = function(){
    console.log(this.color);
}
Obj.changeState = function() {
    // console.log(state); 
    // 访问不到
    console.log(this.state); // undefined
    console.log(this.num); // undefined
    console.log(this.prototype.state); // 0
    console.log(Obj.num); // 0
}


var a = new Obj("fyg");
console.log(a.prototype) //undefined 
//实例的 prototype 和构造函数的原型对象没有任何关系 
// 倒是 原型.__proto__ 指向构造函数的原型对象
a.prototype = {
    sayAge: () => {
        console.log(this.age)
    }
}
a.prototype.sayCode = function() {
    console.log(this.code);
}
a.prototype.sayHi = function() {
    console.log("hi3");
}
console.log(a.prototype) //这里给 a的 prototype 改写、增加了方法以后，就可以看到了
// a.sayAge();
a.sayName();
a.sayType() //注意！！！ 这里可以访问到 26
a.sayType2()
//如果 Obj.prototype 中的 sayType 换成

// sayType:()=>{} 因为封闭作用域，就访问不到 Obj啦！！！但是Obj.prototype仍然可以！！！
a.sayHi(); // "hi1"  构造函数公有方法会屏蔽原型对象上的同名方法 
a.changeState();
a.sayState(); // 1
a.setNum();
a.getNum(); // 1
var b = new Obj("FYG");
b.changeState();
b.sayState(); // 1 不同实例上的类公有属性不共享
b.setNum();
b.getNum(); // 1 不同实例上的对象公有属性不共享

Obj.changeState();
Obj.sayColor()  // 'red'
```