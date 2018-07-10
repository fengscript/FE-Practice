# 准备
准备搭一个简单的论坛给我们公司 coder 分享代码、笔记用


试了一下好久前玩过的 lumen 5.2.1 丢了一堆东西，就不想玩了，还是来 Node 搭吧，还能多练练 js


准备工具 node + express + vue + myqsl + iview(UI框架)

```bash
npm i -g koa2
npm i -g express
#查了一下 express 对新手友好 koa更自由，先准备好
npm i -g express-generator
npm i pug
# express 用的 jada 模版引擎 但是 jada 貌似被 pug 代替了，所以来一个 pug
```

# go
参照 http://qqfe.org/archives/360

```bash
# express projectName
express forreall
cd forreall
npm i --save-dev
npm i pug --save-dev
npm start
```

然后` http://localhost:3000/ ` 或者 `127.0.0.1:3000` 即可


## 替换模版引擎
```javascript
app.set('view engine', 'pug');
```

然后建一个 `modles` 文件夹放 和数据库链接、操作的文件 （MVC中的M）

