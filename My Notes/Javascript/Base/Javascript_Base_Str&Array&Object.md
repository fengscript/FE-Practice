# Array
## 1 Array to String
### join
```javascript
var arr = [1,2,3];
var str = arr.join(",");
// str = "1,2,3"
```

## 2 数组去重

### for
```javascript
Array.prototype.unique = function () {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = 0; j < newArray.length; j++) {
      if (this[i] === newArray[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

https://user.qzone.qq.com/2123876956/infocenter

### sort reduce
```javascript
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current)=>{
    if(init.length===0 || init[init.length-1]!==current){
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce


```javascript
Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== this[i + 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}


Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== newArray[newArray.length - 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

### includes
```javascript
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach(item => {
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  });
  return newArray;
}
```

### filter indexOf
```javascript
Array.prototype.unique = function () {
  return this.filter((item, index) => {
    return this.indexOf(item) === index;
  })
}
```


### map
```javascript
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = new Map();
  for(let i = 0; i < this.length; i++){
        if(!tmp.get(this[i])){
            tmp.set(this[i], 1);
            newArray.push(this[i]);
        }
    }
    return newArray;
}

Array.prototype.unique = function () {
  const tmp = new Map();
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1);
  })
}
```


### Set

```javascript
Array.prototype.unique = function () {
  const set = new Set(this);
  return Array.from(set);
}
Array.prototype.unique = function () {
  return [...new Set(this)];
}
```


## 3 每个元素出现次数
```js
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```
### reduce

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

`arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

 initialValue:如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错


accumulator
累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue




# String
## String to Array
### slice
```javascript
var arr = [].slice.call(arr)
```

`slice`: 

`slice(begin, end)`
返回从索引 `begin` 到 `end` 的元素，**不改变原数组（类数组）** ，即
`slice[begin, end)`
可理解为 去掉了 `begin` 个元素： `arr.slice(n)`
或者，返回了从 `begin` 到后面所有的元素

### split
快速获取数组：
```javascript
var strArr = 'array string'.split('') //  ["A", "R", "R", "A", "Y", " ", "S", "T", "R", "I", "N", "G"]
```


## 去掉字符串中某字符

### 1 split

```javascript
var str = "100px";
var new = str.split("px")[0];
//  new => (2) ["100", ""]
// 所以要取 [0]
```

### 2 replace

```javascript
var str = "100px";
var new = a.replace("px","");
```


## element in Array
```javascript
if (array.indexOf(index) === -1 ) {
    //则不存在
}
```



# Object
## use property
从小程序 `this.setData({})` 赋值时复习了一下，对象赋值时，可以用 `[]` 来指定非正常的属性名字，包括拼接字符串，要用引号引起来，如
```javascript
_this.setData({
  ['defaultArr[' + i + '].isSelectAni']: true
})
  // 其实我更喜欢这个
_this.setData({
  isBtnAble: false,
  [`defaultArr[${newSelected}].isSelected`]: true,
});
```

## create
创建一个新对象，使用 *现有的对象来提供新创建的对象的 `__proto__` *

`Object.create({...})` 创建的对象的 `prototype` 会被链接到被提供的对象的 `__proto__` 上，即
```javascript
let a = {name:'obj'};
let b = Object.create(a);
b.obj;  //null
```
