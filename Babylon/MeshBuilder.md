对比：
```javascript
var mesh = BABYLON.Mesh.CreateMesh(name, param1, param2, param3, ..., scene);
var mesh = BABYLON.MeshBuilder.CreateMesh(name, {param1 : val1, param2: val2}, scene);
```
`MeshBuilder` 可以传入参数来更准确的控制物体的形状

# 固定形状
## 常用
所有的固定形状通过传入空参数 `{}` 可以得到默认形状，如
```javascript
var cylinder = BABYLON.MeshBuilder.CreateCylinder("cyl", {}, scene);
```
于是，也可以将所有的参数都自定义：
### Box
```javascript
var cylinder = BABYLON.MeshBuilder.CreateBox("cyl", {height:5, faceColors: myColors}, scene);
```
参数：
- size
- width     以下2个参数会覆盖上面 size 参数
- height
- depth
- faceColors
- faceUV
- updatable
- sideOrientation  

### Sphere
```javascript
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, diameterX: 3}, scene);
```
- segments
- diameter
- diameterX     以下3个参数会覆盖上面 diameter 参数
- diameterY
- diameterZ
- arc
- slice
- updatable
- sideOrientation  


### Plane
- size
- width
- height
- updatable
- sideOrientation 
- sourcePlane

### Ground
- width
- height
- updatable
- subdivisions

### Ground From a Height Map
```javascript
var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", url, {width: 6, subdivisions: 4}, scene);
```
- width
- height
- subdivisions
- minHeight
- maxHeigth
- onReady (CALLBACK)
- updatable

## 不常用
## Cylinder or Cone
将圆柱的 `diameterTop` 设为 0 即可得到圆锥
- height
- diameterTop
- diameterBottom
- diameter
- tessellation
- subdivisions
- faceColors
- faceUV
- arc
- updatable
- sideOrientation  

## IcoSphere 多面三角体

```javascript
var icosphere = BABYLON.MeshBuilder.CreateIcoSphere("ico", {radius: 5, radiusY: 8, subdivisions: 6}, scene);
```
- radius
- radiusX
- radiusY
- radiusZ
- subdivision
- flat
- updatable
- sideOrientation

http://doc.babylonjs.com/tutorials/mesh_createxxx_methods_with_options_parameter


## PolygonMeshBuilder
构造多边形时候可以使用 `Path2` 对象 或者 `Vector2` 坐标

如，使用 `Vector2`
```javascript
    var corners = [new BABYLON.Vector2(4, -4),
    new BABYLON.Vector2(2, 0),
    new BABYLON.Vector2(5, 2),
    new BABYLON.Vector2(1, 2),
    new BABYLON.Vector2(-5, 5),
    new BABYLON.Vector2(-3, 1),
    new BABYLON.Vector2(-4, -4),
    new BABYLON.Vector2(-2, -3),
    new BABYLON.Vector2(2, -3),
    ];

    var poly_tri = new BABYLON.PolygonMeshBuilder("polytri", corners, scene);
    var polygon = poly_tri.build(null, 0.5);
    polygon.position.y = + 8;
```
或者使用 `Path2`
```javascript
   var poly_path = new BABYLON.Path2(2, 0);
    poly_path.addLineTo(5, 2);
    poly_path.addLineTo(1, 2);
    poly_path.addLineTo(-5, 5);
    poly_path.addLineTo(-3, 1);
    poly_path.addLineTo(-4, -4);
    poly_path.addArcTo(0, -2, 4, -4, 100);

    var poly_tri2 = new BABYLON.PolygonMeshBuilder("polytri2", poly_path, scene);
    var polygon2 = poly_tri2.build(false, 0.5); //updatable, extrusion depth - both optional
```
或者在多边形内部挖空：
```javascript
var hole = [ new BABYLON.Vector2(1, -1),
    new BABYLON.Vector2(1.5, 0),
    new BABYLON.Vector2(1.4, 1),
    new BABYLON.Vector2(0.5, 1.5)
];
poly_tri.addHole(hole);
```