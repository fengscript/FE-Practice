# preview
webpack 本身维护了一套模块系统，这套模块系统兼容了所有前端历史进程下的模块规范，包括 amd commonjs es6 等

`import` 和 `module` 区别：遵循的模块化规范不一样


TC39 委员会提出 es6 module

CommonJS 还是 ES6 Module 输出都可以看成是一个具备多个属性或者方法的对象；

# CommonJS
`Node` 应用由`CommonJS`模块组成，采用 `CommonJS` 模块规范。

`require` 引入模块，`module.exports` 导出接口

`CommonJS` 规范规定，每个模块内部， `module` 变量代表当前模块。这个变量是一个对象，它的 `exports` 属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的 `module.exports` 属性。

```js
var new = require('new')
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

Node为每个模块提供一个 `exports` 变量，指向 `module.exports`

于是可以直接在 `exports` 对象上添加方法，表示对外输出的接口，如同在 `module.exports` 上添加一样。注意，不能直接将 `exports` 变量指向一个值，因为这样等于切断了 `exports` 与 `module.exports` 的联系。

# ES6 Module
ES6使用 `export` 和 `import` 来导出、导入模块。

`expor` t命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```javascript
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```
使用 `export default` 命令，为模块指定默认输出。

如 `vue`
```javascript
import './Reset.css';
import Store from './store.js';

export default {
    data() {
        return {
            
        }
    },
    components: {
       
    },
    watch: {
       
    },
    computed: {
       
    },
    methods: {
       
    }
}
```


CommonJS规范 http://javascript.ruanyifeng.com/nodejs/module.html

ES6 Module 的语法 http://es6.ruanyifeng.com/#docs/module


## export

**`export default`**
>使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

>为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 `export default` 命令，为模块指定默认输出。

> **其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。**

> export default命令用在非匿名函数前，也是可以的

```javascript
export default function () {
    console.log('foo');
}

import customName from './export-default';
customName(); // 'foo'
```

==使用 `export default` 导出模块内变量时，对应的 `import` 语句不需要使用大括号；不使用 `export default` 导出时，对应的 `import` 语句需要使用大括号==

> 显然，一个模块只能有一个默认输出，因此 `export default` 命令只能使用一次

> 本质上，`export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字



一个一个导出：

```js
export const function aaa(){}
export const obj = {}
```

一次性导出时，必须以对象形式：

```js
export {a, b}
```



## import

- 加载指定模块：
`import {variableName} from '...`

**import命令具有提升效果，会提升到整个模块的头部，首先执行**

- 整体加载：
`import * as Name from '...`

- 同时输入默认方法和其他接口
```javascript
import _, { each, forEach } from 'lodash';
```

## 复合写法
先输入后输出同一个模块，import语句可以与export语句写在一起：
```javascript
export { foo, bar } from 'my_module';
```



# Other

- module.exports 初始值为一个空对象 {}
- exports 是指向的 module.exports 的引用
- require() 返回的是 module.exports 而不是 exports

```javascript
exports = module.exports = {...}
//上面的代码等价于:

module.exports = {...}
exports = module.exports

```




## Notes
### import *
`import * as xxx from 'xxxx' ` 时候，因为 `import *` 了，所以 `import` 进来的是个对象，除非解构： `import {} `，所以有这种情况：
```javascript
import * as ConunterNumber from "./CountNumber/Container/Counter";
ReactDOM.render(<ConunterNumber value={1}/>, document.getElementById("root"));
```
报错： 
> Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.

改成：
```javascript
import ConunterNumber from "./CountNumber/Container/Counter";
```
即可


另一边 引入：
```javascript
const Mcp = require('./Mcp/Mcp.js');
```
导出就需要：
```javascript
export const Instance = Mcp;
```
