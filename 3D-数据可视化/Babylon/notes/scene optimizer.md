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

## SceneOptimizer
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
