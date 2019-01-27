文档是 `markdown` 转的 `pdf`，代码、文字都可以直接复制的

`BABYLON.SceneOptimizer` 会 **自动判断** 如果不能达到默认的60帧 或者 你设定的一个帧率 就会 **自动** 逐层降低材质大小啊 粒子啊什么的 让整体运行达到你设定的帧率，
这样子我们就 **不需要想办法判断手机的处理器、性能什么的，也能让他自己在低端手机上尽量稍微降低一下材质而流畅运行**



# 1 起手直接用
## 简约式用法
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene,	OptimizerOptions(), function() {
    console.log("Optimize Success")
}, function() {
    console.log("Optimize Fail")
});
function OptimizerOptions() {
    var result = new BABYLON.SceneOptimizerOptions(60, 1000);
    result.optimizations.push(new BABYLON.TextureOptimization(0, 256));
    result.optimizations.push(new BABYLON.PostProcessesOptimization(1));
    result.optimizations.push(new BABYLON.LensFlaresOptimization(2));
    result.optimizations.push(new BABYLON.ShadowsOptimization(3));
    result.optimizations.push(new BABYLON.RenderTargetsOptimization(4));
    result.optimizations.push(new BABYLON.ParticlesOptimization(5));
    result.optimizations.push(new BABYLON.RenderTargetsOptimization(6));
    result.optimizations.push(new BABYLON.HardwareScalingOptimization(7, 4));
    return result;
}
```
这些优化项大家看名字可以大概猜出来功能，0 ，1 ，2 ，3就是优先值，你可以自己设定这些优化项他们在第几层时候触发，有第二个参数的，就是指定要达到的效果，比如：
- `TextureOptimization` 第二个参数，越大材质越精细，越小越升资源
- `HardwareScalingOptimization` 降低 `mesh` 精细度，数值越大，模型越糊，我觉得这个超过2就已经糊的不能看了，大家可以试试看

`SceneOptimizerOptions` 里面的参数，第一个是你想要达到的帧数，当目前模型不在这个帧数时候，就会依次自动按下面你设定的优先级进行触发，第二个参数是时间，多少毫秒运行一次


比如上面，`HardwareScalingOptimization` 第二个参数已经成 `4` 了，大家可以把 `SceneOptimizerOptions` 的第一个参数帧数设置成 `100`（当然达不到，电脑上最高60帧），然后在你的任何一个模型上跑一下看看，模型会被疯狂虐待模糊。。。  
我建议的是 `HardwareScalingOptimization` 第二个参数设置 2 就可以，我们主要针对 `移动端`，材质 `TextureOptimization` 第二个参数大家可以都试试，尽量在 `移动端` 上肉眼观察不到有太差的效果时，可以尽量的小， `256` 是官方推荐的数值


## 复杂式自定义
`BABYLON.SceneOptimizer.OptimizeAsync` 只是官方提供的一个 `辅助函数`， 原本更加强大、自定义的设置如下：

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
这个 demo 来自 https://www.babylonjs-playground.com/#3Q8PCL，同样，大家可以把 `目标帧率` 改的丧心病狂一点看看模型具体的反应





# 2 看看原理
主要使用 `BABYLON.SceneOptimizer`，文档在 https://doc.babylonjs.com/how_to/how_to_use_sceneoptimizer

实例化一个 `BABYLON.SceneOptimizer`；它 **最少** 需要两个参数： `scene` ，和一个存了你的配置的 `option` ( `BABYLON.SceneOptimizerOptions`)：
```javascript
// Optimizer
var optimizer = new BABYLON.SceneOptimizer(scene, options);
var options = new BABYLON.SceneOptimizerOptions();
options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));
```
**同时，发挥程序员偷懒的美德，BABYLON 提供了一个辅助函数，经过试验，可以代替上面一堆(当然上面一堆可以更细致的控制)：**

```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene)
```
就一句，完全自动化，系统自动尝试按下面的优化等级将帧率稳定在 60，会逐层进行，在某一层帧率稳定时，便会停止继续优化

可以指定一个优化等级：
```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene, Options(scene, options),
function() {
   // 成功之后的回调
}, function() {
   // 失败或者设定的帧率不能达到时候的回调
});
```
`Level` 里面就是你想要的优化配置，`babylon` 提供了以下默认的优化配置：
- BABYLON.SceneOptimizerOptions.LowDegradationAllowed()
- BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed()
- BABYLON.SceneOptimizerOptions.HighDegradationAllowed()

`LowDegradationAllowed` 降低的效果最少， `Moderate` 是中等 ，`HighDegradationAllowed` 则会狠狠的折腾你的模型和材质让帧率更快更流畅，后面有具体介绍这三个

来一个简单的demo：

```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(),function() {
    console.log('optimizer success');
},function() {
    console.log('optimizer fail')
});
```

## 默认的优化配置

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

`HardwareScalingOptimization` 会降低整体模型精细度，数值越大，越糊，我觉得超过2，就已经糊的看不成了。。

-----

倒霉的是，截至2018年6月29，以上两种方式都报错，即
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

均报错，我试了 babylon 3.2 3.1 3.0，都报错
```
Uncaught TypeError: this.indices.push is not a function
```
所以，配置项要自定义一下

==也有可能是我用的方法不对，或者引用文件问题，大家有试出来正确用法不报错的可以给我说一下==

----


# 2 配置项自定义
以上配置不能很好的达到想要的效果，或者对材质、模型剥削的太狠的时候，我们也可以完全自定义所有的 `option`

首先大家稍微看一下 `BABYLON` 提供的更具体的配置项目：

- BABYLON.TextureOptimization(priority, maximumSize): 减小要渲染的材质大小
- BABYLON.HardwareScalingOptimization(priority, maximumScale): 降低模型精细度
- BABYLON.ShadowsOptimization(priority): 关闭阴影（improvement模式下会打开）
- BABYLON.PostProcessesOptimization(priority): 关闭 post-processes （improvement模式下会打开）【没有具体用，大家有试试的了可以给我说一下】
- BABYLON.LensFlaresOptimization(priority): 关闭镜头光晕（improvement模式下会打开）
- BABYLON.ParticlesOptimization(priority): 关闭粒子（improvement模式下会打开）
- BABYLON.RenderTargetsOptimization(priority): 禁用渲染目标？（improvement模式下会打开）【没有具体用，大家有试试的了可以给我说一下】
- BABYLON.CustomOptimization(priority): 完全自定义配置
    - onApply(scene, optimizer): A custom callback used to apply custom optimizations. It must return true if all optimizations where applied
    - onGetDescription(): This callback must return a string describing the action of the optimization





# 其他

> SceneOptimizer 其实有四个参数 : 
> - scene, 
> - 要使用 SceneOptimizer 的 options,
> - 是否优生成 SceneOptimization property 而不是读取之前的值，默认 true
> - 是否将 optimizer 运行在改进模式下 默认 false


`SceneOptimizer` 可能常用的属性和方法
- optimizations 最近运行的 optimizations 列表
- targetFrameRate   需要达到的梦幻帧率（默认60）
- trackerDuration   2次检测的间隔时间（默认 2000ms）
- currentFrameRate  获取 SceneOptimizer 检测下的最近的帧率（只读）
- currentPriorityLevel  获取最近运行的优化等级（从0开始）（只读）
- onSuccessObservable   事件钩子
- onNewOptimizationAppliedObservable    如上
- onFailureObservable   如上

- start()   开始全部 优化进程
- stop()
- reset()   将优化等级恢复为 0
- dispose() 释放资源


包括 这样子，也会报错
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

大家可以多试试
