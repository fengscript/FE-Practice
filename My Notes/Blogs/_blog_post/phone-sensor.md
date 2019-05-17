---
title: 手机端摇一摇功能实现
date: 2018-12-20 00:00:00
tags: 
    - javascript
    - phone
toc: true
categories: 
    - 前端
---

# 概览
我们可以用 H5 添加的传感器API判断移动设备的角度、加速度等数据，比如摇一摇这个功能

移动设备利用 `陀螺仪` 实现重力感应的数据获取。

<!-- more -->

主要会用到以下接口：
- `DeviceOrientationEvent` ：获取设备在各个方向的偏转角度
- `DeviceMotionEvent` ： 获取设备移动的加速度

**你可以从 F12 控制台 右上角 `点点点菜单` ——> `More tools` ——> `Sersors` 调出谷歌浏览器自带的移动设备传感器的模拟器，然后在下面的  `Orientation`  里面选任意角度就可以很方便在PC上进行调试**



# 1 偏转角度 `DeviceOrientationEvent` 

`deviceorientation` 中有以下属性：
- `absolute`: 设备是提供的旋转数据是否是绝对定位 (true / false)
- `alpha`: 绕z轴旋转的角度（范围在0-360之间）的数字
- `beta`: 绕x轴旋转（范围在－180到180之间）的数字
- `gamma`: 绕y轴旋转（范围在－90到90之间）的数字

使用：

```javascript
window.addEventListener('deviceorientation', function(event) {
  console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
});
```


# 2 加速度 `DeviceMotionEvent` 

`deviceorientation` 中有以下对象：
- `acceleration`: 设备在 `X` ,`Y` ,`Z` 轴方向上加速度
    - 有 `x` , `y`, `z` 三个值
- `accelerationIncludingGravity `: 设备在 `X`, `Y`, `Z` 轴方向上带重力的加速度
- - 有 `x` , `y`, `z` 三个值
- `rotationRate`: 设备在 `alpha`，`beta`， `gamma轴方向上旋转的速率`
- - 有 `alpha` , `beta`, `gamma` 三个值
- `interval`: 从设备获取数据的频率



`accelerationIncludingGravity` 是由用户引起的设备的加速度和由重力加速度的总和，它在部分没有陀螺仪的设备中是唯一可用值，所以 **需要检测加速度的时候，最好直接用 `e.accelerationIncludingGravity`**


使用：

```javascript
window.addEventListener("devicemotion", handleMotion, false);

function handleMotion(e) {
    let acceleration = e.acceleration;
    let accelerationIncludingGravity = e.accelerationIncludingGravity;
    let rotationRate = e.rotationRate;
    let interval = e.interval;

    let x = acceleration.x;
    let y = acceleration.y;
    let z = acceleration.z;

    let a = rotationRate.alpha;
    let b = rotationRate.beta;
    let g = rotationRate.gamma;
    console.log(`【devicemotion】alpha: ${a}---beta: ${b}---gamma: ${g}---刷新频率: ${interval}`)
    console.log(`【devicemotion acceleration】x: ${x}---y: ${y}---z: ${z}`)
}
```



# 3 移动设备的摇一摇

比如，两种实现监控摇一摇的操作

```javascript
//使用DeviceOrientation事件, 本质是计算偏转角
if(window.DeviceOrientationEvent){
    var lastAcc;    // 用来存储上一次的deviceorientation事件
    $(window).on('deviceorientation', function(event) {
        var delA = Math.abs(event.alpha - lastAcc.alpha);    // alpha轴偏转角
        var delB = Math.abs(event.beta - lastAcc.beta);    // beta轴偏转角
        var delG = Math.abs(event.gamma - lastAcc.gamma);    // gamma轴偏转角
        if ( (delA > 15 && delB > 15) || (delA > 15 && delG > 15) || (delB > 15 || delG > 15)) {
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是任意两个轴篇转角度大于15度
            alert('摇了');
        }
        lastAcc = event;    // 存储上一次的event
    });
```


```javascript
//可以根据加速度去计算)
if(window.DeviceMotionEvent) {
    var speed = 25;    // 用来判定的加速度阈值，太大了则很难触发
    var x, y, z, lastX, lastY, lastZ;
    x = y = z = lastX = lastY = lastZ = 0;

    window.addEventListener('devicemotion', function(event){
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是用户设备的加速度大于我们设置的阈值
            alert('摇了');
        }
        lastX = x;
        lastY = y;
    }, false);
}
```



# 其他

检测设备是否支持
```javascript
if (window.DeviceOrientationEvent) { 
   // Supported
} else { 
   // Not supported 
}
```


参考：

https://juejin.im/post/59741e6f6fb9a06bca0bd7d1#heading-2

https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceOrientationEvent