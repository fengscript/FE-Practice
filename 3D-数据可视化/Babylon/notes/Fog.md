# 1 直接用
```javascript
scene.fogEnabled = true;(默认就是true)
scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
scene.fogDensity = 0.01;
scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
```


# 2 详细设置
## 雾的类型
- BABYLON.Scene.FOGMODE_NONE - 默认设置，雾未被启用
- BABYLON.Scene.FOGMODE_EXP - 雾的强度会根据指数函数变化
- BABYLON.Scene.FOGMODE_EXP2 - 强度变化更快
- BABYLON.Scene.FOGMODE_LINEAR - 雾的强度会线性变动


**选择了 `EXP`， `EXP2` 模式，才能设置强度 `fogDensity`，强度默认是 0.1**

**选择了 `LINEAR`，才可以设置雾的范围 `fogStart`，`fogEnd`**

就是说， `EXP` 模式下，你可以指定强度（不能控制范围），或者 `LINEAR` 模式下，才能指定范围（强度将无效），==两者只能任选一个==，但是无论哪种模式，颜色都是你可以随时控制的，

如
```javascript
scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
scene.fogStart = 20.0;
scene.fogEnd = 60.0;
scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
```