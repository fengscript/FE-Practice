# AnimationBox

```js
/*PARAMS
* 1 name
* 2 property concerned. This can be any mesh property, depending upon what you want to change. Here we want to scale an object on the X axis, so it will be “scaling.x”.
* 3 每秒帧数
* 4 Type of change
* 5 Type of behavior
*
*
* new Animation(name, targetProperty, framePerSecond, dataType, loopMode, enableBlending)
*/

// 创建一个动画对象
var animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

// 创建一个动作序列
  // 关键帧属性必须为 frame, value
var keys = []; 
  keys.push({
    frame: 0,
    value: 0
  });

  keys.push({
    frame: 50,
    value: Math.PI
  });

  keys.push({
    frame: 100,
    value: Math.PI*2
  });

// 动作序列绑定到动画对象
animationBox.setKeys(keys);

// 动画对象链接到物体对象
box1.animations = [];
box1.animations.push(animationBox);

//启动动画
scene.beginAnimation(box1, 0, 100, true);
```

其中，`dataType` ：

- BABYLON.Animation.ANIMATIONTYPE_FLOAT (a translation)
- BABYLON.Animation.ANIMATIONTYPE_VECTOR2 (a direction)
- BABYLON.Animation.ANIMATIONTYPE_VECTOR3
- BABYLON.Animation.ANIMATIONTYPE_QUATERNION
- BABYLON.Animation.ANIMATIONTYPE_MATRIX
- BABYLON.Animation.ANIMATIONTYPE_COLOR3

**在做相机动画时，要 `BABYLON.Animation.ANIMATIONTYPE_VECTOR3`**

## easeFunction
6.5 缓动函数

babylon 提供的缓动函数：

- BABYLON.CircleEase()
- BABYLON.BackEase(amplitude)
- BABYLON.BounceEase(bounces, bounciness)
- BABYLON.CubicEase()
- BABYLON.ElasticEase(oscillations, springiness)
- BABYLON.ExponentialEase(exponent)
- BABYLON.PowerEase(power)
- BABYLON.QuadraticEase()
- BABYLON.QuarticEase()
- BABYLON.QuinticEase()
- BABYLON.SineEase()
可以使用 EasingMode 属性来改变缓动函数的进出行为：

- BABYLON.EasingFunction.EASINGMODE_EASEIN
- BABYLON.EasingFunction.EASINGMODE_EASEOUT
 BABYLON.EasingFunction.EASINGMODE_EASEINOUT

```js
var animationTorus = new BABYLON.Animation("torusEasingAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

var nextPos = torus.position.add(new BABYLON.Vector3(-80, 0, 0));

var keysTorus = [];
keysTorus.push({ frame: 0, value: torus.position });
keysTorus.push({ frame: 120, value: nextPos });
animationTorus.setKeys(keysTorus);

// Creating an easing function
var easingFunction = new BABYLON.CircleEase();

// For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

// Adding the easing function to the animation
animationTorus.setEasingFunction(easingFunction);

// Adding animation to my torus animations collection
torus.animations.push(animationTorus);

//Finally, launch animations on torus, from key 0 to key 120 with loop activated
scene.beginAnimation(torus, 0, 120, true);
```


# 统计进度
如果是 `camera` 上，直接取 `scene.activeCamera.animations[0].currentFrame`，
如果是 `mesh`，从 `scene.beginAnimation` 返回的 `Animatable` 对象中取 `getAnimations()`，
又会返回一个 `RuntimeAnimation` 对象，里面有 `currentFrame`
`getAnimations()[0].currentFrame;`

`beginAnimation`:http://doc.babylonjs.com/api/classes/babylon.scene#beginanimation

```js
var intervalId;
    var anim = scene.beginAnimation(box1, 0, 100, false, 1.0, () => {
        clearInterval(intervalId);
    });

    intervalId = setInterval(() => {
        slider.value = anim.getAnimations()[0].currentFrame;
    }, 16);
```
https://www.babylonjs-playground.com/#4VNNY1