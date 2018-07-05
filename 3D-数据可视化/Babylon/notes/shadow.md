最简单一个
```javascript
ShadowGenerator(size, light)

//size:the size of the shadow map
//light:which light is used for the shadow map's computation.
```
# 1. 设置阴影生成器
```javascript
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
```

# 2. 设置renderList
shadowGenerator.getShadowMap().renderList.push(meshs);
```javascript
shadowGenerator.getShadowMap().renderList.push(torus);
```

# 3. 设置显示阴影的 mesh
```javascript
ground.receiveShadows = true;
```
如
```javascript
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
shadowGenerator.getShadowMap().renderList.push(torus);
shadowGenerator.useExponentialShadowMap = true;
ground.receiveShadows = true;
```

# 4. 个性化
## 4.1 羽化
- 1 泊松抽样 Poisson sampling

```javascript
shadowGenerator.usePoissonSampling = true;
```
若开启，差异阴影生成器将被关闭，会使阴影更柔化，但是更费资源

- 2 指数阴影生成器 Poisson sampling

```javascript
shadowGenerator.useExponentialShadowMap = true;
```
默认开启，会减少阴影的混淆，关闭可以节省资源
```javascript
shadowGenerator.depthScale = 50
```
默认 50，控制指数阴影地图的放缩深度，值限于 minZ 和 maxZ

- 3 模糊指数阴影生成器

```javascript
//使阴影更柔化，更费资源
shadowGenerator.useBlurExponentialShadowMap = true;

//默认值2 缩减阴影模糊度
shadowGenerator.blurScale = 2;
//定义应用到模糊上的盒子边缘偏移量
shadowGenerator.blurBoxOffset = 2;
//使用 核心模糊 代替 盒子模糊，模糊效果更好，资源耗费更多  
shadowGenerator.useKernelBlur = false;
// 控制核心模糊的数量
shadowGenerator.blurKernel = 64;
```

- 4 闭合指数阴影生成器

从 BABYLON 3.0，引入了 `Close Exponential Shadow Map (CESM)`，来更好的处理自阴影的问题，使用 `CESM`，可以更获得更快的阴影，需要定义一些额外参数：
```javascript
// 开启
shadowGenerator.useCloseExponentialShadowMap = true;
// 模糊
shadowGenerator.useBlurCloseExponentialShadowMap = true;
```

## 4.2 光源
一个阴影生成器只能在一个光源上使用。

只有 point, directional 和 spotLights 可以捕捉阴影。

### pointLight
点光源使用立方贴图渲染，所以谨慎使，这可能会导致一些性能问题。
https://www.babylonjs-playground.com/#LYCSQ#12

`BlurExponentialShadowMap` 和 `CloseBlurExponentialShadowMap` 不被点光源支持 

### DirectionalLight
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

### 自定义的投影矩阵 projection matrix

```javascript
light.customProjectionMatrixBuilder = function(viewMatrix: Matrix, renderList: Array<AbstractMesh>) {
    return BABYLON.Matrix.PerspectiveFovLH(angle, 1.0, activeCamera.minZ, this.shadowMaxZ);
}
```
# Troubleshooting

## Bias
设置阴影贴图的偏移，降低贴图精度，来减少阴影的凸刺
```javascript
//默认 0.00005
shadowGenerator.bias = 0.01;
```

## Back face rendering
设为 `true`，来停用自身阴影
```javascript
shadowGenerator.forceBackFacesOnly = true
```

### Improving the projection matrix precision
默认情况下，光源的投影矩阵由 主相机的 `minZ` 和 `maxZ`控制。

可以通过以下来单独为阴影指定介于 `minZ` 和 `maxZ` 的值来更精确的控制阴影距离。
```javascript
light.shadowMinZ
light.shadowMaxZ
```


**若想模糊一个 自身阴影，最好使用 闭合指数阴影生成器**
> you want blurred shadows on a self-shadowing object, the best option will probably to go with close exponential shadow map.

当物体靠近地图边缘的阴影出现意料之外的衰减问题时，用 `frustumEdgeFalloff` 可以进行调整：
```javascript
// 默认为 0 值为 0 - 1
shadowGenerator.frustumEdgeFalloff = 1.0;
```

