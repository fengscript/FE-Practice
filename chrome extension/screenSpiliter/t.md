这里 this 绑定的问题

```js
class Person{
    constructor(name){
        this.name = name;
    }
    hi(){
        console.log(`hi, ${this.name}`);
    }
}

const a = new Person();
a.hi('fyg')//fyg
const b = a.hi;
b.hi('fygfyg')//  VM332:13 Uncaught TypeError: b.hi is not a function

所以需要bind 或者 apply
b.apply(a)
b.call(a)
b = a.hi.bind(a)
```

或者

```js
    hi() => {
        console.log(`hi, ${this.name}`);
    }
```

