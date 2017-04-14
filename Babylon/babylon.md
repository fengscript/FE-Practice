# previous
## Vector3
坐标采用 左手笛卡尔坐标，大拇指指向自己为x正方向

## 4种光源
1. PointLight
```
PointLight(name, position, scene)
```

2. SpotLight
```
SpotLight(name, position, direction, angle, exponent, scene)
```


3. DirectionalLight
4. HemisphericLight

光源不是必需的，材料可以自发光
## 3种相机
1. ArcRotateCamera
```JS
ArcRotateCamera(name, alpha, beta, radius, target, scene)
```
alpha:Alpha of the ArcRotateCamera (Rotation angle around Y axis)

beta:Beta of the ArcRotateCamera (Rotation angle around X axis)

2. FreeCamera
3. TouchCamera

TargetCamera
```
TargetCamera(name, position, scene)
```

## basic object
1. box
   BABYLON.Mesh.CreateBox(name, size, scene, updatable, sideOrientation)
```
var box = BABYLON.Mesh.CreateBox('box1', 2, scene)
```

2. sphere
CreateSphere(name, segments, diameter, scene, updatable, sideOrientation)
```
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, 场景, false,  BABYLON.Mesh.DEFAULTSIDE);
```
名字, 细分段数 (高度细节或不需), 大小, 将被放到的场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向
后面两个参数可省略，为：
```
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene);
```

3. plane
CreatePlane(name, size, scene, updatable, sideOrientation) 
```
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
名字, 大小, 和将被放到的场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向(参见下面).默认下，后两个参数可以忽略 :
```
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
```
4. disc
   规则多边形
   CreateDisc(name, radius, tessellation, scene, updatable, sideOrientation) 
```
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);
//名字, 半径, 边数, 场景, 可更新否和可选的朝向
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene);
```
根据边数不同可以产生各种多边形
5. cylinder
CreateCylinder(name, height, diameterTop, diameterBottom, tessellation, subdivisions, scene, updatable, sideOrientation) 
```
var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, 场景, false, BABYLON.Mesh.DEFAULTSIDE);
//名称, 高度, 顶直径, 底直径, 边数, 高向细分度, 场景, 可更新否和可选的朝向

var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene);
```
哈，圆锥
```
BABYLON.Mesh.CreateCylinder("cylinder", 3, 0, 3, 40, 2, scene);
```

6. torus
   环面体
```
var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false, BABYLON.Mesh.DEFAULTSIDE);

名称, 直径, 厚度, 边数, 场景, 可更新否和可选的朝向
var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene);
```
7. knot
   结
```
var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene, false, BABYLON.Mesh.DEFAULTSIDE);
名称, 半径, tube, 半径上分段数, tubularSegments, p, q, 场景, 可更新否和可选的朝向

var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
```
8. lines
```
var lines = BABYLON.Mesh.CreateLines("lines", [
    new BABYLON.Vector3(-10, 0, 0),
    new BABYLON.Vector3(10, 0, 0),
    new BABYLON.Vector3(0, 0, -10),
    new BABYLON.Vector3(0, 0, 10)
], scene);

名称, [向量数组], 场景
```
9. dashlines
```
var dashedlines = BABYLON.Mesh.CreateDashedLines("dashedLines", [v1, v2, ... vn], dashSize, gapSize, dashNb, 场景);
名称, [三元向量数组], 划线大小, 间隙大小, 段划线数, 场景
```
10. ribbon
```
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
名称, 路径数组, 闭合数组, 闭合路径, 偏移量, 场景, 可更新否?(如果网格之后要被修改) 和可选的朝向
```
11. tube
12. ground

```
var ground = BABYLON.Mesh.CreateGround("ground", 6, 6, 2, scene);
名称, 宽度, 纵深, 子分段数, 场景
```

### 可更新
这个参数, 在每个网格创建方法里出现，告知该网格在创建后是否可以被更新. 如果为 false (默认值), 则该网格数仅仅往GPU传送一次. 如果为 true, 则该网格数据可以被重新计算并在每帧刷新时传递给GPU.

### 朝向
当一个网格被创建时, 可以为其提供一个可选的朝向. 该朝向被用来提供可见性而且/或则光反射性.
- BABYLON.Mesh.FRONTSIDE
- BABYLON.Mesh.BACKSIDE
- BABYLON.Mesh.DOUBLESIDE
- BABYLON.Mesh.DEFAULT 这是默认值, 当前同 FRONTSIDE

### Vector3
`BABYLON.Vector3(xValue, yValue, zValue)` 参数为浮点类型，可正负
用来设置/存储:4
- 网格,光源或者相机对象的位置(.position)属性的值
- 网格对象的旋转(.rotation)属性的值
- 网格对象的缩放(.scaling)属性的值
- 光源对象的方向(.direction)属性的值

使用旋转时，用弧度单位：
```
box.rotation = new BABYLON.Vector3(Math.PI/4, 0, 0);
//旋转 约 45度
// Math.PI/2  = 90度  
```

### Color3

`BABYLON.Color3(红, 绿, 蓝)`
采用rgb颜色

## Material
1. create
```
var materialName = new BABYLON.StandardMaterial('texture1', scene);
```

2. add material
```js
box.material = materialName;
materialName.alpha = 0.5;
```

3. diffuse
材质被一个光源点亮, 散射光就是材质对象的天然色
```js
materialName.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
//或者纹理
materialName.diffuseTexture = new BABYLON.Texture("grass.png", scene);
```







# Tips
## 1 预处理
### 对文档、容器做处理：
```css
html, body{
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0
}
#box{
width: 100%;
height: 100%;
touch-action: none;

}
```

### 渲染过程
1. 获取canvas，初始化引擎
new BABYLON.Engine(canvas, antialies, options, adaptToDeviceRatio);
```JS
  var engine = new BABYLON.Engine(canvas, true);
```

2. 创建场景类
```js
var createScene = function(){
    var scene = new BABYLON.Scene(engine);
    // increament
    // ...
    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(canvas, true);
    return scene;
}
```

3. 实例化场景
```JS
var scene = createScene();
```

4. 渲染
```JS
engine.runRenderLoop(function () {
  scene.render()
})

window.addEventListener('resize', function () {
  engine.resize()
})

```

## 常用属性
### position





## 其他
可触控
```
camera.attachControl(canvas, true);
```
