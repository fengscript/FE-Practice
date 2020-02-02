Linux下最新版需要手动编译

1. `g++`在4.6+，`python`在2.6+

2. 下载`tar.gz`接在

3. ```
    $ ./configure
    $ make
    $ sudo make install
    ```


Linux下，使用NodeJS监听80或443端口提供HTTP(S)服务时需要root权限

 ```
   $ sudo node server.js

   $ sudo chown root /usr/local/bin/node
   $ sudo chmod +s /usr/local/bin/node
 ```

#### 模块

在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。

采用的是`CommonJS`规范，`require`引入模块，`module.exports`导出接口

**而ES6中， `modeule` 标准采用  `export` 指令导出接口，`import` 导入模块**

在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

##### `require`

`require`函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。

模块名可使用**相对路径**（以`./`开头），或者是**绝对路径**（以`/`或`C:`之类的盘符开头）。另外，模块名中的`.js`扩展名可以省略

```js
var foo1 = require('./foo');
//或者是一个 json
var data = require('./data.json');
```

##### `module`

通过`module`对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。

```js
module.exports = function () {
    console.log('Hello World!');
};
```

##### 模块初始化

**一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。**

##### 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，`main.js`就是主模块。

```javascript
$ node main.js
```

#### 代码组织和部署

`require`的相对、绝对路径都在模块之间建立了强耦合关系，某个模块文件存放位置需要修改时，所有相关的其他模块代码都需要调整。因此，`require`函数支持第三种形式的路径，写法类似于`foo/bar`，并依次按照以下规则解析路径，直到找到模块位置。

1. 内置模块

   如果传递给`require`函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如`require('fs')`。

2. node_modules目录

   NodeJS定义了一个特殊的`node_modules`目录用于存放模块。例如某个模块的绝对路径是`/home/user/hello.js`，在该模块中使用`require('foo/bar')`方式加载模块时，则NodeJS依次尝试使用以下路径。

   ```
    /home/user/node_modules/foo/bar
    /home/node_modules/foo/bar
    /node_modules/foo/bar
   ```

3. NODE_PATH环境变量

   与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用`:`分隔，在Windows下使用`;`分隔。例如定义了以下NODE_PATH环境变量：

   ```
    NODE_PATH=/home/user/lib:/home/lib
   ```

   当使用`require('foo/bar')`的方式加载模块时，则NodeJS依次尝试以下路径。

   ```
    /home/user/lib/foo/bar
    /home/lib/foo/bar
   ```

#### package

JS模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。为了便于管理和使用，我们可以把由多个子模块组成的大模块称做`包`，并把所有子模块放在同一个目录里。

在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象，在其它模块里使用包的时候，需要加载包的入口模块。

##### index.js

当模块的文件名是`index.js`，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此以下两条语句等价。

```
var cat = require('/home/user/lib/cat');
var cat = require('/home/user/lib/cat/index');
```

这样处理后，就只需要把包目录路径传递给`require`函数，感觉上整个目录被当作单个模块使用，更有整体感。

##### package.json

如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个`package.json`文件，并在其中指定入口模块的路径

如，对

```shell
- /home/user/lib/
    - cat/
        + doc/
        - lib/
            head.js
            body.js
            main.js
        + tests/
        package.json
```

其中`package.json`内容如下。

```json
{
    "name": "cat",
    "main": "./lib/main.js"
}
```

如此一来，就同样可以使用`require('/home/user/lib/cat')`的方式加载模块。NodeJS会根据包目录下的`package.json`找到入口模块所在位置。

#### 命令行程序

在Linux系统下，我们可以把JS文件当作shell脚本来运行，从而达到上述目的，具体步骤如下：

1. 在shell脚本中，可以通过`#!`注释来指定当前脚本使用的解析器。所以我们首先在`node-echo.js`文件顶部增加以下一行注释，表明当前脚本使用NodeJS解析。

   ```shell
    #! /usr/bin/env node
   ```

   NodeJS会忽略掉位于JS模块首行的`#!`注释，不必担心这行注释是非法语句。

2. 然后，我们使用以下命令赋予`node-echo.js`文件执行权限。

   ```shell
    $ chmod +x /home/user/bin/node-echo.js
   ```

3. 最后，我们在PATH环境变量中指定的某个目录下，例如在`/usr/local/bin`下边创建一个软链文件，文件名与我们希望使用的终端命令同名，命令如下：

   ```shell
    $ sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
   ```

这样处理后，我们就可以在任何目录下使用`node-echo`命令了。

Windows

在Windows系统下的做法完全不同，我们得靠`.cmd`文件来解决问题。假设`node-echo.js`存放在`C:\Users\user\bin`目录，并且该目录已经添加到PATH环境变量里了。接下来需要在该目录下新建一个名为`node-echo.cmd`的文件，文件内容如下：

```
@node "C:\User\user\bin\node-echo.js" %*
```

这样处理后，我们就可以在任何目录下使用`node-echo`命令了。

#### 工程目录

了解了以上知识后，现在我们可以来完整地规划一个工程目录了。以编写一个命令行程序为例，一般我们会同时提供命令行模式和API模式两种使用方式，并且我们会借助三方包来编写代码。除了代码外，一个完整的程序也应该有自己的文档和测试用例。因此，一个标准的工程目录都看起来像下边这样。

```
- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
```

其中部分文件内容如下：

```js
/* bin/node-echo */
var argv = require('argv'),
    echo = require('../lib/echo');
console.log(echo(argv.join(' ')));

/* lib/echo.js */
module.exports = function (message) {
    return message;
};

/* package.json */
{
    "name": "node-echo",
    "main": "./lib/echo.js"
}
```

以上例子中分类存放了不同类型的文件，并通过`node_moudles`目录直接使用三方包名加载模块。此外，定义了`package.json`之后，`node-echo`目录也可被当作一个包来使用。

#### NPM

安装好之后，包会放在工程目录下的`node_modules`目录中，因此在代码中只需要通过`require('package')`的方式就好，无需指定三方包路径。

如果想要下载指定版本的话，可以在包名后边加上`@<version>`

##### 版本号

语义版本号分为`X.Y.Z`三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

```
+ 如果只是修复bug，需要更新Z位。

+ 如果是新增了功能，但是向下兼容，需要更新Y位。

+ 如果有大变动，向下不兼容，需要更新X位。
```

#### 其他

- 使用`npm update `可以把当前目录下`node_modules`子目录里边的对应模块更新至最新版本。
- 使用`npm update  -g`可以把全局安装的对应命令行程序更新至最新版。
- 使用`npm cache clear`可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
- `npm install xxx -D`   -D 即 `--save-dev`