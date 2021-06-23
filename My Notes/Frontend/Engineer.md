[toc]

# Node

1. `no such file or directory, open 'C\\User...\\node_modules\\.staging\\lodash-1321\\fp\\wrapper.js'`

```
npm install -g xxx —no-optional
```



["npm run build" = "react-scripts: Permission denied"](https://stackoverflow.com/questions/62140265/npm-run-build-react-scripts-permission-denied)

“react-scripts: Permission denied”

"scripts": { "start": "node ./node_modules/react-scripts/bin/react-scripts.js start" }

# npm

1.临时使用

npm --registry

https://registry.npm.taobao.org

install express

2.持久使用

npm config set registry

https://registry.npm.taobao.org

配置后可通过下面方式来验证是否成功

npm config get registry 或 npm info express

3.通过cnpm使用

npm install -g cnpm --registry=

https://registry.npm.taobao.org

1.原npm地址

`npm config set registry <http://registry.npmjs.org`>

2.设置国内镜像

a.通过config命令

```
npm config set registry <https://registry.npm.taobao.org> npm info underscore （如果上面配置正确这个命令会有字符串response）
```

b.命令行指定

```
npm --registry <https://registry.npm.taobao.org> info underscore
```

c.编辑 `~/.npmrc` 加入下面内容

`registry = <https://registry.npm.taobao.org`>

3.使用nrm管理registry地址

a.下载nrm

```
npm install -g nrm
```

b.添加registry地址

`nrm add npm <http://registry.npmjs.org`>

`nrm add taobao <https://registry.npm.taobao.org`>

c.切换npm registry地址

```
nrm use taobao
nrm use npm
```





## 版本号

~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0 ^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0 * 这意味着安装最新版本的依赖包

推荐使用~，只会修复版本的bug，比较稳定





# Webpack

`Webpack`可以以指定入口的一系列相互依赖的模块打包成一个文件，模块可以是`js`，也可以是其他类型的文件，但其他类型的文件需要对应的`Loader`转义

## 配置`Loader`的方式

在`webpack.config.js`文件的`module.rules`下配置，一个对象便配置了编译该类型文件的Loader

```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, // 文件类型
        include: [],   // 查找文件的范围
        exclude: [],   // 查找文件需排除的文件夹
        use: ['loader']// 处理文件的Loader，可配置多个Loader
      }
    ]
  }
}
复制代码
```

### `use`配置

> `use`是一个数组，其中可以配置多个`Loader`，`webpack`中多个`Loader`会按`从右到左`的顺序执行(原因：采用`compose`方式)

`use`数组可以包含字符串和对象

### `use字符串`

如果`use`中包含的是字符串，则表示的是`Loader`的名称

```
use: ['style-loader', 'css-loader']
```

### `use对象`

如果`use`包含的是`对象`，则对象中`loader`表示`Loader加载器`的名称，`options`表示`Loader`的额外配置，它是用来给`Loader传参`的

```
use: [{
    loader: 'babel-loader',
    options: { // 额外配置，用于给Loader传参
        presets: ['@babel/preset-env'], // presets设置的是当前JS的版本
        plugins: [require('@babel/plugin-transform-object-rest-spread')] // 需要的插件
    },
    // enforce :’post ’的含义是将该 Loader 的执行顺序放到最后
    // enforce 的值还可以是 pre，代表将 Loader 的执行顺序放到最前面 
    enforce : 'post'
}]

use: [{
    loader: 'file-loader',
    options: { // 不同的加载器，参数不同
        name: '[name].[hash:8].[ext]',
        publicPath: './images',
        outputPath: './images'
    }
}]
```

## `CSS`模块

- 引入

  ```
  CSS
  ```

  的两种方式

  - 第一种：在引入`CSS`时，在最后生成的`JS`文件中进行处理，动态创建`Style`标签，放入`head`标签中
  - 第二种：在打包时，将`CSS`文件拆分出来，`CSS`相关模块最终打包到一个指定的`CSS`文件中，通过手动添加`link`标签去引入这个文件

### `Webpack`编译`CSS`(第一种)

安装`style-loader`和`css-loader`模块，并在`webpack.config.js`中配置`Loader`

```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}
```

在遇到`.css`文件，`Webpack`会先用`css-loader`去解析这个文件，遇到`@import`等语句就将相应样式文件引入，最后所有的`CSS`将使用`style-loader`生成一个内容为最终解析完的`CSS`代码的`Style`标签，放到`head`标签里

### 第二种方式

使用`extract-text-webpack-plugin`插件，将`css-loader`和`style-loader`编译好的`CSS`文件抽离出来，放到一个单独问`.css`文件中，然后在`index.html`中使用`link`引入

```
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  // CSS存放到style.css文件中
  plugins: [new ExtractTextPlugin("styles.css")]
}
// index.html 
// /dist/为输出文件，具体看自己的output配置
<link rel="stylesheet" href="./dist/style.css" type="text/css" />
```






weback 打包：https://zhuanlan.zhihu.com/p/348377346