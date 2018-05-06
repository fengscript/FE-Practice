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