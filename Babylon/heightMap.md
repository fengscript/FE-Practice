高度图来自灰度图，像素颜色会被解析为高度。越白的地方，越高。
> This image is the elevation data for your ground. Each pixel’s color is interpreted as a distance of displacement or “height” from the “floor” of your mesh. So, the whiter the pixel is, the taller your mountain will be.

> To help you generate those gray-scale height maps, you can use software such as “Terragen”, or ”Picogen”.

```javascript
var groundMat = new BABYLON.StandardMaterial('ground',scene);
groundMat.diffuseTexture = new BABYLON.Texture("./img/earth.png",scene);
groundMat.backFaceCulling = false;

var groundPlane = BABYLON.Mesh.CreateGroundFromHeightMap("groundMat", "./img/earthheightmap.jpg", 200, 200, 250, 0, 40, scene, false, null);
groundPlane.material = groundMat;
```

CreateGroundFromHeightMap("name", "url", size, width, height, subdivisions, minHeight, maxHeight, scene, updatable, callBack)