var ut = require('util');



/**
 *  util
 */

// util.inherits

function Base() {
    this.name = "fyg";
    this.age = 26;
    this.sayHi = function () {
        console.log("Hi " + this.name);
    }
}

Base.prototype.showAge = function  () {
    console.log(this.age);
}

function Sub () {
    this.name = "sub"
}

ut.inherits(Sub, Base)

var objBase = new Base();
objBase.showAge();
objBase.sayHi();

console.log(objBase);

var objSub = new Sub();
// objSub.sayHi()
console.log(objSub);


console.log(ut.inspect(objSub,true,4,true));