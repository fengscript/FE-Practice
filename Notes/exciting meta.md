

### 自动跳转
```html
<meta http-equiv="refresh" content="n, http://xxx.com">
```
`x` 单位为秒

### 无法脱机浏览
```html
<meta http-equiv="Pragma" content="no-cache">
```
禁止浏览器从本地计算机的缓存中访问页面内容,这样设定，访问者将无法脱机浏览。


### 解决中文乱码问题

设定页面使用简体中文
```html
<meta http-equiv="content-Type" content="text/html; charset=utf-8">
```
网页解析器必须支持UTF-8,UTF16的(Unicode)统一编码
也可以用"GB2312"或者"GBK"这写

### 网页过期时间
```html
<meta http-equiv="expires" content="web,26 Feb 2007 10:20:31 GMT">
```
一旦过期就必须从服务器上重新加载，时间必须使用GMT格式

