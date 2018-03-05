# Array
## Array to String
### join
```javascript
var arr = [1,2,3];
var str = arr.join(",");
// str = "1,2,3"
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


