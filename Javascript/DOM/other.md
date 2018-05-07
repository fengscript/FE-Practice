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
功能一样，但是 ==parentNode和childNodes是符合W3C标准的，可以说比较通用。而另外两个只是IE支持，不是标准，Firefox就不支持==