`<script>` 标签的src属性并不被同源策略所约束，所以可以获取任何服务器上脚本并执行。

程序A中sample的部分代码：

```javascript
<script type="text/javascript">
//回调函数
function callback(data) {
    alert(data.message);
}
</script>
<script type="text/javascript" src="http://localhost:20002/test.js"></script>
```


程序B中test.js的代码：
```javascript
//调用callback函数，并以json数据形式作为阐述传递，完成回调
callback({message:"success"});
```

这其实就是JSONP的简单实现模式，或者说是JSONP的原型：**创建一个回调函数，然后在远程服务上调用这个函数并且将JSON 数据形式作为参数传递，完成回调。**

将JSON数据填充进回调函数，这就是JSONP的JSON+Padding的含义.