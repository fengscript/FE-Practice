# Array
## 1 Array to String
### join
```javascript
var arr = [1,2,3];
var str = arr.join(",");
// str = "1,2,3"
```

## 2 数组去重

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


