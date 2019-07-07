webpack 是一个**模块打包器**，处理带有依赖关系的模块，生成一系列表示这些模块的静态资源





# 功能

- entry

  你要打包哪个文件， `webpack` 会把这个文件的相关依赖也打包进去

- output

- Loader

  `webpack` 本身只打包 `js `，使用 `loader` 可以打包其他代码、文件（比如 `css` ，图片等）

- 插件

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









