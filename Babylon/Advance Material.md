
# Advance Material
[http://doc.babylonjs.com/tutorials/advanced_texturing](http://doc.babylonjs.com/tutorials/advanced_texturing)

http://www.babylonjs-playground.com/#EKFLA#13
## Mirror
MirrorTexture 用于规则mesh

ReflectionProbe 用于不规则mesh

CubeTexture 用于没有mesh强行反射。。
### MirrorTexture
https://www.babylonjs-playground.com/#12MKMN#0
```JS
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
```JS
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

http://www.babylonjs-playground.com/#IRZYH
```JS
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
```JS
var bumpMaterial = new BABYLON.StandardMaterial("texture1", scene);
bumpMaterial.bumpTexture = new BABYLON.Texture("normalMap.jpg", scene);
```
法线贴图对应Babylon的格式：
-BabylonJS x-axis = left y-axis = down

-OpenGL x-axis = right y-axis = up

-DirectX x-axis = right y-axis = down

可以自主设置：
```JS
material.invertNormalMapX = true
material.invertNormalMapY = true.
```

## Refraction

### probe
```js
var probe = new BABYLON.ReflectionProbe("main", 512, scene);
probe.renderList.push(mirror);
mainMaterial.refractionTexture = probe.cubeTexture;
```
### refractionPlane 
[http://www.babylonjs-playground.com/#22KZUW#15](http://www.babylonjs-playground.com/#22KZUW#15)
```JS
var refractionTexture = new BABYLON.RefractionTexture("th", 1024, scene);
refractionTexture.renderList.push(yellowSphere);
refractionTexture.renderList.push(greenSphere);
refractionTexture.renderList.push(ground);
refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, -1, 0);
refractionTexture.depth = 2.0;
```


## Vedio
```JS
ecran.material.diffuseTexture = new BABYLON.VideoTexture("video",
["Scenes/Flat2009/babylonjs.mp4", "Scenes/Flat2009/babylonjs.webm"], scene, true);
```

# Fresnel 
`isEnabled ` 可以开启或者关闭菲涅尔

- StandardMaterial.diffuseFresnelParameters
- StandardMaterial.opacityFresnelParameters
- StandardMaterial.reflectionFresnelParameters
- StandardMaterial.emissiveFresnelParameters
- StandardMaterial.refractionFresnelParameters

**use**
```JS
material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
```

反射：
http://www.babylonjs-playground.com/#22KZUW#6
```JS
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
```JS

material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
material.emissiveFresnelParameters.bias = 0.6;
material.emissiveFresnelParameters.power = 4;
material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

```
透明度
```JS
material.opacityFresnelParameters = new BABYLON.FresnelParameters();
material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();
```

> finalFresnelTerm = pow(bias + fresnelTerm, power)

# Sky
### 1 设置天空
```JS
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