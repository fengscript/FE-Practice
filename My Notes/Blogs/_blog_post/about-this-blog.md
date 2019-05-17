---
title: 关于这个博客
date: 2018-12-20 00:00:00
tags: 
    - hexo
toc: true
categories: 
    - 前端
top: true
---

很久以前，开始学前端的时候，在 `CSDN` 放了一个博客，更新每天的笔记。当时当然也菜的不要不要的，每天更新了一堆 `css` 笔记。后来找到了实习就没时间再更新，于是那个 `CSDN` 的博客一直空着了。

入了前端之后才发现可以玩的东西有好多好多，在不断的学习过程中，发现只看和练习 `demo` 是记不住的，当你想给别人解释一个问题的时候，你必须得联系一个概念上下游的所有知识点，才能讲的比较明白。在这个过程中，会逼着你去复习遗忘的东西，去整理、联结零散的知识，于是我发现针对一个主题写下来是一个比较有用的整理知识的方式。

<!-- more -->

了解过之后，发现用 `GitPage` 搭一个静态博客最舒服，不需要你整服务器，只要写
 `markdown` 就OK，还可以各种自定义主题。于是申请了一个域名，找到了N年以前在 `github` 准备的一个仓库，拉了一个 `hexo` 皮肤下来瞧了瞧，哎哟居然是 `ejs` 的模版，更舒服了啊，改了大概一天整成了现在这个样子。
 
 原作者英文字体是 `Ubuntu` 的字体，我也觉得挺好看，但是要从 `Goole` 拉字体文件，你懂得，于是我去掉了 `Ubuntu` 字体先尽量保证速度，以后再想办法解决看看，毕竟 **美就是生产力**，哈哈。


**皮肤来自于 [hexo-theme-icarus](http://github.com/ppoffice/hexo-theme-icarus)**

主要做了以下修改：
1. 为了能使更多精力聚焦在内容而不是左右边栏，将主页调整为两栏
2. 文章页调整布局，去掉边栏，宽度全部占满
3. 比较偏爱 `Material-Card` 设计，去掉了所有内容块的 `border-radius`
4. 小小修改了 `Footer`
5. 改了 `profile` 的 `widget`
6. 添加置顶功能
7. 腾讯域名申请了证书，开启了 `HTTPS`

主要修改地方：
1. 样式 `style.styl`

    注释掉 `54` 行 `border-radius`
    ```styl
    .card
        overflow: hidden
        // border-radius: 4px
        box-shadow: 0 4px 10px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.1)
        & + .card,
    ......
    ```

2. 主页放边栏，文章页去掉

    修改 `layout / layout.ejs` 第 `22` 行处
    ```ejs
    <% if(page.path === "index.html"){ %>
        <div class="column <%= main_column_class() %> has-order-2 column-main"><%- body %></div>
        <%- partial('common/widget', { position: 'left' }) %>
        <%- partial('common/widget', { position: 'right' }) %>
    <%}else{%>
    <!-- in article page, put arcitle take all width-->
        <div class="column is-12 has-order-2 column-main"><%- body %></div>
    <%}%>
    ```
3. 个人信息栏修改 `layout / widget / profile.ejs` 第 `74` 行往下
   ```ejs
   <% if (socialLinks !== null) { %>
       <% for (let name in socialLinks) {
           let link = socialLinks[name]; %>
       <div class="level is-mobile">
           <i class="<%= link.icon %>"></i>
           <span><%= link.url %></span>
        </div>
       <% } %>
   <% } %>
   ```
   

具体配置参考 `_config.yml` 文件，皮肤放在 [GayHub](https://github.com/fengscript/blog-theme)，您也可以拉下去随便玩，有问题可以随时联系我一起玩玩看。

4. 置顶文章
   1. 装一个 ` npm install hexo-generator-index-pin-top --save`
   2. 先了解一下 `front-matter` （- -，自己百度一下吧），就是一篇 `markdown` 最顶上加上一段标记类似这样子：
   ```markdown
    ---
    title: 关于这个博客
    date: 2018-12-20 00:00:00
    ......
    ---

    # 正文内容
    ```
    明显，用三条短横线做了分隔，这里面添加的一些项目会被 `markdown` 识别，要置顶文章，在这里面加上 `top:true` 即可


# 其他
**给文章实现分类、多个标签**
同上，在 `front-matter` 添加对应的语法，`tag` 和 目录 如下 ：

```markdown
---
title: 关于这个博客
date: 2018-12-20 00:00:00
tags: 
    - hexo
    - 随便写写

categories:
    - 前端
    - 随便写写
---
```



ToDoList:
- [x] 添加回复块
- [ ] 页内目录
- [ ] CI 持续集成
- [ ] 搬一份到 `Coding Page`, 国内访问解析到 `Coding Page`
- [ ] 添加 `sitemap`，添加百度索引


有问题 / 意见，可以微信或者邮件我


---
更新： 18-12-20 添加了 `valine` 评论模块