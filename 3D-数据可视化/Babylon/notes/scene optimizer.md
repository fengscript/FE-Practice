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

> engine.setHardwareScalingLevel(1)(越大精度越低)


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

## SceneOptimizerOptions 
- optimizations
- targetFrameRate
- trackerDuration


- addCustomOptimization
- addOptimization


- HighDegradationAllowed
- LowDegradationAllowed
- ModerateDegradationAllowed


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



## helper
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene),
```
它等于

```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene, SceneOptimizerOptions,
function() {
   // 成功之后的回调
}, function() {
   // 失败或者设定的帧率不能达到时候的回调
});
```
即
>var options = new BABYLON.SceneOptimizerOptions();</br>
options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));</br>
var optimizer = new BABYLON.SceneOptimizer(scene, options);

可以用
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene)
```
代替上面一堆


`SceneOptimizerOptions 有三个静态常量：
当目标 `FPS` 达到时，`SceneOptimizer` 就会停止，`SceneOptimizer`一共有三层，会按照以下顺序
```javascript
BABYLON.SceneOptimizerOptions.LowDegradationAllowed()
BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed()
BABYLON.SceneOptimizerOptions.HighDegradationAllowed()
```
依次执行，会在每一层暂停，保证达到稳定的帧数


如：
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(),null,null);
```
这里，返回的 `SceneOptimizer ` 对象的 `autoGeneratePriorities` 会自动设为 `false`

呵呵，截至2018年6月29，以上两种方式都报错，即
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene),

// 或者
BABYLON.SceneOptimizer.OptimizeAsync(scene, SceneOptimizerOptions,
function() {
   // 成功之后的回调
}, function() {
   // 失败或者设定的帧率不能达到时候的回调
});
```

均报错，我是 babylon 3.2，报错
```bash
Uncaught TypeError: this.indices.push is not a function
```



# 进阶设定
`https://www.babylonjs-playground.com/frame.html#KEKCLV` false 时候，可以自定义一系列设置：
```javascript
var myOption = function() {
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
}
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

如
```javascript
// Optimizer
var optimizer = new BABYLON.SceneOptimizer(scene, options);
//Option
var options = new BABYLON.SceneOptimizerOptions(60, 1000);
//添加一些系统预留的优化项
options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));

//自己添加一些自定义优化项
// 比如 groundMaterial.reflectionTexture 这个场景里面有地面反射，这里可以关了试试
options.addCustomOptimization(function () {
    environment.groundMaterial.reflectionTexture = null;
    return true;
}, function () {
    return "关闭地面反射";
});
options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1.5));
options.addCustomOptimization(function () {
    environment.ground.setEnabled(false);
    return true;
}, function () {
    return "算了，连地面也去掉吧";
});



//一些事件勾子
optimizer.onSuccessObservable.add(function () {
    console.log("State: Success");
});
optimizer.onNewOptimizationAppliedObservable.add(function (optim) {
    console.log("正在进行 - " + optim.getDescription(););
});
optimizer.onFailureObservable.add(function () {
    console.log("State: Failed. Frame rate was " + optimizer.currentFrameRate;);
})
```
来自于：https://www.babylonjs-playground.com/#3Q8PCL


## other

```javascript
var btnModerate_Click = function () {
console.log("optimizer is running");
BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(60), function () {
        console.log("scene optimized: moderate");
    }, function() {
        console.log("failure");
    });
}

var btnHigh_Click = function () {
console.log("optimizer is running");
BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(60), function () {
        console.log("scene optimized: high");
    }, function() {
        console.log("failure");
    });
}

var btn = document.createElement("button");
btn.textContent = "Moderate";
btn.style.top = "70px";
btn.style.right = "80px";
btn.style.position = "absolute";
btn.addEventListener("click", btnModerate_Click);

document.body.appendChild(btn);

var btn2 = document.createElement("button");
btn2.textContent = "High";
btn2.style.top = "70px";
btn2.style.right = "200px";
btn2.style.position = "absolute";
btn2.addEventListener("click", btnHigh_Click);

document.body.appendChild(btn2);

```
包括 这样子，也会报错https://www.babylonjs-playground.com/#1CTPII#3