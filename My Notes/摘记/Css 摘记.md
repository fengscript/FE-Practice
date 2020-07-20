# BFC

> BFC中的元素的布局是不受外界的影响（我们往往利用这个特性来消除浮动元素对其非浮动的兄弟元素和其子元素带来的影响。）并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。 


# background-image 适配视口
```css
body {
  background-image: url('https://images.unsplash.com/photo-1573480813647-552e9b7b5394?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
```

# 创建三角形的背景图像
先创建两个div，然后将两个背景都添加到其中，然后，第二个div使用clip-path属性画出三角形。

```html
<body>
  <div class="day"></div>
  <div class="night"></div>
</body>

body {
  margin: 0;
  padding: 0;
}

div {
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.day {
  background-image: url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2613&q=80");
  background-size: cover;
  background-repeat: no-repeat;
}

.night {
  background-image: url("https://images.unsplash.com/photo-1493540447904-49763eecf55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  clip-path: polygon(100vw 0, 0% 0vh, 100vw 100vh);
}
```