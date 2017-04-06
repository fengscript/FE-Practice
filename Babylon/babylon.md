# previous
## 4种光源
1. PointLight
2. SpotLight
3. DirectionalLight
4. HemisphericLight

光源不是必需的，材料可以自发光
## 3种相机
1. ArcRotateCamera
2. FreeCamera
3. TouchCamera

## basic object
1. box
   BABYLON.Mesh.CreateBox()
```
var box = BABYLON.Mesh.CreateBox('box1', 2, scene)
```

2. sphere
```
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, 场景, false,  BABYLON.Mesh.DEFAULTSIDE);
```
名字, 细分段数 (高度细节或不需), 大小, 将被放到的场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向
后面两个参数可省略，为：
```
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene);
```

3. plane
```
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
名字, 大小, 和将被放到的场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向(参见下面).默认下，后两个参数可以忽略 :
```
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
```
4. disc
   规则多边形
```
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);
//名字, 半径, 边数, 场景, 可更新否和可选的朝向
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene);
```
根据边数不同可以产生各种多边形
5. cylinder
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
- 网格,光源活着相机对象的位置(.position)属性的值
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

# Tips

```
camera.attachControl(canvas, true);
```
