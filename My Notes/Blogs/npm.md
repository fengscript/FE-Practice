# 踩坑

## 1
`npm run dev` 抛错： 
```bash
events.js:182
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::8080
    at Object.exports._errnoException (util.js:1016:11)
    at exports._exceptionWithHostPort (util.js:1039:20)
    at Server.setupListenHandle [as _listen2] (net.js:1307:14)
    at listenInCluster (net.js:1355:12)
    at Server.listen (net.js:1455:7)
    at Function.listen (C:\Users\DIM-FYG\Desktop\vue-hackernews-2.0-master\node_                    modules\express\lib\application.js:618:24)
    at Object.<anonymous> (C:\Users\DIM-FYG\Desktop\vue-hackernews-2.0-master\se                    rver.js:120:5)
    at Module._compile (module.js:569:30)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:503:32)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! vue-hackernews-2.0@ start: `cross-env NODE_ENV=production node server`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the vue-hackernews-2.0@ start script.
npm ERR! This is probably not a problem with npm. There is likely additional log                    ging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\DIM-FYG\AppData\Roaming\npm-cache\_logs\2018-03-08T05_47_5                    2_433Z-debug.log
```

是因为 **默认端口被占用（一般是8080）**

所以咱可以，cmd 或者 pws 开
```bash
netstat -ano
```
检查是哪个 `pid` 占了 8080，然后
```bash
kill xxxx
```
再继续 `npm run dev`

## 或者
去 `package.json` 里面另设个端口即可


## 2 
`vscode` 自带命令行执行 `npm run dev` 报错
```bash
(webpack)/hot/emitter.js
There are multiple modules with names that only differ in casing.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
```
貌似是 `vscode` 更新后的问题，是 `import` 时候大小写有问题，但是我 `import` 的木有问题，所以先换了 `cmder`用



# Base
1 换源加速

    npm config set registry https://registry.npm.taobao.org 
    npm info underscore （如果上面配置正确这个命令会有字符串 `response` ）



去掉ssl验证 （对Atom下载插件有帮助）

    npm config set strict-ssl false

淘宝源https://npm.taobao.org/



atom包管理工具——apm

    apm config set registry https://registry.npm.taobao.org 
    npm config set registry https://registry.npm.taobao.org 
    //是的 node也要换掉 瞬间速度杠杠的
    apm config set strict-ssl false
    
    apm config set https-proxy=http://127.0.0.1:2676/
    apm config set http-proxy=http://127.0.0.1:2676/



安装不上 node-sass 导致的错误解决（包括 electron  install报错）

    直接 `bash` 输入后回车：
    
    electron_mirror="https://npm.taobao.org/mirrors/electron/"
    
    sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
    phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
    ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/





换源工具——nrm

    npm install nrm -g

2 管理不同版本——nvm

    npm install nvm -g
