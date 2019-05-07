# 1 简单来个
```javascript
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
shadowGenerator.getShadowMap().renderList.push(aimMesh);
ground.receiveShadows = true;
```

首先注意，
**只有 `pointLight`, `directionalLight` 和 `spotLight` 可以生成阴影**




# 2 详细设置

详细文档：http://doc.babylonjs.com/babylon101/shadows#lights

## 第一步 设置阴影生成器
```javascript
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
```

```javascript
//size:the size of the shadow map
//light:which light is used for the shadow map's computation.
ShadowGenerator(size, light)
```

**一个阴影生成器只能在一个光源上使用**


## 第二步 设置renderList

**`babylon.js v3.1` 以后，也可以用 `addShadowCaster` 或者 `removeShadowCaster` 来处理你的渲染列表**
- addShadowCaster(mesh, includeDescendants)：会将你的mesh、及它的后代全部加入到渲染列表
- removeShadowCaster(mesh, includeDescendants)：删除

```javascript
shadowGenerator.getShadowMap().renderList.push(torus);

//或者，你有好多个 mesh 要实时阴影
var myShadomMesh = [mesh1,mesh2......];
shadowGenerator.getShadowMap().renderList = myShadomMesh;

//或者
shadowGenerator.addShadowCaster(myShadowParent);
```

## 第三步 设置显示阴影的 mesh
```javascript
ground.receiveShadows = true;
```


# 3. 获得柔和的阴影

`babylon` 提供了一系列过滤器，都会将阴影的边缘更加柔化，大家可以根据自己不同的需求，每个都试试，也可以组合在一起使用

## 1 泊松抽样羽化 usePoissonSampling

若开启会禁用方差阴影贴图而使用泊松抽样来羽化阴影
```javascript
shadowGenerator.usePoissonSampling = true;
```

## 2 指数阴影生成器 useExponentialShadowMap
默认开启，会减少阴影的混淆，关闭可以节省资源

```javascript
shadowGenerator.useExponentialShadowMap = true;
shadowGenerator.depthScale = 50
```
`depthScale` 控制指数阴影地图的放缩深度，默认 50，值限于相机的 `minZ` 和 `maxZ`

## 3 模糊指数阴影生成器 useBlurExponentialShadowMap

使阴影边缘羽化效果更好，但也更费资源
```javascript
shadowGenerator.useBlurExponentialShadowMap = true;
```
它有以下属性：
- shadowGenerator.blurScale：于缩小阴影贴图的比例。默认为2
- shadowGenerator.blurBoxOffset：应用模糊的边缘的偏移量。默认为1
- shadowGenerator.useKernelBlur：使用内核模糊，质量更好
- shadowGenerator.blurKernel：模糊内核大小，默认为1 

```javascript
//默认值2 缩减阴影模糊度
shadowGenerator.blurScale = 2;
//定义应用到模糊上的盒子边缘偏移量
shadowGenerator.blurBoxOffset = 2;
//使用 核心模糊 代替 盒子模糊，模糊效果更好，资源耗费更多  
shadowGenerator.useKernelBlur = false;
// 控制核心模糊的数量
shadowGenerator.blurKernel = 64;
```

## 4 闭合指数阴影生成器

从 BABYLON 3.0，引入了 `Close Exponential Shadow Map (CESM)`，来更好的处理自阴影的问题，使用 `CESM`，可以更获得更快的阴影，需要定义一些额外参数：
```javascript
// 开启
shadowGenerator.useCloseExponentialShadowMap = true;
// 模糊
shadowGenerator.useBlurCloseExponentialShadowMap = true;
```

# 4 光源

## pointLight
点光源使用立方贴图渲染，所以谨慎使用，容易导致一些性能问题。
demo：https://www.babylonjs-playground.com/#LYCSQ#12

`BlurExponentialShadowMap` 和 `CloseBlurExponentialShadowMap` 不被点光源支持 

## DirectionalLight
`Directional lights` 使用 正交投影 'orthogonal projection'。阴影会根据光源位置自动计算得到最佳效果，

```javascript
//关闭自动计算
light.autoUpdateExtends = false;
//以下参数来更改投影窗口的大小
//默认 0.1 意味着投影窗口从立项大小以 10% 递增
light.shadowOrthoScale = 0.1
// 默认 false，或者 0 ， 可以设一个值用于定义要使用的截面积的平方？
light.shadowFrustumSize = false;
```

> light.shadowFrustumSize: Off by default with a value of 0. You can specify a value which will be used to define the square size of the frustum to use.

## 自定义的投影矩阵 projection matrix

```javascript
light.customProjectionMatrixBuilder = function(viewMatrix: Matrix, renderList: Array<AbstractMesh>) {
    return BABYLON.Matrix.PerspectiveFovLH(angle, 1.0, activeCamera.minZ, this.shadowMaxZ);
}
```
# 5 补充

## 阴影偏移 Bias

设置阴影贴图的偏移，降低贴图精度，来减少阴影的凸刺

```javascript
//默认 0.00005
shadowGenerator.bias = 0.01;
```

## 自身阴影
将 `forceBackFacesOnly` 设为 `true`，来停用自身阴影
```javascript
shadowGenerator.forceBackFacesOnly = true
```
**若想模糊一个 自身阴影，最好使用 闭合指数阴影生成器**
> you want blurred shadows on a self-shadowing object, the best option will probably to go with close exponential shadow map.


## 修改阴影的准确性
默认情况下，光源的投影矩阵由 主相机的 `minZ` 和 `maxZ`控制。

可以通过以下来单独为阴影指定介于 `minZ` 和 `maxZ` 的值来更精确的控制阴影距离。
```javascript
light.shadowMinZ = 100000;
light.shadowMaxZ = 0;
```

## 改善在 mesh 边缘处的衰减

当物体靠近地图边缘的阴影出现意料之外的衰减问题时，用 `frustumEdgeFalloff` 可以进行调整：
```javascript
// 默认为 0 值为 0 - 1
shadowGenerator.frustumEdgeFalloff = 1.0;
```

# 6 阴影的颜色
若想获得灰色、或者没有那么黑的阴影，需要组合上面的羽化方式和相机的 `shadowMaxZ`，提供一个我造的组合给大家参考：

```javascript
 // 柔化
lightShadow._shadowMaxZ = 50000;
lightShadow._shadowMinZ = 0;

shadowGenerator.bias = 0.01;
shadowGenerator.useBlurExponentialShadowMap = true;
shadowGenerator.blurKernel = 50;
shadowGenerator.useKernelBlur = true;
        
shadowGenerator.depthScale = 500;
```

这个阴影需要注意的是你的灯的 `position` 如果做了改变，那么因为 `shadowMaxZ` 跟着变，你需要临时调整一下 `shadowMaxZ`