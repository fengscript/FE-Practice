# faceUV 
给每个面添加不同的材质
```javascript
 var hSpriteNb =  6;  // 6 sprites per raw
  var vSpriteNb =  4;  // 4 sprite raws

  var faceUV = new Array(6);

  for (var i = 0; i < 6; i++) {
    faceUV[i] = new BABYLON.Vector4(i/hSpriteNb, 0, (i+1)/hSpriteNb, 1 / vSpriteNb);
  }
  
var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceUV: faceUV
  };

  var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
  box.material = mat;
```
其中可以让
```
Ubottom = i / 6
Vbottom = 0
Utop = (i+1) / 6
Vtop = 1 / 4
```

# faceColors
利用 `faceColors` 可以给 mesh 的每个面都添加不同的颜色

```javascript
// 1 设置一个 6 个元素的数组存放颜色
var faceColors  = new Array(6);
// 2 设置一些颜色
faceColors[4] = new BABYLON.Color4(1,0,0,1);
faceColors[1] = new BABYLON.Color4(0,1,0,1);

// 3 将数组设置到 faceColors
  var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceColors : faceColors
  };

  var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);

//要启用透明度：
box.hasVertexAlpha = true;

```