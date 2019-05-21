```javascript
class Animal {
    //es7 实例属性 this.xxx 直接用 xxx 代替
    name = `animanal`;
    //es7 静态属性
    static age = 27;
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
  //静态方法不需要实例化，而是直接通过类来调用：
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
