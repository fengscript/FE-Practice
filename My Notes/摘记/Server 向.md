# nginx

> 在外部看来，「代理服务器」和「处理数据的服务器」是一个整体。就好比，食客只会去饭店吃饭，而不是去找厨师吃饭（即对于浏览器来说，到达反向代理服务器已经完成任务了，后面的操作由反向代理服务器负责）。

# Json

> 答案就藏在服务端的代码中，当服务端支持 JSONP 技术时，会做如下一些设置：
> 识别请求的 URL，提取 callback 参数的值，并动态生成一个执行该参数值（一个函数）的 JavaScript 语句；
> 将需要返回的数据放入动态生成的函数中，等待其加在到页面时被执行；





# Linux

检查系统版本：`cat /proc/version`







# RESTful API

Roy T. Fielding（HTTP/1.1协议专家组负责人）提出

Resource Representational State Transfer：资源在网络中以某种表现形式进行状态转移

- 资源
- 统一接口
- URI
- 无状态

==**URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作**==

REST描述的是在网络中 client 和 server 的一种交互形式；我们更多关注的是如何设计 RESTful API



URL中只使用名词来指定资源，原则上不使用动词

GET    获取资源，
POST  新建资源（也可以用于更新资源），
PUT    更新资源，
DELETE  删除资源

如：
`DELETE http://api.qc.com/v1/friends ` 删除好友



> 根据restful 设计风格，我们通常会用路径+资源名来标记我们的资源。而 params 就是用于在路径上标记资源的“参数”。



## 1 资源

"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息





# Serverless

构建、运行时不需要服务器管理的应用程序



比如 CDN ：

> 我们把静态资源发布到 CDN 之后，就不需要关心 CDN 有多少个节点、节点如何分布，也不需要关心它如何做负载均衡、如何实现网络加速，所以 CDN 对前端来说是 Serverless



Serverless 则可以理解为运行在 FaaS 中的，使用了 BaaS 的函数

FaaS（Function as a Service） ：一些运行函数的平台，比如阿里云的函数计算、AWS 的 Lambda 等。

BaaS（Backend as a Service）：一些后端云服务，比如云数据库、对象存储、消息队列等。利用 BaaS，可以极大简化我们的应用开发难度