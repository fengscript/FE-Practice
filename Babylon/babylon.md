# 1 previous
## Vector3
坐标采用 左手笛卡尔坐标

注意每次设定坐标，必须 new 出来 Vector3()

## 4种常用光源

```js
var light = new Babylon.HemisphericLight()
```

1. PointLight
```JS
PointLight(name, position, scene)
```
如
```JS
var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```
2. SpotLight
```JS
SpotLight(name, position, direction, angle, exponent, scene)
```
> The angle defines the size (field of illumination) of the spotlight's conical beam (in radians), and the exponent defines the speed of the decay of the light with distance (the light's 'reach distance'). Just like the other lights, you can control the color of the light with the diffuse and specular properties:
如
```JS
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```
3. DirectionalLight
```js
new DirectionalLight(name, direction, scene)
```
如
```js
var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```
4. HemisphericLight
```js
new HemisphericLight(name, direction, scene)
```
如
```JS
var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.groundColor = new BABYLON.Color3(0, 0, 0);
```
光源不是必需的，材料可以自发光
## 3种主要相机
1. ArcRotateCamera
```js
ArcRotateCamera(name, alpha, beta, radius, target, scene)
```
alpha:Alpha of the ArcRotateCamera (Rotation angle around Y axis)

beta:Beta of the ArcRotateCamera (Rotation angle around X axis)

2. FreeCamera
```
FreeCamera(name, position, scene)
```
3. TargetCamera

```
TargetCamera(name, position, scene)
```

# 2 basic object

```js
var obj = new Babylon.Mesh.CreateSth()
```

1. box
   BABYLON.Mesh.CreateBox(name, size, scene, updatable, sideOrientation)
```js
var box = BABYLON.Mesh.CreateBox('box1', 2, scene)
```

2. sphere
CreateSphere(name, segments, diameter, scene, updatable, sideOrientation)
```js
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, 场景, false,  BABYLON.Mesh.DEFAULTSIDE);
```
名字, 细分段数 (高度细节或不需), 大小, 将被放到的场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向
后面两个参数可省略，为：
```js
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
```js
var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, 场景, false, BABYLON.Mesh.DEFAULTSIDE);
//名称, 高度, 顶直径, 底直径, 边数, 高向细分度, 场景, 可更新否和可选的朝向

var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene);
```
哈，圆锥
```js
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
```js
obj.position.x = 20； 
```

2. rotation
```js
obj.rotation.x = Math.PI / 6;
```

3. scaling
```js
obj.scaling.x = 2;
obj.scaling.y = 2;
```

4. move and related
```js
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
```js
materialName.alpha = 0.5;
```
使用了 alpha，需要声明
```js
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
```js
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
```js
materialName.emissiveColor = new BABYLON.Color3(1, .2, .7);
```

或者，指定一个纹理
```js
materialName.emissiveTexture = new BABYLON.Texture("grass.png", scene);
```

### 4. ambient 环境光
环境光可以看做漫反射的第二层

### 5. specular
镜面光体现了一个光滑平面对光源的反射色，同上

镜面反射光的大小/强度可以通过specularPower属性来设定:

```js
materialSphere1.specularPower = 32;
```

当使用纹理时能够设置 materialName.useGlossinessFromSpecularMapAlpha 为真, 从而使用镜面映射alpha的光泽度

默认情况下, 镜面光和alpha不相干, 但是可以设置materialSphere1.useSpecularOverAlpha 为真, 从而使alpha和镜面光成反比.


### 6.backFaceCulling 背面剔除
```js
materialSphere1.backFaceCulling = false;
```
这个渲染速度优化的技术决定了一个图形对象上的多边形是否可见. 如果它设置为TRUE或布尔1, 则Babylon引擎不会渲染使用了该材质的网格对象的隐藏面. 默认是设置为TRUE

### 7. wireframe 线框
```js
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

```js
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
```js
var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
//name, alpha, beta, radius, target, scene
//alpha (in radians), beta (in radians), and radius (a number)
```

> By default, (with no .alpha and .beta values set), ArcRotateCameras aim in a +x direction. Ironically, there is no rotation property on an ArcRotateCamera, but there is a position property. Because the orientation of an ArcRotateCamera is relative to its target setting, it is wise to use a handy method called setPosition() to set the camera position.

或者，创建一个空目标相机，再用`setPosition`指定瞄准目标：
```js
 var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
camera.setPosition(new BABYLON.Vector3(0, 15, -30));
 ```
> When we use that useful setPosition() method, we need not concern ourselves with alpha, beta, and radius. We just make sure we have a target property set ( which we did in the constructor with new BABYLON.Vector3.Zero() ), and then use setPosition() to put our camera exactly where we want it, in 3D space. The handy setPosition() method does the rest. Easy.

在渲染循环中可以对激活相机设置动作进行动画：
```js
var scene = createScene();
engine.runRenderLoop(function () {
  scene.activeCamera.alpha += .01;
  scene.render()
})
```

Ctrl + MouseLeft 可以平移相机，也可以设置为右键：
>setting useCtrlForPanning to false in the attachControl call
```js
camera.attachControl(canvas, noPreventDefault, useCtrlForPanning);
```
或者禁止掉
```js
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
```js
// Parameters : name, position, scene
var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -45), scene);
camera.lockedTarget = myMeshObject; // target any mesh or object with a "position" Vector3
scene.activeCamera = camera;
```
其他有用属性：
```js
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
```js
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
一个定向光是通过一个方向定义的,但是朝向一个特别的方向发射, 并且具有无限的范围. 默认情况，定向光建立在原点(0,0,0)的位置
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

### default arguments
```js
var light0 = new BABYLON.SpotLight("", new BABYLON.Vector3.Zero(), new BABYLON.Vector3.Zero(), 0, 0, scene);
light0.name = "My Slowly and Discretely Constructed Spot Light"
light0.position = new BABYLON.Vector3(0, 30, -10);
light0.direction = new BABYLON.Vector3(0, -1, 0);
light0.angle = 0.8;
light0.exponent = 2;
light0.intensity = 0.5;
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.setEnabled(1);
```
如上，所有参数都可以在设置一个“0”光源以后再进行设置

### Normals and Backfaces

>when a standard Babylon.js plane has its backface lit (the left plane), the lights have no affect, because its normals are not facing toward the lights. Conversely, when a standard plane has its frontface lit (the right plane), both lights work perfectly to light the plane, because its normals are facing toward the lights.

# 6 Animation

## 6.1 Basic Animation

```js
/*PARAMS
* 1 name
* 2 property concerned. This can be any mesh property, depending upon what you want to change. Here we want to scale an object on the X axis, so it will be “scaling.x”.
* 3 Frames per second requested: highest FPS possible in this animation.
* 4 Type of change
* 5 Type of behavior
*
*
* new Animation(name, targetProperty, framePerSecond, dataType, loopMode, enableBlending)
*/

// 创建一个动画对象
var animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

// 创建一个动作序列
  // 关键帧属性必须为 frame, value
var keys = []; 
  keys.push({
    frame: 0,
    value: 0
  });

  keys.push({
    frame: 50,
    value: Math.PI
  });

  keys.push({
    frame: 100,
    value: Math.PI*2
  });

// 动作序列绑定到动画对象
animationBox.setKeys(keys);

// 动画对象链接到物体对象
box1.animations = [];
box1.animations.push(animationBox);

//启动动画
scene.beginAnimation(box1, 0, 100, true);
```
**beginAnimation**
```js
//默认 (target, from, to, animatable)
beginAnimation(target, from, to, loop, speedRatio, onAnimationEnd, animatable)
```




**targetProperty**
- ratation
  - ratotion.x
- scaling
  - scaling.x

参数4：
- BABYLON.Animation.ANIMATIONTYPE_FLOAT (a translation)
- BABYLON.Animation.ANIMATIONTYPE_VECTOR2 (a direction)
- BABYLON.Animation.ANIMATIONTYPE_VECTOR3
- BABYLON.Animation.ANIMATIONTYPE_QUATERNION
- BABYLON.Animation.ANIMATIONTYPE_MATRIX
- BABYLON.Animation.ANIMATIONTYPE_COLOR3

参数5：
- BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE  (Use previous values and increment it)
- BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE (Restart from initial value)
- BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT  (Keep their final value)

返回一个 BABYLON.Animatable ，可以通过 getAnimatableByTarget() 来控制单独动画，也可以通过 BABYLON.Animatable  对象的 scene.getAnimatableByTarget() 提供目标对象


支持以下方法：
* pause()
* restart()
* stop()
* reset()

```js
var newAnimation = scene.beginAnimation(box1, 0, 100, true);
//then pause:
newAnimation.pause();
```
会应用到可动画对象数组 `._animations` 中的每一个动画对象上，也可以通过 `scene.getAnimatableByTarget()` 来获取最近运行的可动画对象，然后再进行处理。


## 6.2 控制动画
>Each Animation has a property called `currentFrame` that indicates the current animation key.
对于高级的关键帧动画, 你也可以定义个函数实现在键之间插入过度效果. 默认情况下,这个函数如下:

```js
BABYLON.Animation.prototype.floatInterpolateFunction = function (startValue, endValue, gradient) {
  return startValue + (endValue - startValue) * gradient;
};

BABYLON.Animation.prototype.quaternionInterpolateFunction = function (startValue, endValue, gradient) {
  return BABYLON.Quaternion.Slerp(startValue, endValue, gradient);
};

BABYLON.Animation.prototype.vector3InterpolateFunction = function (startValue, endValue, gradient) {
  return BABYLON.Vector3.Lerp(startValue, endValue, gradient);
};

```

## 6.3 快速动画
```js
//CreateAndStartAnimation(name, node, targetProperty, framePerSecond, totalFrame, from, to, loopMode, easingFunction, onAnimationEnd) 

// loopMode = 0（不循环） 或者1（循环）


// 必选参数创建
// Animation.CreateAndStartAnimation = function(name, mesh, targetProperty, framePerSecond, totalFrame, from, to, loopMode);


BABYLON.Animation.CreateAndStartAnimation('boxscale', box1, 'scaling.x', 30, 120, 1.0, 1.5);
```
* 动画需要有预定义的关键帧 (仅有2个关键帧被创建:开始和结束)
* 动画仅在 AbstractMesh 对象上有效
* 动画在该函数调用后立即播放


## 6.4 动画合成
从 v 2.3+ 可以使用 `enableBlending = true` 开始一个动画。这个动画会被从最近动画的开始状态插入
```js

    // Creation of a basic animation with box 1
    //----------------------------------------

    var animationBox = new BABYLON.Animation("tutoAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // Animation keys
    var keys = [];
    keys.push({
        frame: 0,
        value: 0
    });

    keys.push({
        frame: 20,
        value: 10
    });

    keys.push({
        frame: 100,
        value: -20
    });

    animationBox.setKeys(keys);

    box1.animations.push(animationBox);

    scene.beginAnimation(box1, 0, 100, true);
	
	// Blending animation
    var animation2Box = new BABYLON.Animation("tutoAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
	BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
																
	animation2Box.enableBlending = true;
	animation2Box.blendingSpeed = 0.01;
    // Animation keys
    var keys = [];
    keys.push({
        frame: 0,
        value: 0
    });

    keys.push({
        frame: 20,
        value: 10
    });

    keys.push({
        frame: 100,
        value: -30
    });

    animation2Box.setKeys(keys);
	
	document.getElementById("fpsLabel").addEventListener("click", function () {
		animation2Box.reset();
		scene.stopAnimation(box1);
		scene.beginDirectAnimation(box1, [animation2Box], 0, 100, true);
	});


```

## 6.5 缓动函数
babylon 提供的缓动函数：
* BABYLON.CircleEase()
* BABYLON.BackEase(amplitude)
* BABYLON.BounceEase(bounces, bounciness)
* BABYLON.CubicEase()
* BABYLON.ElasticEase(oscillations, springiness)
* BABYLON.ExponentialEase(exponent)
* BABYLON.PowerEase(power)
* BABYLON.QuadraticEase()
* BABYLON.QuarticEase()
* BABYLON.QuinticEase()
* BABYLON.SineEase()

可以使用 `EasingMode` 属性来改变缓动函数的进出行为：
* BABYLON.EasingFunction.EASINGMODE_EASEIN
* BABYLON.EasingFunction.EASINGMODE_EASEOUT
* BABYLON.EasingFunction.EASINGMODE_EASEINOUT

```js
var animationTorus = new BABYLON.Animation("torusEasingAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

var nextPos = torus.position.add(new BABYLON.Vector3(-80, 0, 0));

var keysTorus = [];
keysTorus.push({ frame: 0, value: torus.position });
keysTorus.push({ frame: 120, value: nextPos });
animationTorus.setKeys(keysTorus);

// Creating an easing function
var easingFunction = new BABYLON.CircleEase();

// For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

// Adding the easing function to the animation
animationTorus.setEasingFunction(easingFunction);

// Adding animation to my torus animations collection
torus.animations.push(animationTorus);

//Finally, launch animations on torus, from key 0 to key 120 with loop activated
scene.beginAnimation(torus, 0, 120, true);
```
<http://www.babylonjs-playground.com/#2BLI9T#2>
## 6.6 绑定事件
```js
// 3 parameters to create an event:
// - The frame at which the event will be triggered
// - The action to execute
// - A boolean if the event should execute only once (false by default)
var event1 = new BABYLON.AnimationEvent(50, function() { console.log("Yeah!"); }, true);
// Attach your event to your animation
animation.addEvent(event1);
```
### targetProperty API
- rotation.x
- scaling.x

## 事件钩子
* onDisposeObservable
* onReadyObservable
* onBeforeRenderObservable
* onAfterRenderObservable
* onReadyObservable
* onBeforeCameraRenderObservable
* onAfterCameraRenderObservable
* onNewCameraAddedObservable
* onCameraRemovedObservable
* onNewLightAddedObservable
* onLightRemovedObservable
* onNewGeometryAddedObservable
* onGeometryRemovedObservable
* onNewMeshAddedObservable
* onMeshRemovedObservable
* onRenderingGroupObservable


## 渲染生命周期

```js
scene.onDispose = function(){
  //do something
}
```
- onDispose 场景配置完成后执行
- beforeRender  场景渲染之前执行
- afterRender 场景渲染之后执行
- beforeCameraRender 相机渲染之后触发
- afterCameraRender
- registerBeforeRender

## 鼠标事件
### 属性

* pointerDownPredicate : (Mesh: AbstractMesh)
* pointerUpPredicate : (Mesh: AbstractMesh)
* pointerMovePredicate : (Mesh: AbstractMesh)

### 方法
* onPointerMove : (evt: PointerEvent, pickInfo: PickingInfo)
* onPointerDown : (evt: PointerEvent, pickInfo: PickingInfo)
* onPointerUp : (evt: PointerEvent, pickInfo: PickingInfo)
* onPointerPick : (evt: PointerEvent, pickInfo: PickingInfo)
* onPrePointerObservable : Observable<PointerInfoPre>
* onPointerObservable : Observable<PointerInfo>

## pick
`scene.pick`

```js
var pickResult = scene.pick(scene.pointerX, scene.pointerY);

if (pickResult.hit) {
  var diffX = pickResult.pickedPoint.x - box.position.x;
  var diffY = pickResult.pickedPoint.z - box.position.z;
  box.rotation.y = Math.atan2(diffX,diffY);			          
}	
```

pick
```js
pick(x, y, predicate, fastCheck, camera) → PickingInfo
```
PickingInfo
* hit : boolean
* distance : number
* pickedPoint : Vector3
* pickedMesh : AbstractMesh
* bu : number
* bv : number
* faceId : number
* subMeshId : number
* pickedSprite : Sprite

Methods
* getNormal(useWorldCoordinates, useVerticesNormals) → Vector3
* getTextureCoordinates() → Vector2
<http://doc.babylonjs.com/classes/2.5/pickinginfo>

# 7 Sprites
> 精灵用来存储、管理带有 alpha 通道的2d图片，显示动画、粒子效果以及模拟复杂的三维对象

## 7.1 Sprites manager
>  只要使用精灵，就必须创建一个管理器

```js
// Create a sprite manager
//PARAMS
//name, resours, capacity, cell size, aim scene
var spriteManagerTrees = new BABYLON.SpriteManager("treesManagr", "Assets/Palm-arecaceae.png", 1, 800, scene);
```
> 每个图片包含的 sprites 必须存储在 64像素 的方块中

## 7.2 Create instance
创建实例，链接到管理器
```js
var tree = new BABYLON.Sprite("tree", spriteManagerTrees);
```

特殊属性：
- .size
- .angle
- invertU
- weight
- height

```js
player.size = 0.3;
player.angle = Math.PI/4;
player.invertU = -1;
```

## 7.2 Sprite animation
加载一个集合了所有动画图像的图片，就可以利用 `sprite` 进行动画

开始动画：
```js
// (start， end， loop， delay between frames)
player.playAnimation(0, 43, true, 100);
```

定位到任何一帧 `cellIndex` ：
```js
player.cellIndex = 44;
```

# 8 碰撞
## 8.1 重力、相机碰撞
定义和使用：
```js
/* 1 定义 G 并应用到一个已定义相机 */
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
camera.applyGravity = true; 

/*  2 定义一个椭圆包围相机来代表观察者视角 */
// 默认值为 (0.5, 1, 0.5)
camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)

/* 3 应用碰撞*/

// 开启碰撞检测
scene.collisionsEnabled = true;
camera.checkCollisions = true;
//声明要和相机碰撞的对象
ground.checkCollisions = true;
box.checkCollisions = true;
```

### 8.2 物体碰撞
物体间碰撞通过 `mesh.ellipsoid` 属性 和 `mesh.moveWithCollisions(velocity)` 方法

或者通过 `mesh.ellipsoidOffset` 在网格上移动椭圆镜头
```js
var speedCharacter = 8;
var gravity = 0.15;
var character = Your mesh;

character.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
character.ellipsoidOffset = new BABYLON.Vector3(0, 1.0, 0);

var forwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
forwards.negate();
character.moveWithCollisions(forwards);
// or
var backwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, -gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
character.moveWithCollisions(backwards);
```

#### Arc相机检测
ArcRotateCamera 也可以检测碰撞：
但是碰撞发生时，相机不会移动
```js
// 激活
camera.checkCollisions = true
camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5)
```



####  优化
v2.1+ 允许将碰撞检测的计算转移到 Web Worker中：
```js
scene.workerCollisions = true|false
```

### 8.3 交叉碰撞
#### 8.3.1 交叉网格
使用 `intersectsMesh()` 进行判断
```js
// intersectsMesh(mesh, precision{boolean}) 
if (balloon1.intersectsMesh(plan1, false)) {
  balloon1.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
} else {
  balloon1.material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
}
```
为减少检测碰撞的计算开销，会在物体周围创建一个沙盒进行检测。

 `intersectsMesh()` 的第二个参数，进行精确性检测，若开启，会以周围 OBB 碰撞沙盒来计算自己的碰撞空间，否则采用 AABB 碰撞沙盒检测，会消耗更多资源，蛋是在旋转了一定角度的网格中很有用

#### 8.3.2 交叉点

```js
var pointToIntersect = new BABYLON.Vector3(10, -5, 0);
if (balloon3.intersectsPoint(pointToIntersect)){
  balloon3.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
}
```

### 8.4 拾取碰撞

```js
window.addEventListener("click", function () {
   // We try to pick an object
   var pickResult = scene.pick(scene.pointerX, scene.pointerY);
}),

```

`pickResult` 对象主要包含四种信息：
- hit(boolean)
- distance  点击处和被激活相机间的距离
- pickedMesh(BABYLON.Mesh)
- pickedPoint(BABYLON.Vector3) 

如：
```js
 scene.onPointerDown = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
            impact.position.x = pickResult.pickedPoint.x;
            impact.position.y = pickResult.pickedPoint.y;
        }
    };
```
#### 高级拾取特征
`pickResult` 包含的其他信息：
- faceId ：拾取面的索引位置，存在一个索引数组：
    ```js
    var indices = pickResult.pickedMesh.getIndices();
    var index0 = indices[pickResult.faceId * 3];
    var index1 = indices[pickResult.faceId * 3 + 1];
    var index2 = indices[pickResult.faceId * 3 + 2];
    ```
- submeshId  ：拾取网格里的子网格ID
- bu 和 bv ：拾取面的重心坐标
- getTextureCoordinates() ：计算拾取点的纹理坐标, 返回纹理空间的二维向量（0-1）


## AABB 和 OBB
AABB碰撞检测
axially aligned bounding box(轴对齐矩形边界框)

轴对齐矩形边界框有一个限制，就是它的边必须垂直于坐标轴


OBB碰撞检测
OBB（Oriented Bounding Box）也称作有向包围盒


AABB包围盒与OBB包围盒的最直接的区别就是，AABB包围盒是不可以旋转的，而OBB包围盒是可以旋转的，也就是有向的。

二维场景AABB碰撞检测具有如下规则：
物体A与物体B分别沿两个坐标轴做投影，只有在两个坐标轴都发生重叠的情况下，两个物体才意味着发生了碰撞。

三维物体的AABB包围盒的八个顶点依旧可以用两个顶点来标识，如图：
<http://note.youdao.com/noteshare?id=b783463a6d11035eb502de5ea141104e&sub=1B23909B11F145D49E0805C6DD04B8A6>
只要确定了图中黑色点部分的坐标，就可以确定八个顶点的全部信息了。


# 9 Raycasts
<http://www.babylonjs-playground.com/#KNE0O#4>
检测物体和 细线之间的碰撞或相交。
可以想象成物体无间断的发射看不见的激光，碰到目标或者障碍物，则触发动作

首先要 `box.isPickable = false`，因为射线起点要设置在box内部

一条射线需要 起点、方向、长度
```js
var forward = new BABYLON.Vector3(0,0,1);        
    forward = vecToLocal(forward, box);

    var direction = forward.subtract(origin);
    direction = BABYLON.Vector3.Normalize(direction);
```
完整构建：
```js
function mousemovef(){
  //鼠标移动处理
	    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

	    if (pickResult.hit) {
		    var diffX = pickResult.pickedPoint.x - box.position.x;
		    var diffY = pickResult.pickedPoint.z - box.position.z;
		    box.rotation.y = Math.atan2(diffX,diffY);			          
    	}	
    }

    scene.onPointerMove = function () {
        mousemovef();
    };

    function vecToLocal(vector, mesh){
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
		return v;		 
    }

    function predicate(mesh){
        if (mesh == box2 || mesh == box){
            return false;
        }
        return true;
    }

    function castRay(){       
        var origin = box.position;
	
	    var forward = new BABYLON.Vector3(0,0,1);		
	    forward = vecToLocal(forward, box);
	
	    var direction = forward.subtract(origin);
	    direction = BABYLON.Vector3.Normalize(direction);
	
	    var length = 100;
	
	    var ray = new BABYLON.Ray(origin, direction, length);

// 如果射线接触到网格对象，则捕捉 hit 点
// predicate 用来选择是否在特定对象上触发碰撞
        var hit = scene.pickWithRay(ray, predicate);

        if (hit.pickedMesh){
		   hit.pickedMesh.scaling.y += 0.01;
	    }
    }
 
    scene.registerBeforeRender(function () {
        castRay();
    });
```
或者，多选:
```js
var hits = scene.multiPickWithRay(ray);

  if (hits){
  for (var i=0; i<hits.length; i++){
          hits[i].pickedMesh.scaling.y += 0.01;
      }
}
```

追踪：
```js
BABYLON.RayHelper.CreateAndShow(ray, scene, new BABYLON.Color3(1, 1, 0.1));
// 或
var rayHelper = new BABYLON.RayHelper(ray);
rayHelper.show(scene);
```


# 10 Particle
## 10.1 
```js
/* 1 创建粒子发射器 */
var fountain = BABYLON.Mesh.CreateBox("fountain", 1.0, scene);
// 发射器也可以是一个 vector3 的点

/* 2 创建一个新的 未渲染 粒子系统 */
var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene, customEffect);
// new ParticleSystem(name, capacity, scene, customEffect)

/* 3 设置粒子纹理 */
// 每个粒子有相同的纹理模式 一个场景可以有多个粒子系统 每个粒子系统只能设置一种纹理模式  多个粒子系统可以共用一套发射器
particleSystem.particleTexture = new BABYLON.Texture("Flare.png", scene);
particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);

/* 4 给粒子系统设置发射器 */

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
```js
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
```js
var scene = createScene();
```

4. 渲染
```js
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

- beginAnimation(target, from, to, loop, speedRatio, onAnimationEnd, animatable)
- beginDirectAnimation(target, animations, from, to, loop, speedRatio, onAnimationEnd)


- registerBeforeRender(func) → void
  >Registers in an array the given function which will be executed before rendering the scene

- unregisterBeforeRender(func) → void

- registerAfterRender(func)  → void
- unregisterAfterRender(func) → void

- scene.getAnimatableByTarget()


### obj
- parent
>attaching an object, relatively to another, by creating a parent-child link between two meshes. This link implies that all parent transformations (position/rotation/scaling) will also be applied to the child’s transformations.


- isPickable
>isPickable, defines if the primitive can be picked/selected or not.
```js
spriteManagerTrees.isPickable = true;
```


## 其他
可触控，可通过键鼠操控
```
camera.attachControl(canvas, true);
```

### zoom speed
```js
camera.wheelPrecision //越大越慢
camera.pinchPrecision
camera.zoomOnFactor
js



```js
/*
*POWER BY FYG
*2017
*BABYLONjs
*/
```