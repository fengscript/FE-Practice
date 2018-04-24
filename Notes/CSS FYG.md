[TOC]
# 1 颜色

## 灰度
```css
filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
        -webkit-filter: grayscale(100%);
```

# 2 选择器
# nth-child
`selector : nth-child ( n )` 选择属于 `selector`  的父元素下第 `n` 个子元素

# nth-of-type
`selector : nth-of-type ( n )` 选择属于 `selector`  的父元素下第 `n` 个元素的每个 `selector` 元素

如下：
```html
<ul class="demo">
    <p class="list">zero</p>
    <li class="list">one</li>
    <li class="list">two</li>
</ul>

<style>
.list:nth-child(2){
    color: red;     //使 one 变红
}
.list:nth-of-type(2){
    color: blue;    //使 two 变蓝
}
</style>
```

- `:nth-child( even )` 选择奇数

- `:nth-child( odd )` 选择偶数


` .class :nth-child( n )` 会选择此 `class` 的父元素中，第 `n` 个子元素
如
```html
<style>
    .nav_after:nth-child(4) {
        background-color: pink;
    }
</style>

<ul class="clearfix">
    <li>1</li>
    <li class="nav_after">2</li>
    <li>3</li>
    <li class="nav_after">4</li>
    <li>5</li>
    <li class="nav_after">6</li>
    <li>7</li>
    <li class="nav_after">8</li>
</ul>
```
便会让 `li 4` 变色，而不是让有 `nav_after` class 的第四项 `(li 8)` 变色

---


HTML结构为这样子
```html
<li class="ranking-item">
    <span class="ranking-order">1</span>
</li>
<li class="ranking-item">
    <span class="ranking-order">2</span>
</li>
<li class="ranking-item">
    <span class="ranking-order">3</span>
</li>
```
时，要给第二个 `li`的`span`， `ranking-order` 2 加样式，则需要
```css
.ranking-item:nth-child(2) .ranking-order{
    color: red;
}
```

---

伪元素 ` .class :nth-child( n )` 会选择此 `class` 的父元素中，第 `n` 个有此 `selector` 的（clsass）的元素，若第 `n` 个元素没有此 `class` ，则不会生效

同类中的所有
```html
<div class="menu-head">
  <div class="menu-item menu-item-1 menu-item-active">win 7安装教程</div>
  <div class="menu-item menu-item-2">win 10安装教程</div>
  <div class="menu-item menu-item-3">win XP安装教程</div>
  <div class="menu-item menu-item-4">其他教程</div>
</div>
```
的从第二个开始加 `margin-left`，则：
```css
.menu-item:nth-of-type(n+2){
    margin-left: 30px;
}
```


# 3 动画
## transition
### transition 多个属性而不想 all
可以连写，逗号分隔属性值，但是切记，**必须为不同的属性分配时间间隔**

## animation
```css
animation: name duration timing-function delay iteration-count direction fill-mode;
```

其中：
```css
animation-timing-function: linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n);
```


```CSS
animation: mi-text 2s  forwards;
```

`forwards` 属于 `animation-fill-mode` 属性的值

```css
animation-fill-mode : none | forwards | backwards |both; none
```
animation-fill-mode，定义动画播放时间之外的状态
- forwards	当动画完成后，保持最后一个属性值
- backwards	在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值
- both	向前和向后填充模式都被应用


比如，旋转
加 linear 就会一直转，不会在旋转周期停下来
```css
.musicControl{
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    z-index: 2001;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    -webkit-animation: rotate 6s linear infinite;
    animation: rotate 6s linear infinite;
}

@-webkit-keyframes rotate {
    from {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
    to {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
}

@keyframes rotate {
    from {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
    to {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
}
```
## `animation-play-state`
`animation-play-state` 属性规定动画正在运行还是暂停

animation-play-state: paused|running;

```css
div{
animation-play-state:paused;
-webkit-animation-play-state:paused;
}
```
js里面控制需要驼峰
```js
object.style.animationPlayState="paused"
```

# 4 布局

## 4.1 BFC (Block Formatting Context)
> BFC定义：块级格式化上下文，它是指一个独立的块级渲染区域，只有Block-level Box参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。

[参考： http://mp.weixin.qq.com/s/2T8emSpYh8PTQvudTFWGgg](#http://mp.weixin.qq.com/s/2T8emSpYh8PTQvudTFWGgg)


### 生成
满足下列CSS声明之一的元素便会生成BFC：

- 根元素或其它包含它的元素
- float的值不为none；
- overflow的值不为visible；
- position的值不为static；
- display的值为inline-block、table-cell、table-caption；
- flex boxes (元素的display: flex或inline-flex)；
> 也有人认为display: table能生成BFC，我认为最主要原因是table会默认生成一个匿名的table-cell，正是这个匿名的table-cell生成了BFC。

### 布局规则
- 内部的元素会在垂直方向一个接一个地排列，可以理解为是BFC中的一个常规流
- 元素垂直方向的距离由 `margin` 决定，即属于同一个BFC的两个相邻盒子的 `margin` 可能会发生重叠
- 每个元素的左外边距与包含块的左边界相接触(从左往右，否则相反)，即使存在浮动也是如此，这说明BFC中的子元素不会超出它的包含块
- BFC的区域不会与 `float` 元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

### 解决问题
#### 1. `margin` 叠合
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>
        margin重叠现象
    </title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        .box p {
            margin: 20px 0px;
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <div class="box">
        <p>
            Lorem ipsum dolor sit.
        </p>
        <p>
            Lorem ipsum dolor sit.
        </p>
        <p>
            Lorem ipsum dolor sit.
        </p>
    </div>
</body>
</html>
```

**在其中一个元素外面包裹一层容器，并触发该容器生成一个BFC ( 这里使用overflow:hidden )。那么两个元素便属于不同的BFC，就不会发生margin重叠了。**

```html
<div class="box">
    <p>
        Lorem ipsum dolor sit.
    </p>
    <div style="overflow:hidden;">
        <p>
            Lorem ipsum dolor sit.
        </p>
    </div>
    <p>
        Lorem ipsum dolor sit.
    </p>
</div>
```

#### 2. 清除浮动
> 当在父元素中设置overflow:hidden时就会触发BFC，所以他内部的元素就不会影响外面的布局，BFC就把浮动的子元素高度当做了自己内部的高度去处理溢出，所以外面看起来是清除了浮动。

### 3. 去掉浮动元素侵占未浮动元素
如，浮动元素会脱离文档流，然后浮盖在文档流元素上
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>
        BFC侵占浮动元素的问题
    </title>
    <style>
        .box1 {
            float: left;
            width: 100px;
            height: 100px;
            background-color: pink;
        }
        .box2 {
            width: 200px;
            height: 200px;
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <div class="box1">
        box1
    </div>
    <div class="box2">
        box2
    </div>
</body>
</html>
```

可以做如下修改，建立 BFC，
```css
.box2 {
    width: 200px;
    height: 200px;
    background-color: skyblue;
    overflow: hidden;
}
```
或者
```css
.box2 {
    width: 200px;
    height: 200px;
    background-color: skyblue;
    float:left;
}
```

# 5 字体
## text-stroke 变细字体


```css
-webkit-text-stroke: 1px gray;
```
`text-shadow` 只能往外扩散阴影，而 `text-stroke` 可是同时往字体内部和外部填充的,利用 text-stroke 这个特性，将描边的颜色设置成跟背景一样，就等于变相将字体变细了，








# 其他

## 自定义滚动条

### 去掉滚动条，还能滚动
```css
body::-webkit-scrollbar {display:none}
```


## border 画三角形

```css
.triangle{
    margin: 50px auto;
    width: 0;
    height: 0;
    border-top: 40px solid red;
    border-right: 40px solid blue;
    border-bottom: 40px solid green;
    border-left: 40px solid yellow;
}
```
然后要做朝向哪面的三角形，将另外三面的 border 颜色 transparent 即可：
```css
.triangle{
    margin: 50px auto;
    width: 0;
    height: 0;
    border-top: 40px solid red;
    border-right: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid transparent;
}
```

> 块级元素默认会在页面上水平平铺，让上边和下边也变成三角形就简单了，将元素的width属性设为 0 即可
参考：[http://www.cnblogs.com/keepfool/p/5616326.html](http://www.cnblogs.com/keepfool/p/5616326.html)


## 去掉谷歌添加的点击一片蓝
```css
* {
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}
```
## 好看的阴影
```css
box-shadow: 0 6px 8px rgba(102,119,136,0.03), 0 1px 2px rgba(102,119,136,0.3);
```


## 把 display:none 的元素 block 的同时进行动画
给 `unactive` 时候的 `class` 属性上控制 `display` ，把要进行的动画写到元素不变的样式上去就OK
```css
.imgBox {
  box-shadow: 0px 3px 8px 5px rgba(97, 97, 97, 0.3);
  border-radius: 4px;
  z-index: 20;
  width: 4.4rem;
  height: 4.4rem;
  position: absolute;
  margin: auto;
  animation: photoBoxPop .2s linear;
}

.imgBox-unActive {
  display: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}

@keyframes photoBoxPop{
  0%{
    opacity: 0;
    transform: scale(2);
  }
  60%{
    opacity: 1;
    transform: scale(0.8);
  }
  100%{
    transform: scale(1);
  }
}
```

```js
function photoBoxStatusDrag(aim, status) {
    if (status == "show") {
        imgBox.classList.remove("imgBox-unActive");
    } else {
        imgBox.classList.add("imgBox-unActive")
    }
}
```