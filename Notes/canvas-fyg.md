# 1 get rendering context
> <canvas> 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容

## getContext(param)

获得渲染上下文和它的绘画功能


# 2 shape
**METHODS:**
## rectangular

- fillRect(x, y, width, height)
绘制一个填充的矩形
- strokeRect(x, y, width, height)
绘制一个矩形的边框
- clearRect(x, y, width, height)
清除指定矩形区域，让清除部分完全透明。
- rect(x, y, width, height)
绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）



## path
- beginPath()
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- moveTo(x, y)
移动笔触
- closePath()
闭合路径之后图形绘制命令又重新指向到上下文中。
- stroke()
通过线条来绘制图形轮廓。
- fill()
通过填充路径的内容区域生成实心的图形。

`beginPath()` 是生成路径的第一步，本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。**而每次这个方法调用之后，列表清空重置，就可以重新绘制新的图形**。

`beginPath` 也会被默认设置一个 `moveTo()` ，所以，每次 `beginPath` 后，最好手动设置自己需要的 `moveTo()`

> 调用fill()时，所有没有闭合的形状都会自动闭合，不需要调用closePath()函数。但是调用stroke()时不会自动闭合。

## line
- lineTo(x, y)
绘制一条从当前位置到指定x以及y位置的直线。

## arc
- arc(x, y, radius, startAngle, endAngle, anticlockwise)
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从 `startAngle` 开始到 `endAngle` 结束，按照 `anticlockwise` 给定的方向（默认为顺时针）来生成。
- arcTo(x1, y1, x2, y2, radius)
根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

`radius` 单位为弧度 :radians=(Math.PI/180)*degrees。


```javascript
ctx_prograss.beginPath();
ctx_prograss.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
```
这之前不 `beginPath` ，画一段圆就会自动和起始点连接。

## Bézier curve
- quadraticCurveTo(cp1x, cp1y, x, y)
绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
- bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。


# 3 path2D
`Path2D()` 会返回一个新初始化的 `Path2D` 对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量）。
```javascript
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```
- Path2D.addPath(path [, transform])​
添加了一条路径到当前路径（可能添加了一个变换矩阵）

**带路径参数的stroke和fill可以把对象画在画布上**
如：
```javascript
(function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
})()
```



# 4 style
## colors
**PROPS:**
- fillStyle = color
设置图形的填充颜色。
- strokeStyle = color
设置图形轮廓的颜色。

> color 可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象
> CSS 颜色值时，可以是 `rgba` 颜色，可以是 十六进制颜色

## transpency
**PROPS:**
- globalAlpha = transparencyValue
这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 [0,1]

> rgba 色彩可以对单个图形设置透明度

## line style

- lineWidth = value
设置线条宽度。
- lineCap = type
['butt','round','square']  设置线条末端样式。
- lineJoin = type
['round','bevel','miter']  设定线条与线条间接合处的样式。
- miterLimit = value
限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
- setLineDash(segments)
接受一个数组，来指定线段与间隙的交替,设置当前虚线样式。
- lineDashOffset = value
设置虚线样式的起始偏移量。
- getLineDash()
返回一个包含当前虚线样式，长度为非负偶数的数组。




> 关于绘制的图形边缘锯齿的问题，参展一下这里：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#Line_styles
>但是我觉得依靠人力去计算，消除锯齿是不大可行的，这个问题先留在这里

> 还会取决于当前的 `lineCap` 风格，它默认为 `butt` ,通过将 `lineCap` 样式设置为 `square`，来得到与奇数宽度线的半像素坐标相一致的笔画，这样，端点轮廓的外边框将被自动扩展以完全覆盖整个像素格



## Gradients
先创建 `canvasGradient` 对象，然后 `addColorStop` 添加渐变颜色，最后赋给 `fillStyle` 或 `strokeStyle` 属性。

### lineargradient
- createLinearGradient(x1, y1, x2, y2)
createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

### radialgradient
- createRadialGradient(x1, y1, r1, x2, y2, r2)
createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

### addColorStop
- gradient.addColorStop(position, color)
position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。

最后赋给 `fillStyle` 或 `strokeStyle`
```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // Create gradients
  var lingrad = ctx.createLinearGradient(0,0,0,150);
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');

  var lingrad2 = ctx.createLinearGradient(0,50,0,95);
  lingrad2.addColorStop(0.5, '#000');
  lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;
  
  // draw shapes
  ctx.fillRect(10,10,130,130);
  ctx.strokeRect(50,50,50,50);

}
```

## pattern
- createPattern(image, type)
该方法接受两个参数。`Image` 可以是一个 `Image` 对象的引用，或者另一个 canvas对象。Type 必须是下面的字符串值之一：repeat, repeat-x, repeat-y 和 no-repeat。

使用 Image 对象的 `onload` handler 来确保设置图案之前图像已经装载完毕。
```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // 创建新 image 对象，用作图案
  var img = new Image();
  img.src = 'images/wallpaper.png';
  img.onload = function(){

    // 创建图案
    var ptrn = ctx.createPattern(img,'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0,0,150,150);

  }
}
```

## shadow
- shadowOffsetX = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

- shadowOffsetY = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
- shadowBlur = float
shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
- shadowColor = color
shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

## 填充规则
fill, clip, isPointinPath 可以选择一个填充规则，即根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。
值：
 - "nonzero": non-zero winding rule, 默认值.
 - "evenodd":  even-odd winding rule.
如
```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d'); 
  ctx.beginPath(); 
  ctx.arc(50, 50, 30, 0, Math.PI*2, true);
  ctx.arc(50, 50, 15, 0, Math.PI*2, true);
  ctx.fill("evenodd");
}
```
