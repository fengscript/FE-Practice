# 1 纵览全局
[Document](http://doc.babylonjs.com/overviews/gui)
```JS
// 1 实例化
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

// 2 创建一个元素 
var panel = new BABYLON.GUI.StackPanel();
// 3 将元素绑定到实例化的对象上
advancedTexture.addControl(panel);

var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Click Me");
button.width = 0.2;
button.height = "40px";
button.color = "white";
button.background = "green";
button.onPointerDownObservable.add(function() {
    textblock.text = "Down!";
});
button.onPointerUpObservable.add(function() {
    textblock.text = "Up!";
});
button.onPointerEnterObservable.add(function() {
    textblock.text = "Enter!";
});
button.onPointerOutObservable.add(function() {
    textblock.text = "Out!";
});    
button.onPointerMoveObservable.add(function(coordinates) {
    var relative = button.getLocalCoordinates(coordinates);

    textblock.text = relative.x + ", " + relative.y;
});    
panel.addControl(button);     

var textblock = new BABYLON.GUI.TextBlock("textblock", "");
textblock.width = 0.2;
textblock.height = "40px";
textblock.color = "white";
panel.addControl(textblock);         
```

# 2 AdvancedDynamicTexture
有全屏模式和纹理模式

全屏模式将 GUI 固定在最顶层的屏幕
```JS
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
```

纹理会将 GUI 固定在 scene 中
```JS
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
```

# 3 控件
控件是对 UI 的抽象，有两种控件：纯控件、容器

控件可以添加到 AdvancedDynamicTexture 实例或容器中：
```JS
container.addControl(control);
//或者移除
container.removeControl(control);
```
或者附到一个 Mesh 上面
```JS
advancedTexture.addControl(text);  
text.linkWithMesh(ground);
```


## Container

### Rectangle
- thickness
- cornerRadius
- container.background

```javascript
var rect1 = new BABYLON.GUI.Rectangle();
rect1.width = 0.2;
rect1.height = "40px";
rect1.cornerRadius = 20;
rect1.color = "Orange";
rect1.thickness = 4;
rect1.background = "green";
advancedTexture.addControl(rect1); 
```

### Ellipse
- thickness


### StackPanel
根据方向来堆叠子对象，所有的子对象都必须有一个定义的宽、高
StackPanel 的高度（或宽度）是基于子项自动定义的。

### ColorPicker
- size

用户只要交互，就会触发 `colorPicker.onValueChangedObservable`

```js
var picker = new BABYLON.GUI.ColorPicker();
picker.value = skullMaterial.diffuseColor;
picker.height = "150px";
picker.width = "150px";
picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
picker.onValueChangedObservable.add(function(value) { // value is a color3
    skullMaterial.diffuseColor.copyFrom(value);
});
```

## Element Control
### TextBlock
用于显示文本的控件
- textWrapping
- textHorizontalAlignment
- textVerticalAlignment

```JS
var text1 = new BABYLON.GUI.TextBlock();
text1.text = "Hello world";
text1.color = "white";
text1.fontSize = 24;
advancedTexture.addControl(text1);    
```

### Button
- ImageButton
- SimpleButton
- ImageOnlyButton
 
```JS
//文本和图像
var button = BABYLON.GUI.Button.CreateImageButton("but", "Click Me", "textures/grass.png");

//只有文本
var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Click Me");

//只有图片
var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "textures/grass.png");

//
var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Click Me");
button.width = 0.2;
button.height = "40px";
button.color = "white";
button.background = "green";
advancedTexture.addControl(button);    
```

### Chcekbox
控制 ` checkbox.isChecked `

改变isChecked属性会引发一个可观察的调用checkbox.onIsCheckedChangedObservable。

属性：
- color
- background
- checkSizeRadio


```JS
var panel = new BABYLON.GUI.StackPanel();
    panel.width = "200px";
    panel.isVertical = false;
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);

    var checkbox = new BABYLON.GUI.Checkbox();
    checkbox.width = "20px";
    checkbox.height = "20px";
    checkbox.isChecked = true;
    checkbox.color = "green";
    checkbox.onIsCheckedChangedObservable.add(function(value) {
        if (skull) {
            skull.useVertexColors = value;
        }
    });
    advancedTexture.addControl(checkbox);    

    var header = new BABYLON.GUI.TextBlock();
    header.text = "use vertex colors";
    header.width = "180px";
    header.marginLeft = "5px";
    header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.color = "white";
    advancedTexture.addControl(header); 
```

### RadioButton
- color
- background
- checkSizeRadio
- group

### Line
 - x1
 - y1
 - x2
 - y2
 - dash 
    -  array of numbers	
    -  Default:Empty array	
    -  Defines the size of the dashes)
 - lineWidth

### Image
- BABYLON.GUI.Image.STRETCH_NONE: Use original size
- BABYLON.GUI.Image.STRETCH_FILL: Scale the image to fill the container (This is the default value)
- BABYLON.GUI.Image.STRETCH_UNIFORM: Scale the image to fill the container but maintain aspect ratio
- BABYLON.GUI.Image.STRETCH_EXTEND: Scale the container to adapt to the image size.


- autoScale 
    - `image.autoScale = true`
- source
    - `image.source="myimage.jpg"` 
- sourceLeft
- sourceTop
- sourceWidth
- sourceTop


```javascript
var image = new BABYLON.GUI.Image("but", "textures/grass.png");
image.width = 0.2;
image.height = "40px";
advancedTexture.addControl(image);    
```

# 4 公共属性

## general properties
所有控件共有的属性：
- alpha
- color
- fontFamily
- fontSize
- zIndex
- isVisible 


## 事件属性
序号 | 属性 | 说明
---|--- | ---
1 | onPointerMoveObservable	|当光标移动到控件上时提起。仅在全屏模式下可用
2 | onPointerEnterObservable |	当光标进入控件时提起。仅在全屏模式下可用
3 | onPointerOutObservable	|当光标离开控件时提起。仅在全屏模式下可用
4 | onPointerDownObservable	|当控件上的指针下降时触发。
5 | onPointerUpObservable	|当指针在控件上时提起。
6 | control.isHitTestVisible | 设置一个不可见的点击事件

> Please note that onPointerMoveObservable, onPointerDownObservable and onPointerUpObservable will receive a Vector2 parameter containing the pointer coordinates. If you want to get the pointer coordinates in local control space, you have to call control.getLocalCoordinates(coordinates).

## Alignments
GUI 在屏幕上的位置
如
```JS
createRectangle().horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
createRectangle().horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
```
[http://www.babylonjs-playground.com/#XCPP9Y#13](http://www.babylonjs-playground.com/#XCPP9Y#13)

## Position and size

-  left
-  top
-  width
-  height
-  paddingTop
-  paddingBottom...



### Tracking positions

`control.linkWithMesh(mesh)` 将 一个元素 附加到一个 Mesh 上
设置与 Mesh 的偏移量
- control.linkOffsetX 
- control.linkOffsetY

### Adaptive scaling
设置 GUI 元素的动态缩放
```JS
myAdvancedDynamicTexture.idealWidth = 600 
myAdvancedDynamicTexture.idealHeight = 400
```

强制使用理想尺寸
```javascript
 myAdvancedDynamicTexture.renderAtIdealSize = true.
```


### Rotation and Scaling
Property    |	Type    |	Default |	Comments
--|--|--|--
rotation    |	number  |	0   |	Value is in radians
scaleX  |	number  |	1   |	
scaleY  |	number  |	1   |	
transformCenterX    |	number  |	0.5 |	Define the center of transformation on X axis. Value is between 0 and 1
transformCenterY    |	number  |	0.5 |	Define the center of transformation on Y axis. Value is between 0 and 1

> Please be aware that transformations are done at rendering level so after all computations. This means that alignment or positioning will be done first without taking transform in account.

# 快捷函数
快速创建一个 StackPanel（基于选项的水平或垂直），并将添加您的控件加上一个TextBlock
```JS
BABYLON.GUI.Control.AddHeader(control, text, size, options { isHorizontal, controlFirst })
```