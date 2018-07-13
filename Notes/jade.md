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

引入一个 `jade` 模版

```jade
include ./views/head.jade

style
    include style.css
```

## block

# 属性/特性

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

## 块

```jade
body
  //
    #content
      h1 Example
```
