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
# 4 布局

## BFC (Block Formatting Context)
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







# 其他

## 自定义滚动条

### 去掉滚动条，还能滚动
```css
body::-webkit-scrollbar {display:none}
```