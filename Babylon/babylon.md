# 1 previous
## Vector3
坐标采用 左手笛卡尔坐标

## 4种光源

```js
var light = new Babylon.HemisphericLight()
```

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
```js
new HemisphericLight(name, direction, scene)
```

光源不是必需的，材料可以自发光
## 3种主要相机
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

# 2 basic object

```js
var obj = new Babylon.Mesh.CreateSth()
```

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

## other properties
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

## object handle
1. position
```JS
obj.position.x = 20； 
```

2. rotation
```JS
obj.rotation.x = Math.PI / 6;
```

3. scaling
```JS
obj.scaling.x = 2;
obj.scaling.y = 2;
```

4. move and related
```JS
box2.parent = box3;
box2.position.z = -10;
```

# 3 Material
## 3.1 Add Material Texture
1. create
```
var materialName = new BABYLON.StandardMaterial('texture1', scene);
```

2. add material
```js
box.material = materialName;
```
## 3.2 Handle Texture
### 1. transparency
通过 alpha设置
```JS
materialName.alpha = 0.5;
```
使用了 alpha，需要声明
```JS
materialSphere1.diffuseTexture.hasAlpha = true;
```
这种情况下, alpha被用作alpha测试

### 2. diffuse 散射
材质被一个光源照亮, 散射光就是材质对象的天然色
```js
materialName.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
//或者纹理
materialName.diffuseTexture = new BABYLON.Texture("grass.png", scene);
```

可以对材质进行平移处理：
```JS
materialName.diffuseTexture.uOffset = 1.5;
materialName.diffuseTexture.vOffset = 1.5;
```

平铺和重复
```js
materialName.diffuseTexture.uScale = 5.0;
materialName.diffuseTexture.vScale = 5.0;
```


### 3. emissive 放射光
放射光决定了对象自身的颜色
```JS
materialName.emissiveColor = new BABYLON.Color3(1, .2, .7);
```

或者，指定一个纹理
```JS
materialName.emissiveTexture = new BABYLON.Texture("grass.png", scene);
```

### 4. ambient 环境光
环境光可以看做漫反射的第二层

### 5. specular
镜面光体现了一个光滑平面对光源的反射色，同上

镜面反射光的大小/强度可以通过specularPower属性来设定:

```JS
materialSphere1.specularPower = 32;
```

当使用纹理时能够设置 materialName.useGlossinessFromSpecularMapAlpha 为真, 从而使用镜面映射alpha的光泽度

默认情况下, 镜面光和alpha不相干, 但是可以设置materialSphere1.useSpecularOverAlpha 为真, 从而使alpha和镜面光成反比.


### 6.backFaceCulling 背面剔除
```JS
materialSphere1.backFaceCulling = false;
```
这个渲染速度优化的技术决定了一个图形对象上的多边形是否可见. 如果它设置为TRUE或布尔1, 则Babylon引擎不会渲染使用了该材质的网格对象的隐藏面. 默认是设置为TRUE

### 7. wireframe 线框
```JS
materialSphere1.wireframe = true;
```

# 4 Camera
>In any Babylon.js scene, you can create as many cameras as you wish, but only one camera can be active at a time (unless you are using multi-viewports).

```js
var camera = new Babylon.FreeCamera()
```

## 4.1 FreeCamera 
> FreeCamera does not automatically aim at a target, but after constructing a FreeCamera, you can easily set it to lock-on to a mesh or to a vector3 position

>Like many of our cameras, you can also add control keys, or reassign them to other keys, such as keys 'w', 'a', 's', and 'd'.

```JS
new FreeCamera(name, position, scene)
```
### Properties
1. position
2. rotation
3. speed
4. inertia
5. fov

### Members
1. ellipsoid : Vector3

2. checkCollisions : boolean

3. applyGravity : boolean

4. inputs : FreeCameraInputsManager

5. angularSensibility : number

6. keysUp : number[]
keysDown,keysLeft,keysRight 
7. onCollide : (collidedMesh: AbstractMesh) => void

### Methods
1. attachControl(element, noPreventDefault) → void

2. detachControl(element) → void

3. dispose() → void

4. getTypeName() → string


## 4.2 ArcRotateCamera
```JS
var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
//name, alpha, beta, radius, target, scene
//alpha (in radians), beta (in radians), and radius (a number)
```

> By default, (with no .alpha and .beta values set), ArcRotateCameras aim in a +x direction. Ironically, there is no rotation property on an ArcRotateCamera, but there is a position property. Because the orientation of an ArcRotateCamera is relative to its target setting, it is wise to use a handy method called setPosition() to set the camera position.

或者，创建一个空目标相机，再用`setPosition`指定瞄准目标：
```JS
 var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
camera.setPosition(new BABYLON.Vector3(0, 15, -30));
 ```
> When we use that useful setPosition() method, we need not concern ourselves with alpha, beta, and radius. We just make sure we have a target property set ( which we did in the constructor with new BABYLON.Vector3.Zero() ), and then use setPosition() to put our camera exactly where we want it, in 3D space. The handy setPosition() method does the rest. Easy.

在渲染循环中可以对激活相机设置动作进行动画：
```JS
var scene = createScene();
engine.runRenderLoop(function () {
  scene.activeCamera.alpha += .01;
  scene.render()
})
```

Ctrl + MouseLeft 可以平移相机，也可以设置为右键：
>setting useCtrlForPanning to false in the attachControl call
```JS
camera.attachControl(canvas, noPreventDefault, useCtrlForPanning);
```
或者禁止掉
```JS
scene.activeCamera.panningSensibility = 0;
```

## 4.3 其他相机
> 将被 Universal Camera 代替

### 4.3.1 TouchCamera
> TouchCamera is a camera that works closely with hand.js, and opens Babylon.js to the modern technology of DOM Gesture Events.

```js
var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, 1, -15), scene);
//name, position, scene
```
以 FreeCamera 为基础，属性和方法继承自自有相机

### 4.3.2 GamepadCamera
>This camera works closely with Babylon.js Gamepad, Gamepads, and Xbox360Pad classes. More will be written about that, soon, and nearby.
```js
// Parameters : name, position, scene
var camera = new BABYLON.GamepadCamera("Camera", new BABYLON.Vector3(0, 15, -45), scene);
```

### 4.3.3 DeviceOrientationCamera
>The DeviceOrientationCamera is a camera that is specifically designed to react-to device orientation events. Device orientation is when you tilt your modern mobile device forward or back, left or right, to control cameras or other scene items

```js
// Parameters : name, position, scene
var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 1, -15), scene);
```
除了继承 自由相机的属性和方法外，还有两个重要的独有属性：
- angularSensibility 
- moveSensibility

### 4.3.4 FollowCamera 

>This camera is specifically designed to follow any scene item with a .position... as it moves. It can be set to follow from the rear, from the front, or from any angle. Its follow distance and movement speeds can be set, as well.

绑定到一个 obj 或者一个 position `camera.lockedTarget`
```JS
// Parameters : name, position, scene
var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -45), scene);
camera.lockedTarget = myMeshObject; // target any mesh or object with a "position" Vector3
scene.activeCamera = camera;
```
其他有用属性：
```JS
camera.radius = 30; // how far from the object to follow
camera.heightOffset = 8; // how high above the object to place the camera
camera.rotationOffset = 180; // the viewing angle
camera.cameraAcceleration = 0.05 // how fast to move
camera.maxCameraSpeed = 20 // speed limit
```

### 4.3.5 VirtualJoysticksCamera
```js
// Parameters : name, position, scene
var camera = new BABYLON.VirtualJoysticksCamera("VJ_camera", new BABYLON.Vector3(0, 1, -15), scene);
```
>The VirtualJoysticksCamera also uses a FreeCamera as its basis, so all the properties and methods of our familiar FreeCamera... are found on our VirtualJoysticksCamera as well.



### 4.3.6 AnaglyphCamera 
>The AnaglyphCamera is for use with red and cyan 3D glasses. It is very new to Babylon.js, and to be honest quite sexy. It uses post-processing filtering techniques. There are actually two types of AnaglyphCamera

- AnaglyphArcRotateCamera
```js
// Parameters : name, alpha, beta, radius, target (in Vector3), eyeSpace (in degrees), scene
var camera = new BABYLON.AnaglyphArcRotateCamera("aar_cam", -Math.PI/2, Math.PI/4, 20, new BABYLON.Vector3.Zero(), 0.033, scene);
```

- AnaglyphFreeCamera
```JS
// Parameters : name, position (in Vector3), eyeSpace (in degrees), scene
var camera = new BABYLON.AnaglyphFreeCamera("af_cam", new BABYLON.Vector3(0, 1, -15), 0.033, scene);
```

### 4.3.7 VRDeviceOrientationFreeCamera 
```js
var camera = new BABYLON.VRDeviceOrientationFreeCamera ("Camera", new BABYLON.Vector3 (-6.7, 1.2, -1.3), scene, 0);
```



### 4.3.8 WebVRFreeCamera 
```js
// Parameters : name, position, scene
var camera = new BABYLON.WebVRFreeCamera("WVR", new BABYLON.Vector3(0, 1, -15), scene);
```
### 4.3.9 Universal Camera 
>the Universal Camera is now the default camera used by Babylon.js if nothing is specified


## 4.4 Input
>control the camera using keyboard/mouse on a desktop machine, using a finger/touch on a mobile device and a gamepad controller on Xbox One

```js
// First, set the scene's activeCamera... to be YOUR camera.
scene.activeCamera = myCamera;
// Then attach the activeCamera to the canvas.
scene.activeCamera.attachControl(canvas, noPreventDefault);
```
简化：
```js
myCamera.attachControl(canvas);
```
>By default noPreventDefault is set to false


# 5 lights
## 5.1 Activating/Deactivating Lights
- ` setEnabled(true/false) `
- `intensity `


## 5.2 types
### 5.2.1 PointLight
Properties:
- diffuse :漫反射
- spectular:反射颜色

```js
var light0 = new BABYLON.PointLight('pointlight', new BABYLON.Vector3(1, 10, -10), scene)
```

### 5.2.2 DirectionalLight
```js
var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
// diffuse spectular
```

### 5.2.3 SpotLight
```js
//SpotLight(name, position, direction, angle, exponent, scene)
//name  position  direction angle exponent 
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
```

>The angle defines the size (field of illumination) of the spotlight's conical beam (in radians), and the exponent defines the speed of the decay of the light with distance (the light's 'reach distance'). Just like the other lights, you can control the color of the light with the diffuse and specular properties:

### 5.2.4 HemisphericLight
var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);

提供三种反射颜色
一种颜色提供给漫反射(天空的颜色-朝上的像素/面片)，一种是给地面的 (朝下的像素/面片的颜色), 以及一种给镜面反射的.
```js
var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.groundColor = new BABYLON.Color3(0, 0, 0);
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

## 常用API
### scene
- activeCamera
- activeCameras[]






## 其他
可触控
```
camera.attachControl(canvas, true);
```

### zoom speed
```JS
camera.wheelPrecision //越大越慢
camera.pinchPrecision
camera.zoomOnFactor
JS



```tpircsavaj
/*
*POWER BY FYG
*2017
*BABYLONJS
*/
```