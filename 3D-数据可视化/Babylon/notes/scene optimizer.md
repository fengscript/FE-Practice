# 1 基础使用
实例化一个 `BABYLON.SceneOptimizer`；它 **最少** 需要两个参数 `scene` ，和一个 `BABYLON.SceneOptimizerOptions` 对象
```javascript
var options = new BABYLON.SceneOptimizerOptions();
options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));

// Optimizer
var optimizer = new BABYLON.SceneOptimizer(scene, options);
```

> SceneOptimizer 其实有四个参数 : 
> - scene, 
> - 要使用 SceneOptimizer 的 options,
> - 是否优生成 SceneOptimization property 而不是读取之前的值，默认 true
> - 是否将 optimizer 运行在改进模式下 默认 false

## SceneOptimizer 对象
- optimizations 最近运行的 optimizations 列表
- targetFrameRate   需要达到的梦幻帧率（默认60）
- trackerDuration   2次检测的间隔时间（默认 2000ms）
- currentFrameRate  获取 SceneOptimizer 检测下的最近的帧率（只读）
- currentPriorityLevel  获取最近运行的优化等级（从0开始）（只读）
- onSuccessObservable   
- onNewOptimizationAppliedObservable
- onFailureObservable

- start()   开始全部 优化进程
- stop()
- reset()   将优化等级恢复为 0
- dispose() 释放资源


## helper
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene),
```
它等于
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(),
function() {
   // On success
}, function() {
   // FPS target not reached
});
```
这里，返回的 `SceneOptimizer ` 对象的 `autoGeneratePriorities` 会自动设为 `false`


## SceneOptimizerOptions

当目标 `FPS` 达到时，`SceneOptimizer` 就会停止，`SceneOptimizer`一共有三层，会按照以下顺序
```javascript
BABYLON.SceneOptimizerOptions.LowDegradationAllowed()
BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed()
BABYLON.SceneOptimizerOptions.HighDegradationAllowed()
```
依次执行，会在每一层暂停，保证达到稳定的帧数

### properties
- targetFrameRate: a number defining the FPS you want to achieve (60 by default)
- optimizations: an array of BABYLON.SceneOptimization objects.
- trackerDuration: time in milliseconds between passes (2000 by default)

### 一些开箱即用的优化配置
- BABYLON.TextureOptimization(priority, maximumSize): This optimization tries to reduce the size of render textures.
- BABYLON.HardwareScalingOptimization(priority, maximumScale): This optimization increments or decrements the value of hardware scaling. This is a really aggressive optimization that could really help if you are GPU bound.
- BABYLON.ShadowsOptimization(priority): This optimization disables shadows (It will turn them on if the optimizer is in improvement mode (see below)).
- BABYLON.PostProcessesOptimization(priority): This optimization disables post-processes (It will turn them on if the optimizer is in improvement mode (see below)).
- BABYLON.LensFlaresOptimization(priority): This optimization disables lens flares (It will turn them on if the optimizer is in improvement mode (see below)).
- BABYLON.ParticlesOptimization(priority): This optimization disables particles (It will turn them on if the optimizer is in improvement mode (see below)).
- BABYLON.RenderTargetsOptimization(priority): This optimization disables render targets (It will turn them on if the optimizer is in improvement mode (see below)).
- BABYLON.CustomOptimization(priority): This optimization will call two callbacks when required:
    - onApply(scene, optimizer): A custom callback used to apply custom optimizations. It must return true if all optimizations where applied
    - onGetDescription(): This callback must return a string describing the action of the optimization

对以上的配置项，不同优化等级细致设置如下：
- BABYLON.SceneOptimizerOptions.LowDegradationAllowed():
    - Level 0: ShadowsOptimization and LensFlaresOptimization
    - Level 1: PostProcessesOptimization and ParticlesOptimization
    - Level 2: TextureOptimization(2, 1024)
- BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed():
    - Level 0: ShadowsOptimization and LensFlaresOptimization
    - Level 1: PostProcessesOptimization and ParticlesOptimization
    - Level 2: TextureOptimization(2, 512)
    - Level 3: RenderTargetsOptimization
    - Level 4: HardwareScalingOptimization(4, 2)
- BABYLON.SceneOptimizerOptions.HighDegradationAllowed():
    - Level 0: ShadowsOptimization and LensFlaresOptimization
    - Level 1: PostProcessesOptimization and ParticlesOptimization
    - Level 2: TextureOptimization(2, 256)
    - Level 3: RenderTargetsOptimization
    - Level 4: HardwareScalingOptimization(4, 4)

# 进阶设定
`https://www.babylonjs-playground.com/frame.html#KEKCLV` false 时候，可以自定义一系列设置：
```javascript
var result = new BABYLON.SceneOptimizerOptions(60, 2000);

var priority = 0;
result.optimizations.push(new BABYLON.ShadowsOptimization(priority));
result.optimizations.push(new BABYLON.LensFlaresOptimization(priority));

// Next priority
priority++;
result.optimizations.push(new BABYLON.PostProcessesOptimization(priority));
result.optimizations.push(new BABYLON.ParticlesOptimization(priority));

// Next priority
priority++;
result.optimizations.push(new BABYLON.TextureOptimization(priority, 256));

// Next priority
priority++;
result.optimizations.push(new BABYLON.RenderTargetsOptimization(priority));

// Next priority
priority++;
result.optimizations.push(new BABYLON.HardwareScalingOptimization(priority, 4));

return result;
```

## 也可以自己包装一哈
```javascript
function mySceneOptimization(priority) {
  if (typeof priority === "undefined") {
     priority = 0;
  }

  this.priority = priority;
  this.apply = function (scene) {
    // Work on scene...
    return true;
  };

 this.getDescription = function () {
    return "Applying some changes to the scene";
  };
}
```

> 处于 `improvement` 模式时，`optimizations` 会自动调整它的行为