# 准备
准备搭一个简单的论坛给我们公司 coder 分享代码、笔记用


试了一下好久的 lumen 5.2.1 丢了一堆东西，就不想玩了，还是来 Node 搭吧，还能多练练 js


准备工具 node + express + vue + ~~myqsl~~ + ~~iview(UI框架)~~ + mongDB

```bash
npm i -g koa2
npm i -g express
#查了一下 express 对新手友好 koa更自由，先准备好
npm i -g express-generator
npm i pug
# express 用的 jada 模版引擎 但是 jada 貌似被 pug 代替了，所以来一个 pug
npm i mysql -g
```

# go
参照 http://qqfe.org/archives/360

```bash
# express projectName
express forreall
cd forreall
npm i --save-dev
npm i pug --save-dev
npm install mysql --save-dev
npm start
```

然后` http://localhost:3000/ ` 或者 `127.0.0.1:3000` 即可


## 替换模版引擎
```javascript
app.set('view engine', 'pug');
```
改了以后会报错说找不到 `error` 视图了，绝望，先这样 。。。
> 建立一个 `error` 模版就OK了


然后建一个 `modles` 文件夹放 和数据库链接、操作的文件 （MVC中的M）


后来我还是换成了 `ejs`。。。。

`ejs` 一样，一定要有一个 `error` 模版让他来吐槽你


## 连接数据库
~~引入mysql模块，然后使用mysql.createPool()创建连接~~
后来我还是换成了 `MongDB`。。。。

### 安装 `MongDB`