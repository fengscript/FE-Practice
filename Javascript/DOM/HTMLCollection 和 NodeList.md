# 异同
相同：
- 都有length属性
- 都有元素的getter，叫做item，可以传入索引值取得元素。
- 都是类数组

不同：
- NodeList 是一个节点的集合，既可以包含元素和其他节点(注释节点、文本节点等)
- HTMLCollection 只是元素集合, 只有Element
- HTMLCollection还有一个nameItem()方法，可以返回集合中name属性和id属性值的元素。（部分浏览器也支持NodeList的nameItem()方法）


# NodeList

NodeList 对象是一个节点的集合，是由 Node.childNodes 和 document.querySelectorAll 返回的.


## Node.childNodes 是实时的

```javascript
var parent = document.getElementById('parent');
var child_nodes = parent.childNodes;
console.log(child_nodes.length); // 如果假设结果是“2”
parent.appendChild(document.createElement('div'));
console.log(child_nodes.length); // 此时的输出是“3”
```

## document.querySelectorAll 返回静态 NodeList

除此之外，其他接口返回的 HTMLCollection 和 NodeList 都是 live 的


# HTMLCollection
本质是一个动态的 NodeList 对象

Element 继承自 Node，是 Node 的一种，在 HTML 中，它一般是 HTML 元素（比如 <p> 之类的标签创建出来的对象）。而 Node 作为父类，除了 Element 还有一些其他子类，比如 HTML 元素内的文本对应的 Text，文档对应的 Document，注释对应的 Comment。HTMLCollection 里，只有 Element，而 NodeList 里可以有 Element、Text、Comment 等多种元素

因此 NodeList 里可能会有很多一般 DOM 操作不需要的 text node 和 comment node 需要处理

## 便捷访问
HTMLCollection 提供了访问诸如表单、图像和链接等文档元素的便捷方式，比如 document.images 和 document.forms 的属性都是 HTMLCollection 对象。

```javascript
<body>
    <img src="test.png" id="image1">
    <img src="test.png" id="image2">
</body>
<script>
    console.log(document.images.namedItem('image1'))
//<img src="test.png" id="image1">
</script>
```

有时要迭代一个 NodeList 或 HTMLCollection 对象的时候，我们通常会选择生成当前对象的一个快照或静态副本：
转换为数组类型：
```javascript
var staticLists = Array.prototype.slice.call(nodeListorHtmlCollection, 0)
```
这样的话，就可以放心的对当前的 DOM 集合做一些删减和插入操作，在 DOM 密集操作的时候很有用。