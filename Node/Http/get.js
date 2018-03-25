var http = require('http');
var url = require('url');
var ut = require('util');
var qs = require('querystring')



var postHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <form method="POST">
        名字：<input name="name">
        年龄：<input name="age">
        <input type="submit">
    </form>
</body>
</html>
`
http.createServer((req, res) => {
    /**
     *  获取 GET
     */~
    // res.writeHead(200, {
    //     "Content-Type": "text/plain;charset = utf-8"
    // });
    // res.end(ut.inspect(url.parse(req.url, true)))

    // 解析 url 参数
    // console.log(url.parse(req.url, true));
    // var params = url.parse(req.url, true).query;
    // res.write("name：" + params.name);
    // res.write("\n");
    // res.write("age :" + params.age);
    // console.log(params);


    
    /**
     *  获取 POST
     */
    var body = "";

    // 通过 req 的 data 事件监听，每次接收到请求体，就累加到 post 中
    req.on('data', chunk => {
        body += chunk;
    })

    req.on('end', () => {
        // 解析参数
        body = qs.parse(body)
        // 设置响应头和编码
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf8'
        })

        // 输出提交的数据
        if (body.name && body.age) {
            res.write("提交的名字：" + body.name)
            res.write("\n")
            res.write("提交的年龄：" + body.age)

        } else {
            res.write(postHTML)
        }
        res.end();
    })


}).listen(8080)