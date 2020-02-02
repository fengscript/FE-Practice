 
 
 
 ## 原理
 React Router 是建立在 history 之上的

常用的 history 有三种形式， 但是你也可以使用 React Router 实现自定义的 history。

- browserHistory
- hashHistory
- createMemoryHistory


hash模式，前端路由，没有真正的从服务器获取相应路径的资源，监听 `hashchange` 事件，你只能改变 `#` 后面的url片段

 ## 路由钩子
 routerWillLeave()


