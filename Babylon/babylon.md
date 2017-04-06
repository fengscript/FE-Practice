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
5. cylinder
6. torus
7. knot
8. lines
9. dashlines
10. ribbon
11. tube
12. ground

### Vector3
`BABYLON.Vector3(xValue, yValue, zValue)` 参数为浮点类型，可正负
用来设置/存储:
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
