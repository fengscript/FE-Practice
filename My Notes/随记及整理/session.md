# session

广义的 `session`：从登录成功到登出的过程，在这个过程中客户端和服务器端维持了保持登录的状态，至于具体怎么维持住这种登录的状态，没有要求

狭义的 `session`：登录成功后，服务器端存储了一些必须的用户信息，这部分存在服务器端的用户信息就叫做session

1. 客户端带着用户名和密码去访问 /login 接口，服务器端收到后校验用户名和密码，校验正确就会在服务器端存储一个sessionId和session的映射关系

2. 服务器端返回response，并且将sessionId以set-cookie的方式种在客户端，这样一来，sessionId就存在了客户端。这里要注意的是，将sessionId存在cookie并不是一种强制的方案，而是大家一般都这么做，而且发请求的时候符合domain和path的时候，会自动带上cookie，省去了手动塞的过程。

3. 客户端发起非登录请求时，服务端通过cookie中的sessionId找到对应的session来知道此次请求是谁发出的。


# token
sessionId 是把用户状态信息维护在 server 端，而 token 是把用户的状态信息加密成一串token传给前端，然后每次发请求时把token带上，传回给服务器端；服务器端收到请求之后，解析token并且验证相关信息；

所以跟第一种登录方式最本质的区别是：通过解析token的计算时间换取了session的存储空间

一般用 `jwt`，由三部分组成：
```
header 头部
{
  "alg": "HS256",
  "typ": "JWT"
}
payload 负载
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1555341649998
}
signature 签名
```

header里面描述加密算法和token的类型，类型一般都是JWT；

payload里面放的是用户的信息，也就是第一种登录方式中需要维护在服务器端session中的信息；

signature是对前两部分的签名，也可以理解为加密；实现需要一个密钥（secret），这个secret只有服务器才知道，然后使用header里面的算法按照如下方法来加密：

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

最后的 `jwt = base64url(header) + "." + base64url(payload) + "." + signature`

jwt可以放在response中返回，也可以放在cookie中返回

对于 client，一般放在 `Header` 中

问题：
session：
- session方式由于会在服务器端维护session信息，单机还好说，如果是多机的话，服务器之间需要同步session信息，服务横向扩展不方便。

- session数量随着登录用户的增多而增多，存储会增加很多。

- session+cookie里面存sessionId的方式可能会有csrf攻击的问题，常见的方式是使用csrf_token来解决

  

  jwt

- jwt的过期时间需要结合业务做设置，而且jwt一旦派发出去，后端无法强行使其作废
