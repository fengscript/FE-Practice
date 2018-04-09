# preview
webpack 本身维护了一套模块系统，这套模块系统兼容了所有前端历史进程下的模块规范，包括 amd commonjs es6 等

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
