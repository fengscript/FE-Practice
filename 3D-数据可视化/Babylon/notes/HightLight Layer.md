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

效果类似于灯管的荧光

需要注意的：
1. babylon > 3.2
2. 只作用在 `emassiveColor` ，辉光是按照 `emassiveColor` 来渲染的
3. 默认会给所有 mesh 添加 辉光（当然可以自己重新设置）


```javascript
var gl = new BABYLON.GlowLayer("glow", scene);
```
如：https://www.babylonjs-playground.com/#LRFB2D#1


## 强度
用 `intensity` 属性来控制辉光强度
```javascript
var gl = new BABYLON.GlowLayer("glow", scene);
gl.intensity = 0.5;
```

## 特定 mesh
### addIncludedOnlyMesh() 
当只需要给特定 `mesh` 添加时，使用 `addIncludedOnlyMesh(mesh)` 方法即可
```javascript
var gl = new BABYLON.GlowLayer("glow", scene);
gl.addIncludedOnlyMesh(scene.getMeshByName('xxx'));
```
### addExcludedMesh() 
排除掉某个mesh

**用以上两个方法组合，就可以给自己想要的多个 `mesh` 添加辉光**

## 范围控制
- mainTextureRatio: 渲染目标大小 (越小越快)【截至 18-6-25 感觉数值并不起作用，怀疑可能是 v3.2 的bug，其实只用 blurKernelSize 就可以很好的控制辉光范围】
- mainTextureFixedSize: 修正值辉光相对mesh形状变化程度。 值越小辉光范围越大越淡，值越大辉光范围越集中在 mesh 的边缘上（一般我觉得256 512就行，大于2000以后帧率急速下降）
- blurKernelSize: 越大效果越好(我觉得32起步吧，数值越大，相机拉远一点就扩散的越厉害)

```javascript
var gl = new BABYLON.GlowLayer("glow", scene);
gl.blurKernelSize = 64;
gl.mainTextureFixedSize = 256;
```

## 快速设置
也可以在 `new` 的时候在第三个参数里面直接配置以上属性
```javascript
var gl = new BABYLON.GlowLayer("glow", scene, { 
    mainTextureFixedSize: 256,
    blurKernelSize: 64,
});
```

## 颜色设置
辉光颜色默认是按 `emissveColor`， 也可以自定义覆盖掉默认的辉光颜色或者材质
用属性 `customEmissiveColorSelector `  和 `customEmissiveColorSelector `

### `customEmissiveColorSelector`
```javascript
customEmissiveColorSelector: (mesh: Mesh, subMesh: SubMesh, material: Material, result: Color4) 
// 如
gl.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
    if (mesh.name === "lightsaber") {
        result.set(1, 0, 1, 1);
    } else {
        result.set(0, 0, 0, 0);
    }
}
```
### `customEmissiveTextureSelector`
```javascript
customEmissiveTextureSelector(mesh: Mesh, subMesh: SubMesh, material: Material)
```

## 可能常用属性
- intensity
- mainTextureFixedSize
- blurKernelSize
- isEnabled
- customEmissiveColorSelector
- customEmissiveTextureSelector


## 可能常用方法
- addIncludedOnlyMesh(mesh)
- addExcludedMesh(mesh)
- removeExcludedMesh
- removeIncludedOnlyMesh
- dispose
- disposeMesh
- isReady

更多 https://doc.babylonjs.com/api/classes/babylon.glowlayer


```javascript
var gl = new GlowLayer(name: string, scene: Scene, options?: Partial<IGlowLayerOptions>): GlowLayer
options:{
    blurKernelSize:
    camera:
    mainTextureFixedSize:
    mainTextureRatio:
    mainTextureSamples:
}

// 会Return GlowLayer
```

https://doc.babylonjs.com/how_to/glow_layer

