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