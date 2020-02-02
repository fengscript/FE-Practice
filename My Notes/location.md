# location

## props
- host :"10.0.4.61:8080"
- hostname :"10.0.4.61"
- href :"http://10.0.4.61:8080/3ds/app/robam_3d_website/"
- hash :"#header"
- origin :"http://10.0.4.61:8080"
- pathname :"/3ds/app/robam_3d_website/"
- port :"8080"
- protocol :"http:"
- search
- ancestorOrigins :DOMStringList {length: 0}

### href
`location.href` 定位到一个锚点

`location.href = location.origin + location.pathname + "#header"`

**注意：**
当 `location.href = location.origin + location.pathname` 时，就会循环刷新本页！

`location.hash` 在当前浏览器地址栏 `url` 中添加数据时，就会将该 `url` 作为新打开的页面，**将其压入浏览器的历史记录栈中**，这就导致了浏览器的前进和后退功能发生紊乱

可以用 `history.replaceState()` 代替

## methods

- assign
- reload
- replace
- toString
- valueOf
- Symbol(Symbol.toPrimitive)


### replace

`Location.replace()` 方法以给定的URL来替换当前的资源。 与 `assign()` 方法 不同的是调用 `replace()` 方法后，当前页面不会保存到会话历史中，这样用户点击回退按钮将不会再跳转到该页面。

```javascript
location.replace(location.origin + location.pathname + "#" + el)
```


# history

## props
- length
- scrollRestoration
- state

## _prop_
- length
- state
- scrollRestoration

- back
- forward
- go
- pushState
- replaceState

### replaceState
在不刷新页面的基础上,修改浏览器地址栏 `url`，同时用修改后的 `url` 在浏览器的历史记录栈替换原`url`

`history.replaceState(state, title, url)`

state对象,关系到由replaceState()方法创建出来的新的history实体。用以存储关于你所要插入到历史记录的条目的相关信息。
State对象可以是任何Json字符串。因为firefox会使用用户的硬盘来存取state对象，这个对象的最大存储空间为640k。如果大于这个数 值，则该方法会抛出一个异常。如果确实需要更多的空间来存储，请使用本地存储。

title—firefox现在会忽略这个参数，虽然它可能将来会被使用上。而现在最安全的使用方式是传一个空字符串，以防止将来的修改。或者可以传一个简短的标题来表示state

URL—简单地说就是你需要修改成的地址栏的新的url。新的url必须和现有的url同域，否则将抛出异常。这个参数是选填的，如果为空，则会被置为document当前的url。

```javascript
history.replaceState("","",location.origin + location.pathname);
```

### 搭配使用
```javascript
function flyTo(el) {
    location.replace(location.origin + location.pathname + "#" + el);
}

window.onload = function () {
    history.replaceState("","",location.origin + location.pathname);
}
document.documentElement.scrollTop = 0;
```


## 再看看
- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location

