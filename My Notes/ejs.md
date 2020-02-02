## include
会直接粗暴的把那个 `ejs` 模版里面的内容拉过来
```ejs
<%- include test %>
```

## 注释

## 数据插值
```ejs
<%= title %>
```


- `<% code %>`：运行 JavaScript 代码，不输出
- `<%= code %>`：显示转义后的 HTML内容
- `<%- code %>`：显示原始 HTML 内容
> <%= code %> 和 <%- code %> 都可以是 JavaScript 表达式生成的字符串，当变量 code 为普通字符串时，两者没有区别。当 code 比如为 <h1>hello</h1> 这种字符串时，<%= code %> 会原样输出 <h1>hello</h1>，而 <%- code %> 则会显示 H1 大的 hello 字符串。
## 完了，就是这么带劲
