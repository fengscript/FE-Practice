
参考：https://segmentfault.com/a/1190000000357534
# 标签
## 嵌套

```jade
#header
.header-banner
  img.header-logo
```

可以通过缩进：
```jade
ul
  li.first
    a(href='#') foo
  li
    a(href='#') bar
  li.last
    a(href='#') baz
```

也可以 块展开：
```jade
ul
  li.first: a(href='#') foo
  li: a(href='#') bar
  li.last: a(href='#') baz
```



# 文本
## 标签文本
在一个标签后面空格，然后直接写文本：
```jade
p Plain text can include <strong>html</strong>
//- 被渲染为 <p>Plain text can include <strong>html</strong></p>
```

或者
在一个 ` | ` 后面拼接：
```jade
| Plain text can include <strong>html</strong>
p
| It must always be on its own line
```

在一个 标签后面添加 `.` 就可以写一大块文本：
```jade
  script.
  if (usingJade)
  console.log('you are awesome')
  else
  console.log('use jade')
```



# 代码及数据绑定

## 非缓存代码

以前缀`-`开始
不会被输出，只执行
```jade
- for (var key in obj)
  p= obj[key]
```

`jade`有缓存技术，这样子也可以：
```jade
- if (foo)
  ul
    li yay
    li foo
    li worked
- else
  p oh no! didnt work
```

或者：
```jade
- if (items.length)
  ul
    - items.forEach(function(item){
      li= item
    - })
```

## 缓存代码
标签紧跟 `=`
  ```jade
    h1= user.name
    p= user.occupation
  ```




## 循环 `each`
```jade
- var items = ["one", "two", "three"]
each item in items
  li= item
```

带上索引：
```jade
items = ["one", "two", "three"]
each item, i in items
  li #{item}: #{i}
```

## `unless`
`unless` 相当于 `if (!(expr))`

## 条件渲染 `case`
配合 `when`， 相当于 `switch` ，记得要 **正确缩进`when`**：
```jade
- var friends = 10
case friends
  when 0
  p you have no friends
  when 1
  p you have a friend
  default
  p you have #{friends} friends
```
或者 块展开：
```jade
- var friends = 1
case friends
when 0: p you have no friends
when 1: p you have a friend
default: p you have #{friends} friends
```

## 数据绑定


使用 `#{}`

# script link

```javascript
link((rel = "stylesheet"), (href = "/stylesheets/style.css"));
script((src = "/javascripts/jquery.js"));
```

# 模板继承

## extends

相当于把整个 `jade` 文件塞到引用部分的 `jade` 代码中去

```jade
extends layout
```

## include

静态包含一段 `Jade`,包括 `HTML` 、 `CSS`等资源文件

```jade
include ./views/head.jade

style
    include style.css
```

给定一个扩展名后，`Jade` 不会把这个文件当作一个 `Jade` 源代码，并且会把它当作一个普通文本包含进来

### yield
//TODO: 到18-7-19 我没具体试这个东西有什么用


在子模版里面使用， `yield` 语句允许你明确地标明include的代码块的放置位置。比如，假设你希望把代码块放在scripts之前，而不是附加在scripts之后：
```jade
head
  yield
  script(src='/jquery.js')
  script(src='/jquery.ui.js')
```

## block
在母模板里面 `block name` 标明一个 slot ，然后在子模版里面通过 `block name` 来插入内容：
```jade
block header
  header#header.container-fluid

block  content
  p Welcome to #{title}

```

### 追加 block append
```jade
extends layout

block append head
  script(src='/vendor/three.js')
  script(src='/game.js')
```


# html属性/特性

写在 `()` 中

```jade
a(href='/login', title='View login page') Login

input(
  type='checkbox'
  name='agreement'
  checked)
```

# 注释

## 输出 `html` 注释

```jade
// xxxxxxxx
```

## 不输出，只注释 `jade`

```jade
//- xxxxxxxx
```

## 块注释

```jade
body
  //
    #content
      h1 Example
```
