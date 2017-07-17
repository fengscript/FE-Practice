```javascript
//  Particles
//  1 定义一个粒子发射器  也可以是一个 vector3点  这里直接用上面的 sphere 
//  2 创建一个粒子系统
 var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
//  3 设置粒子的材质
particleSystem.particleTexture = new BABYLON.Texture("img/flare.png", scene);
// particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
//  4 设置发射器
particleSystem.emitter = new BABYLON.Vector3(10,10,10);
//  5 启动
particleSystem.start();
// particleSystem.stop();


// 6 变漂亮一点

// 发射点
particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); 
particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); 

//给个颜色  Colors of all particles (splited in 2 + specific color before dispose)
particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

// Size of each particle (random between...)
particleSystem.minSize = 0.1;
particleSystem.maxSize = 0.5;

// Life time of each particle (random between...)
particleSystem.minLifeTime = 0.3;
particleSystem.maxLifeTime = 1.5;

particleSystem.emitRate = 1300;
// 一次性发射， 会覆盖 emitRate
// particleSystem.manualEmitCount = 300;
// BLENDMODE_ONEONE 初始颜色不适用 alpha 叠加到最终颜色上
// BLENDMODE_STANDARD 适用粒子的 alpha 渲染颜色和粒子颜色
particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

//Gravity
// 火焰一般在 Y 轴
particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

// 方向 粒子会在 方向1 和 2之间 随机发射
particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

// 角速度 可以为每个粒子定义一个 Z 轴方向
particleSystem.minAngularSpeed = 0;
particleSystem.maxAngularSpeed = Math.PI;

// 速度 定义发射粒子的强度，默认 0.01
particleSystem.minEmitPower = 1;
particleSystem.maxEmitPower = 3;
particleSystem.updateSpeed = 0.005;


// 持续时间
particleSystem.targetStopDuration = 5;

// 工具
particleSystem.disposeOnStop = true;//用于一次性粒子系统
```

# customEffect
http://www.babylonjs-playground.com/#1ASENS
```js
var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene, customEffect);
```