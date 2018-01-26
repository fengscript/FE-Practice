```js
var My = (function () {
    function Person(name,age) {  
        this.name = name;
        this.age = age;
        this.friend = ["a","b"]
    }
    Person.prototype = {
        constructor:Person,
        sayName:function  () {
            document.write(this.name)
        }
    }
    
    return {
        Person:Person
    }
    
})()

var person1 = new My.Person("FYG",25)
var person2 = new My.Person("fyg",24)

person1.friend.push("c");
document.write(person1.name, person2.age)
person2.sayName()
```

