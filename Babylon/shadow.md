ShadowGenerator
>This function uses a shadow map: a map of your scene generated from the light’s point of view.

```javascript
ShadowGenerator(size, light)

//size:the size of the shadow map
//light:which light is used for the shadow map's computation.
```
1. 设置阴影生成器
```javascript
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
```

2. 设置renderList
shadowGenerator.getShadowMap().renderList.push(meshs);
```javascript
shadowGenerator.getShadowMap().renderList.push(torus);
```

3. 设置

4. 设置显示阴影的 mesh
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
