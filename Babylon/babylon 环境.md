# 1 envirment color property
clearColor
```JS
scene.clearColor // changes the 'background' color.
// 如
scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
```
> This color and property is not used in any calculations for the final colors of mesh, materials, textures, or anything else. It is simply the background color of the scene

ambientColor
```JS
scene.ambientColor // changes the color used in several effects, including ambient lighting.
```
>  ambientColor is used in quite a few calculations toward determining the final colors of scene items.  Mainly, it is used in conjunction with a mesh's StandardMaterial. ambientColor to determine a FINAL ambientColor for the mesh material.

Skybox
```js
var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.disableLighting = true;
skybox.material = skyboxMaterial;

// infiniteDistance makes the skybox follow our camera's position.
skybox.infiniteDistance = true;

// remove all light reflections on our box (the sun doesn't reflect on the sky!):
skyboxMaterial.disableLighting = true;

// apply special sky texture to it. This texture must have been prepared to be a skybox, in a dedicated directory, named “skybox” in example:
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

//(More about reflectionTextures can be found in https://www.eternalcoding.com/?p=303


// 或者使用 dds 文件
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/assets/textures/SpecularHDR.dds", scene);

// 想要 skybox 在其他物体之后被渲染，则需设置其 rederingGroupId 为0
skybox.renderingGroupId = 0;

// Some other mesh
myMesh.renderingGroupId = 1;

```
Fog

```JS
// 1 定义一个 fog mode
scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
// 可选值
/*
BABYLON.Scene.FOGMODE_NONE - default one, fog is deactivated.
BABYLON.Scene.FOGMODE_EXP - the fog density is following an exponential function.
BABYLON.Scene.FOGMODE_EXP2 - same that above but faster.
BABYLON.Scene.FOGMODE_LINEAR - the fog density is following a linear function.
*/

    // 如果选择了 EXP 或者 EXP2  则可以设置 雾的密度
    scene.fogDensity = 0.01;
    
    // 若选了 线性模式 则可以设置起始点
    scene.fogStart = 20.0;
    scene.fogEnd = 60.0;
    
// 无论何种模式 都要设置雾的颜色
scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);

```