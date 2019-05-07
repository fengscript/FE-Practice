# glow layer

效果类似于灯管的荧光

需要注意的：
1. babylon > 3.2
2. 只作用在 `emassiveColor` ，辉光是按照 `emassiveColor` 来渲染的
3. 默认会给所有 mesh 添加 辉光（当然可以自己重新设置）

## 使用

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
- mainTextureRatio: 渲染目标大小 (越小越快)【截至 18-6月 感觉数值并不起作用，怀疑可能是 v3.2 的bug，其实只用 blurKernelSize 就可以很好的控制辉光范围】
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
