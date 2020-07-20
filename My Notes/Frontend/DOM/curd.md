# CURD

## 增

append 和 appendChild

```javascript
element.parentNode.appendChild(element);
```

- parentNode.append()
  - 可以同时传入多个节点或字符串，没有返回值； >IE9
- Node.appendChild()
  - 只能传一个节点，且不直接支持传字符串(需要 parentNode.appendChild(document.createTextElement('字符串'))代替)，返回追加的 Node 节点

https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/append

插一句， `append` 我觉得不敢乱用，IE9 以下不支持，以防万一。。。

### `data-`

获取图片的 `src`，需要 `e.getAttribute('src')`，不然直接 `e.src` 取到的是带主机地址的值：
`http://127.0.0.1:8080/3ds/app/smartsan_onestep/[object%20HTMLImageElement]`

对于 h5 `dataset` 新属性要添加，需要用 `setAttribute()`

取的时候，可以`getAttribute` ，也可以从元素的 `dataset` 里面读取

# console.log 出来是 HTML

有时候要看 `DOM元素对象` 里面的 `id`，`src` 等属性，而`console.log` 会打印出 `HTML` 文本，如：

```js
var box1 = document.getElementById("box1");
var box2 = document.querySelector("#box2");
console.log(box1);
console.log(box2);
```

其实，只要 **打印出的是一个 HTMLCollections 类数组，就就可以得到 `DOM元素对象` **

```js
var boxes = [].slice.call(document.getElementsByClassName("box"));
console.log(boxes);
```

或者 **把 DOM 对象封装成 Array 的形式** 即可

```js
var messageContent = document.getElementById("messagecontent");
console.log([messageContent]);
```

另外，只有 chrome 有这个问题，火狐是好的，IE 咱就忽略他的调试器吧。。。

# 花式找父子

```javascript
wxSelectBox.addEventListener("click", sendTo, false);

function sendTo(e) {
  sendToPhoto.src = touchImg;
  var target = e.target;
  switch (target.nodeName) {
    case "DIV":
      touchToDiv(target);
      break;
    case "SPAN":
      touchToDiv(target.parentNode);
      break;
    case "IMG":
      touchToDiv(target.parentNode);
      break;
    case "LI":
      touchToDiv(target.firstChild);
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
    document.getElementsByClassName("wxChatItem")[0].append(tempWxChatPerson);
    sendToPerson.innerText = aim.children[1].innerText;
    sendToName.innerText = aim.children[1].innerText;
    wxMaskStatus("show");
    sendToBoxStatus("show");
  }
}
```

## 检测变量是 HTML 元素对象还是 Js 对象

```js
试试检测 tagName 的值即可我觉得
```

## `parentNode`和`parentElement`,`childNodes`和`children`

parentElement 获取对象层次中的父对象。  
parentNode 获取文档层次中的父对象。

childNodes 获取作为指定对象直接后代的 HTML 元素和 TextNode 对象的集合。
children 获取作为对象直接后代的 DHTML 对象的集合。

---

简单的来说，`childNodes` 返回后代所有节点，包括注释、文本节点，而`children`只返回 后代的`HTML`元素

## insertBefore

父级.insertBefore（新元素，被插入的元素）；//在指定的元素前面加入一个新元素

父级.insertBefore（新元素，父级.children[0]）;　　//在第一个元素的前面插入一个元素，在 IE 下如果第二个参数的节点不存在，则会报错，若是其他浏览器，则会默认以 appendChild 的形式添加，不会报错

## 好玩的选择器

找第一个儿子，可以这样子，哈哈

```js
$("#cars-series-input")
  .children("option:first-child")
  .val();
```

全部在这：

```js
$("#cars-type-input").empty();
$.ajax({
  type: "POST",
  url: CONFIG.url + "/car/getCarList",
  data: {
    seriesId: $("#cars-series-input")
      .children("option:first-child")
      .val()
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

# element check

1. window.onload

```js
window.onload = function() {
  //
};
```

2. querySelectorAll.length
3. node.contains

```js
const getTargetElement = () =>
  document.body.contains(document.querySelectorAll(".list-box li a")[0]);
```

4. mutations

https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver

```js
// callback executed when canvas was found
function handleCanvas(canvas) { ... }

// set up the mutation observer
var observer = new MutationObserver(function (mutations, me) {
  // `mutations` is an array of mutations that occurred
  // `me` is the MutationObserver instance
  var canvas = document.getElementById('my-canvas');
  if (canvas) {
    handleCanvas(canvas);
    me.disconnect(); // stop observing
    return;
  }
});

// start observing
observer.observe(document, {
  childList: true,
  subtree: true
});
```

```js
// Select the node that will be observed for mutations
let targetNode = document.querySelector(`#id`);

// Options for the observer (which mutations to observe)
let config = {
  attributes: true,
  childList: true,
  subtree: true
};

// Callback function to execute when mutations are observed
const mutationCallback = mutationsList => {
  for (let mutation of mutationsList) {
    let type = mutation.type;
    switch (type) {
      case "childList":
        console.log("A child node has been added or removed.");
        break;
      case "attributes":
        console.log(`The ${mutation.attributeName} attribute was modified.`);
        break;
      case "subtree":
        console.log(`The subtree was modified.`);
        break;
      default:
        break;
    }
  }
};

// Create an observer instance linked to the callback function
let observer = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();
```

5. Observable (obsolete)
   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/observe

# property & attribute

https://www.cnblogs.com/elcarim5efil/p/4698980.html



Attribute:

- DOM对象初始化时会在创建默认的基本property；

- 只有在HTML标签中定义的attribute才会被保存在property的**attributes**属性中；

  每一个DOM对象都会有它默认的基本属性，而在创建的时候，它只会创建这些基本属性，我们在TAG标签中自定义的属性是不会**直接**放到DOM中的。

- attribute会初始化property中的同名属性，但自定义的attribute不会出现在property中；

  DOM有其默认的基本属性，而这些属性就是所谓的**“property”**，无论如何，它们都会在初始化的时候再DOM对象上创建。

  如果在TAG对这些属性进行赋值，那么这些值就会作为初始值赋给DOM的同名property。

- attribute的值都是**字符串**；

- ==attributes是属于property的一个子集，它保存了HTML标签上定义属性。==

  

  如果再进一步探索attitudes中的每一个属性，会发现它们并不是简单的对象，它是一个Attr类型的对象，拥有NodeType、NodeName等属性



Property:

- property是DOM中的属性，是JavaScript里的对象；

- **property能够从attribute中得到同步**；
- **attribute不会同步property上的值**；
- attribute和property之间的数据绑定是单向的，attribute->property；
- 更改property和attribute上的任意值，都会将更新反映到HTML页面中；



setAttribute是直接写入到标签里的属性中。其他方式并没有体现在标签的属性中



## Set

input.setAttribute() 设置的值会到 dom js 对象的  `defaultValue` 上 ==（input.value 是空值）==

input.value=xxx 设置的会直接到 attribute 的 value 上，



### 自定义

input.xxx: 设置的 getAttribute 读到 null

input.setAttribute(‘xxx’, ‘') 设置的直接会到dom上， input.xxx 读到 undefined



## 特殊值

**href:**

property中的href永远保存绝对路径，而attribute中的href则是保存相对路径。



**id**：

property <=> attribute



**disabled**：

如 

<input value="1" disabled='disabled'>

input.disabled / getAttribute(‘disabled’) 都能得到 true

`input.disabled = false;` 或者  `removeAttribute（'disabled’)` 可以获得：

```js
input.disabled //false
input.getAttribute(‘disabled’) // false
```

而 `setAttribute（'disabled’, false)` 并不行







比如给 input 赋值，两种：

```js
input.value=200;
input.setAttribute('value',300);
```



> attribute
>
> input节点有很多特性(attribute)：‘type’,’id’,’value’,’class’以及自定义属性，在DOM中有setAttribute()和getAttribute()读写DOM树节点的特性(attribute)
>
> PS:在这里的getAttribute方法有一个潜规则，部分属性（input的value和checked）通过getAttribut取到的是初始值
>
> 
>
> property
>
> javascript获取到的DOM节点对象，可以将他看作为一个基本的js对象，这个对象包括很多属性(property)，比如“value”，“className”以及一些方法，setAttribute,getAttribute,onclick等，值得注意的是对象的value的属性(property)取值是跟着输入框内的当前值一起更新的
>
> 