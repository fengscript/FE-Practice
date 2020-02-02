# CURD

## 增
append 和 appendChild
```javascript
element.parentNode.appendChild(element);
```
- parentNode.append()
    - 可以同时传入多个节点或字符串，没有返回值； >IE9
- Node.appendChild()
    - 只能传一个节点，且不直接支持传字符串(需要parentNode.appendChild(document.createTextElement('字符串'))代替)，返回追加的Node节点

https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/append

插一句， `append` 我觉得不敢乱用，IE9以下不支持，以防万一。。。


### `data-`
获取图片的 `src`，需要 `e.getAttribute('src')`，不然直接 `e.src` 取到的是带主机地址的值：
`http://127.0.0.1:8080/3ds/app/smartsan_onestep/[object%20HTMLImageElement]`

对于h5 `dataset` 新属性要添加，需要用 `setAttribute()`

取的时候，可以`getAttribute` ，也可以从元素的 `dataset` 里面读取









# console.log出来是HTML

有时候要看 `DOM元素对象` 里面的 `id`，`src` 等属性，而`console.log` 会打印出 `HTML` 文本，如：

```js
var box1 = document.getElementById("box1");
var box2 = document.querySelector('#box2');
console.log(box1);
console.log(box2);
```
其实，只要 **打印出的是一个HTMLCollections 类数组，就就可以得到 `DOM元素对象` **
```js
var boxes = [].slice.call(document.getElementsByClassName('box'));
console.log(boxes);
```
或者 **把DOM对象封装成Array的形式** 即可
```js
var messageContent = document.getElementById('messagecontent');
console.log([messageContent]);

```
另外，只有chrome有这个问题，火狐是好的，IE咱就忽略他的调试器吧。。。


# 花式找父子

```javascript
wxSelectBox.addEventListener('click', sendTo, false);

function sendTo(e) {
    sendToPhoto.src = touchImg;
    var target = e.target;
    switch (target.nodeName) {
        case "DIV":
            touchToDiv(target)
            break;
        case "SPAN":
            touchToDiv(target.parentNode)
            break;
        case "IMG":
            touchToDiv(target.parentNode)
            break;
        case "LI":
            touchToDiv(target.firstChild)
            break;
        default:
            break;
    }
}

function touchToDiv(aim) {
    if (aim.classList.contains("wx-friend-box")) {
        sendToIcon.src = aim.childNodes[1].getAttribute("src");
        tempWxChatPerson.src = aim.childNodes[1].getAttribute("src");
        tempWxChatPerson.classList.add("wxChatBox-person");
        document.getElementsByClassName('wxChatItem')[0].append(tempWxChatPerson);
        sendToPerson.innerText = aim.children[1].innerText;
        sendToName.innerText = aim.children[1].innerText;
        wxMaskStatus("show");
        sendToBoxStatus("show");
    }
}
```


## 检测变量是HTML元素对象还是Js对象

```js
试试检测 tagName 的值即可我觉得
```

## `parentNode`和`parentElement`,`childNodes`和`children`

parentElement 获取对象层次中的父对象。  
parentNode 获取文档层次中的父对象。

childNodes 获取作为指定对象直接后代的 HTML 元素和 TextNode 对象的集合。 
children 获取作为对象直接后代的 DHTML 对象的集合。 

--------------------------------------------------------
简单的来说，`childNodes` 返回后代所有节点，包括注释、文本节点，而`children`只返回 后代的`HTML`元素

## insertBefore


 父级.insertBefore（新元素，被插入的元素）；//在指定的元素前面加入一个新元素

父级.insertBefore（新元素，父级.children[0]）;　　//在第一个元素的前面插入一个元素，在IE下如果第二个参数的节点不存在，则会报错，若是其他浏览器，则会默认以appendChild的形式添加，不会报错

## 好玩的选择器
找第一个儿子，可以这样子，哈哈
```js
$("#cars-series-input").children("option:first-child").val()
```
全部在这：
```js
$("#cars-type-input").empty();
$.ajax({
  type: "POST",
  url: CONFIG.url + "/car/getCarList",
  data: {
    seriesId: $("#cars-series-input").children("option:first-child").val()
  },
  dataType: "json",
  success: function(res) {
    var data = res["data"];
    console.log(data);
    var carsTypeFragment = document.createDocumentFragment();
    var tempElement = null;
    data.forEach(element => {
      tempElement = document.createElement("option");
      tempElement.innerText = element.carName;
      tempElement.value = element.carId;
      carsTypeFragment.appendChild(tempElement);

      // carsModelSelect.brandList.push(element.name);
    });
    $("#cars-type-input").append(carsTypeFragment);
  }
});
```