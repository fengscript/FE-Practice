# 高亮
```javascript
// 1 
var engine = new BABYLON.Engine(canvas, true, { stencil: true });

// 2
// Add the highlight layer.
var hl = new BABYLON.HighlightLayer("hl1", scene);
hl.addMesh(sphere, BABYLON.Color3.Green());
```
https://www.babylonjs-playground.com/#1KUJ0A#0


# 重叠
```javascript
// Add the highlight layer.
var hl = new BABYLON.HighlightLayer("hl1", scene);
hl.addMesh(sphere, BABYLON.Color3.Green());
hl.addMesh(ground, BABYLON.Color3.Red());
```
也可以将重叠部分的边缘全部描绘出来（更费资源）
```javascript
// Add the highlight layer.
var hl1 = new BABYLON.HighlightLayer("hl1", scene); 
hl1.addMesh(sphere, BABYLON.Color3.White());
var hl2 = new BABYLON.HighlightLayer("hl2", scene);
hl2.addMesh(ground, BABYLON.Color3.Red());
```

# blur
可以调整 blur ，甚至加动画
- blurHorizontalSize Number
- blurVerticalSize

```javascript
var hl2 = new BABYLON.HighlightLayer("hl2", scene);
hl2.addMesh(ground, BABYLON.Color3.Red());

var alpha = 0;
scene.registerBeforeRender(() => {
    alpha += 0.06;

    hl2.blurHorizontalSize = 0.3 + Math.cos(alpha) * 0.6 + 0.6;        
    hl2.blurVerticalSize = 0.3 + Math.sin(alpha / 3) * 0.6 + 0.6;
});
```
https://www.babylonjs-playground.com/#1KUJ0A#4


# innerGlow
- innerGlow Boolean
- outerGlow

控制辉光是否在内层/外层 显示
```javascript
hl1.outerGlow = false;
hl1.innerGlow = false;
```

# Exclude mesh
高亮层不会处理 mesh 的透明度（alpha），所以通过带有透明度的 mesh 观察有高亮层的物体时，辉光将被去掉。
```javascript
hl.addExcludedMesh(skybox1);
```
用来排除这种影响


# Multi Camera
多个相机时，给特定相机设置是否可观察到高亮
```javascript
var hl1 = new BABYLON.HighlightLayer("hl1", scene, {camera: camera});
hl1.addMesh(sphere, BABYLON.Color3.Green());
```

其他可选项
- mainTextureRatio?: number - Multiplication factor apply to the canvas size to compute the render target size used to generated the glowing objects (the smaller the faster).
- mainTextureFixedSize?: number - Enforces a fixed size texture to ensure resize independant blur.
- blurTextureSizeRatio?: number - Multiplication factor apply to the main texture size in the first step of the blur to reduce the size of the picture to blur (the smaller the faster).
- blurVerticalSize?: number - How big in texel of the blur texture is the vertical blur.
- blurHorizontalSize?: number - How big in texel of the blur texture is the horizontal blur.
- alphaBlendingMode?: number - Alpha blending mode used to apply the blur. Default is combine.
- camera?: Camera - The camera attached to the layer (only this camera can see the highlights).

使用：
```javascript
var hl1 = new BABYLON.HighlightLayer("hl1", scene, { camera: myCamera });
```



# glow layer
**只作用在 emassive parts**
```javascript
var gl = new BABYLON.GlowLayer("glow", scene);
```

```javascript
new GlowLayer(name: string, scene: Scene, options?: Partial<IGlowLayerOptions>): GlowLayer
options:{
    blurKernelSize
    camera
    mainTextureFixedSize
    mainTextureRatio
    mainTextureSamples
}
Returns GlowLayer
```

## 属性
- intensity
- mainTextureFixedSize
- blurKernelSize
- 


## 方法
- addIncludedOnlyMesh(mesh)