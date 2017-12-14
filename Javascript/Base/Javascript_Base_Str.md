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
