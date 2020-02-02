# vorlon 移动端调试
默认开端口 1337
## 1 install
```bash
npm i vorlon -g
```

## 2 start server
```bash
vorlon
```


## 3 link script
插进去
```html
<script src="http://localhost:1337/vorlon.js"></script>
```

## 4 dash
```
http://localhost:1337
```


# 移动端
如果不只是在手机调试，那么 `http-server` 以后，就全部需要如下：
```html
<script src="http://192.168.????:1337/vorlon.js"></script>
```
并且
```
http://192.168.????:1337
```
