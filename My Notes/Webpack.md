webpack 是一个**模块打包器**，处理带有依赖关系的模块，生成一系列表示这些模块的静态资源





# 功能

- entry

  你要打包哪个文件， `webpack` 会把这个文件的相关依赖也打包进去

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





