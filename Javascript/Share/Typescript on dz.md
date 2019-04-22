# pre

```bash
git pull --rebase
yarn

```

0. 第一行加
   ```javascript
   //@ts-check
   ```
   
1. build-in 代码类型 用小写，自定义类型大写

# 添加类型检查
## 注释形式
```javascript
@param
@returns
不关心返回值时候也可以不写 return
```

### 变量：
match 的是距离它最近的变量
```javascript
/**
 * @type {number}
 */
const displayFirstName = firstName || '';
```

- Interface `@typedef` 可以reuse的shape
```javascript
/**
 * @typeof {object} People
 * @prop {string} firstName
 * @prop {string} [lastName]
 * /
```
optional 用 []

### 函数
```javascript
/**
 * {()=>void} test
 * 
 */
function test(){} 
```


## React
- React.ReactNode
```javascript
/**
 * @prop 
 * /
```

### class conponent
```javascript

```
