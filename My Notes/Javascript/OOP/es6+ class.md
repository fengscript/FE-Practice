```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `Hi, ${this.name}`;
  }
  get name(){
      return `cat`
  }
  set name(value){
      console.log(`setter: ${value}`);
  }
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);//子类中使用 super 关键字来调用父类的构造函数和方法
    console.log(this.name);
  }

  sayHi() {
    return `Hi, ${super.sayHi()}`;
  }
}
```
