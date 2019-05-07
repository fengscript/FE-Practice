# Advance Texture
[http://doc.babylonjavascript.com/tutorials/advanced_texturing](http://doc.babylonjavascript.com/tutorials/advanced_texturing)

http://www.babylonjavascript-playground.com/#EKFLA#13
## Mirror
MirrorTexture 用于规则mesh

ReflectionProbe 用于不规则mesh

CubeTexture 用于没有mesh强行反射。。
### MirrorTexture
https://www.babylonjavascript-playground.com/#12MKMN#0
```javascript
//Creation of a mirror material
var mirrorMaterial = new BABYLON.StandardMaterial("texture4", scene);
mirrorMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true); //Create a mirror texture
mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
mirrorMaterial.reflectionTexture.renderList = [sphere1, sphere2, sphere3, videoPlane];
mirrorMaterial.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection
    
mirrorMaterial.reflectionTexture.depth = 0.6;
mirror.blurKernel = 32
mirror.blurRatio = 0.5
```

## ReflectionTexture
### probe
```javascript
var mainMaterial = new BABYLON.StandardMaterial("main", scene);
    knot.material = mainMaterial;
var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    probe.renderList.push(yellowSphere);
    mainMaterial.refractionTexture = probe.cubeTexture;
    
    // fresnel
	mainMaterial.refractionFresnelParameters = new BABYLON.FresnelParameters();
    mainMaterial.refractionFresnelParameters.bias = 0.5;
	mainMaterial.refractionFresnelParameters.power = 16;
	mainMaterial.refractionFresnelParameters.leftColor = BABYLON.Color3.Black();
	mainMaterial.refractionFresnelParameters.rightColor = BABYLON.Color3.White();
	mainMaterial.indexOfRefraction = 1.05;
```
### CubeTexture - skybox
6张图片

*n_x | y | z 是对应轴的相反方向

*p_x | y | z 是对应轴的正方向

http://www.babylonjavascript-playground.com/#IRZYH
```javascript
var reflectionTexture = new BABYLON.CubeTexture("images/sky1/ceramic" , scene);
var met = new BABYLON.StandardMaterial("standar" , scene);
met.reflectionTexture = reflectionTexture;
met.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
met.diffuseColor = new BABYLON.Color3(0.38,0.38,0.38);
met.reflectionTexture.level = 0.1;
met.specularColor = new BABYLON.Color3(1,1,1);
met.specularPower = 800;
met.microSurface = 0.1;
```

## Bump Mapping
```javascript
var bumpMaterial = new BABYLON.StandardMaterial("texture1", scene);
bumpMaterial.bumpTexture = new BABYLON.Texture("normalMap.jpg", scene);
```
法线贴图对应Babylon的格式：
-Babylonjavascript x-axis = left y-axis = down

-OpenGL x-axis = right y-axis = up

-DirectX x-axis = right y-axis = down

可以自主设置：
```javascript
material.invertNormalMapX = true
material.invertNormalMapY = true.
```
## Parallax Mapping
视差图基于高度图，通过算法加强材料表面材质的凹凸程度
https://www.babylonjavascript-playground.com/#10I31V#23
通常与法线贴图（bump）结合使用。因为执行视差图所需的高度图大部分时间是在普通贴图纹理的Alpha通道中进行编码的。 （使用视差映射需要漫反射纹理）。

BABYLON 支持的 视差映射：
- Parallax Mapping
- Parallax Occlusion Mapping (POM)

可以通过两种材质使用它们：
- StandardMaterial
- PBRMaterial

三个参数控制视差图：
- useParallax
- useParallaxOcclusion
- parallaxScaleBias

#### Parallax Mapping
```javascript
material.bumpTexture = normalsHeightTexture;
material.useParallax = true;
material.useParallaxOcclusion = false;
```
#### Parallax Occlusion Mapping (POM)
```javascript
material.bumpTexture = normalsHeightTexture;
material.useParallax = true;
material.useParallaxOcclusion = true;
```
### probe
```javascript
var probe = new BABYLON.ReflectionProbe("main", 512, scene);
probe.renderList.push(mirror);
mainMaterial.refractionTexture = probe.cubeTexture;
```
### refractionPlane 
[http://www.babylonjavascript-playground.com/#22KZUW#15](http://www.babylonjavascript-playground.com/#22KZUW#15)
```javascript
var refractionTexture = new BABYLON.RefractionTexture("th", 1024, scene);
refractionTexture.renderList.push(yellowSphere);
refractionTexture.renderList.push(greenSphere);
refractionTexture.renderList.push(ground);
refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, -1, 0);
refractionTexture.depth = 2.0;
```


## Vedio
```javascript
ecran.material.diffuseTexture = new BABYLON.VideoTexture("video",
["Scenes/Flat2009/babylonjavascript.mp4", "Scenes/Flat2009/babylonjavascript.webm"], scene, true);
```

# Fresnel 
`isEnabled ` 可以开启或者关闭菲涅尔

- StandardMaterial.diffuseFresnelParameters
- StandardMaterial.opacityFresnelParameters
- StandardMaterial.reflectionFresnelParameters
- StandardMaterial.emissiveFresnelParameters
- StandardMaterial.refractionFresnelParameters

**use**
```javascript
material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
```

反射：
http://www.babylonjavascript-playground.com/#22KZUW#6
```javascript
material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
// 控制反射在边缘 （默认）
material.reflectionFresnelParameters.leftColor = BABYLON.Color3.White();
material.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();

//在中心
material.reflectionFresnelParameters.leftColor = BABYLON.Color3.Black();
material.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();

// 控制菲涅尔在物体表面的计算
material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
material.reflectionFresnelParameters.leftColor = BABYLON.Color3.Black();
material.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();
material.reflectionFresnelParameters.power = 4;
material.reflectionFresnelParameters.bias = 0.1;
```
 
漫反射
```javascript

material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
material.emissiveFresnelParameters.bias = 0.6;
material.emissiveFresnelParameters.power = 4;
material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

```
透明度
```javascript
material.opacityFresnelParameters = new BABYLON.FresnelParameters();
material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();
```

> finalFresnelTerm = pow(bias + fresnelTerm, power)

# Sky
### 1 设置天空
```javascript
var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
skyboxMaterial.backFaceCulling = false;

// Sky mesh (box)
var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
skybox.material = skyboxMaterial;

//阳光散射在周围空气中的强度
skyMaterial.turbidity = 1;

//亮度 设置白天黑夜
skyMaterial.inclination = 0.5;

//控制光色调
skyMaterial.luminance = 1; // Controls the overall luminance of sky in interval ]0, 1,190[

//---------------------------------
skyMaterial.azimuth = 0.25;

// Manually set the sun position
skyMaterial.useSunPosition = true; // Do not set sun position from azimuth and inclination
skyMaterial.sunPosition = new BABYLON.Vector3(0, 100, 0);

skyMaterial.rayleigh = 2; // Represents the sky appearance (globally)

// Mie scattering (from [Gustav Mie](https://en.wikipedia.org/wiki/Gustav_Mie))
// Related to the haze particles in atmosphere

// The amount of haze particles following the Mie scattering theory
skyMaterial.mieDirectionalG = 0.8;

skyMaterial.mieCoefficient = 0.005; // The mieCoefficient in interval [0, 0.1], affects the property skyMaterial.mieDirectionalG
```

# DynamicTexture
```javascript
var makeTextPlane = function ('text', color, size) {
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
    var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
};
```