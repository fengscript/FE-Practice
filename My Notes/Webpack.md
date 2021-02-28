webpack 是一个**模块打包器**，处理带有依赖关系的模块，生成一系列表示这些模块的静态资源







# 功能

- context： String 基础目录，**绝对路径**， 默认使用当前目录，但是推荐在配置中传入一个值。这使得你的配置独立于 CWD(current working directory, 当前工作目录)

- entry

  你要打包哪个文件， `webpack` 会把这个文件的相关依赖也打包进去

  如果传入一个字符串或字符串数组，chunk 会被命名为 `main`。如果传入一个对象，则每个属性的键(key)会是 chunk 的名称，该属性的值描述了 chunk 的入口点。

  ```js
  module.exports = {
    //...
    entry: {
      home: './home.js',
      shared: ['react', 'react-dom', 'redux', 'react-redux'],
      catalog: {
        import: './catalog.js',
        filename: 'pages/catalog.js',
        dependOn: 'shared',
      },
      personal: {
        import: './personal.js',
        filename: 'pages/personal.js',
        dependOn: 'shared',
        chunkLoading: 'jsonp',
        layer: 'name of layer', // set the layer for an entry point
      },
    },
  };
  ```

- output

- loader

  Loader 对模块进行处理

  如 css (类似管道，但方向相反)

  ```js
  style-loader!css-loader!less
  ```

  ==loader处理完会得到一个依赖树，每个模块都有一个处理结果的描述，然后在plugin中对整个entry输出的内容做处理，例如，热加载过程中插入 HRM runtime==

  `webpack` 本身只打包 `js `，使用 `loader` 可以打包其他代码、文件（比如 `css` ，图片等）

- plugin

  plugin对chunk进行处理

  

  可以完成更多 loader 不能完成的功能

参考：webpack4入门1——概览 <https://www.jianshu.com/p/43555e34d19f>

## config

### Loader

```json
{
    module: {
        loaders: [
            { test: /\.jade$/, loader: "jade" },
            // => "jade" loader is used for ".jade" files
            { test: /\.css$/, loader: "style!css" },
            // => "style" and "css" loader is used for ".css" files
            // Alternative syntax:
            { test: /\.css$/, loaders: ["style", "css"] },
        ]
    }
}
```



port:



**importLoaders**

是在`css-loader` 之后指定 n 个数量的loader（如 postcss-loader）来处理import进来的资源



# HMR

Hot Module Replace



`Webpack-dev-server` 内置了 HMR 插件，启用



```javascript
//1
devServer: {
 ...
    hot: true
}
//2
plugins:[
  new webpack.HotModuleReplacePlugin()
]
```

命令: `webpack-dev-server --hotOnly`





# 同时起两个server

https://stackoverflow.com/questions/52791647/webpack-dev-server-run-multiple-apps-on-multiple-ports

```js
//webpack.config.js
[{
    entry: "./entry1.js",
    output: {
        filename: "outpu1.js"
    }
}, {
    entry: "./entry2.js",
    output: {
        filename: "outpu2.js"
    }
}]
```

then create a node script like this,

```js
const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const config = require("./webpack.config")

const compiler = webpack(config)

const server1 = new WebpackDevServer(compiler.compilers[0], {
    contentBase: __dirname,
    hot: true,
    historyApiFallback: false,
    compress: true,
})

const server2 = new WebpackDevServer(compiler.compilers[1], {
    contentBase: __dirname,
    hot: true,
    historyApiFallback: false,
    compress: true,
})

server1.listen(3000, "localhost", function() {})
server2.listen(5000, "localhost", function() {})
```

You create a `webpack-dev-server` instance for each `compiler`.

Other way you can do this is to write multiple scripts in your package.json like this:

```js
{
   "scripts":{
       "serve1": "webpack-dev-server --content-base <file/directory/url/port> --port 3000",
       "serve2": "webpack-dev-server --content-base <file/directory/url/port> --port 5000"
   }
}
```

and then run both scripts using `npm-run-all`,

```js
npm-run-all serve1 serve2
```







# Readlist

Webpack总结： https://juejin.cn/post/6844904167081771015





