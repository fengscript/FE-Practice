内插：内插是数学领域数值分析中的通过已知的离散数据求未知数据的过程或方法 

拟合：根据若干离散的数据，得到一个连续的函数（也就是曲线）或者更加密集的离散方程与已知数据相吻合

时常看到的插值主要分为：线性插值、双线线性插值和三线性插值


# 线性插值
```javascript
for (var i = 0; i < n; i++) {
    x = ((A * i) + (B * (n - i))) / n;
}
```
或者
```javascript
for (var i = 0; i < n; i++) {
    v = i / n;
    x = (A * v) + (B * (1 - v));
}
```
比如简单的应用：
https://en.wikipedia.org/wiki/Smoothstep
```javascript
function smoothstep(x) {
    return (x * x * (3 - 2 * x));
}
for (var i = 0; i < n; i++) {
    v = i / n;
    v = smoothstep(v);
    x = (A * v) + (B * (1 - v));
}
```
# 缓动效果
用 n 次幂即可
```javascript
// 缓动加速
for (var i = 0; i < n; i++) {
    v = i / n;
    v = v * v;
    x = (A * v) + (B * (1 - v));
}
```


减速的
```javascript
for (var i = 0; i < n; i++) {
    v = i / n;
    v = 1 - (1 - v) * (1 - v);
    X = (A * v) + (B * (1 - v));
}
```

# 插值的应用
```javascript
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var ballX = x;
var ballY = y;
resize();

function drawBall() {
  ctx.beginPath();
  // instead of updating the ball position to the mouse position we will lerp 10% of the distance between the balls current position and the mouse position.
  ballX += (x - ballX)*0.1;
  ballY += (y - ballY)*0.1;
  ctx.arc(ballX, ballY, 40, 0, 2*Math.PI);
  ctx.fillStyle = '#9e356a';
  ctx.fill();
}

function loop() {
  ctx.clearRect(0, 0, width, height);
  drawBall();
  requestAnimationFrame(loop);
}

loop();

function touch(e) {
  x = e.originalEvent.touches[0].pageX;
  y = e.originalEvent.touches[0].pageY;
}

function mousemove(e) {
  x = e.pageX;
  y = e.pageY;
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
window.addEventListener('touchstart', touch);
window.addEventListener('touchmove', touch);
window.addEventListener('mousemove', mousemove);
```


# 我自己这么用
在花儿项目(3ds/app/huaban_02)里面，`pc` 上鼠标的移动是对点A的 `x`, `y` 坐标
手机端的传感器则是
```javascript
if (os.isPc) {
    scene.onPointerObservable.add(function (e) {
        _this.ratio.x = -((e.event.x - _this.screenCenter.x) / _this.screenCenter.x).toFixed(2);
        _this.ratio.y = ((e.event.y - _this.screenCenter.y) / _this.screenCenter.y).toFixed(2);
    }, 4);
    // lerp
    var moveX = _this.initPose.alpha + _this.ratio.x * option.limitX;
    var moveY = _this.initPose.beta + _this.ratio.y * option.limitY;
    scene.registerAfterRender(function () {
        if (_this._flag) {
            for (var i = 0; i < option.time; i++) {
                var v = i / option.time;
                // 缓慢减速
                v = 1 - (1 - v) * (1 - v);
                moveX = (camera.alpha * v) - ((_this.initPose.alpha + _this.ratio.x * option.limitX) * (1 - v));
                moveY = (camera.beta * v) + ((_this.initPose.beta + _this.ratio.y * option.limitY) * (1 - v));
            }
            camera.alpha = moveX;
            camera.beta = moveY;
        }
    })
} else {
    // 手机陀螺仪控制

    function pointerDetect_handleOrientation(event) {
        handleOrientationNumber.alpha = Number(event.alpha).toFixed(0);
        handleOrientationNumber.beta = Number(event.beta).toFixed(0);
        handleOrientationNumber.gamma = Number(event.gamma).toFixed(0);

        if (handleOrientationNumber.alpha > 60) {
            handleOrientationNumber.alpha = 60
        }
        if (handleOrientationNumber.alpha < -60) {
            handleOrientationNumber.alpha = -60
        }
        if (handleOrientationNumber.beta > 90) {
            handleOrientationNumber.beta = 90
        }
        if (handleOrientationNumber.beta < 0) {
            handleOrientationNumber.beta = 0
        }
    }

    var mobile_moveX = (option.limitX * Math.sin(handleOrientationNumber.gamma * (3.14 / 180))) + _this.initPose.alpha;
    var mobile_moveY = (option.limitY * Math.sin(handleOrientationNumber.beta * (3.14 / 180))) + _this.initPose.beta;
    scene.registerAfterRender(function () {
        if (_this._flag) {
            mobile_moveX += (_this.initPose.alpha - ((option.limitX * Math.sin(handleOrientationNumber.gamma * (3.14 / 180)))) - mobile_moveX) * option.easeNum;
            // mobile_moveX += (((option.limitX * Math.sin(handleOrientationNumber.gamma * (3.14 / 180))) + _this.initPose.alpha) - mobile_moveX) * option.easeNum;
            mobile_moveY += (_this.initPose.beta - ((option.limitY * Math.sin(handleOrientationNumber.beta * (3.14 / 180)))) - mobile_moveY) * option.easeNum;
            camera.alpha = mobile_moveX;
            camera.beta = mobile_moveY;
        }
    });
}
```




# other


> CSS3动画中的 `time-function` 贝塞尔是三次的，三次贝塞尔会有两个控制点

```javascript
// Y(t) = (3 * y1 - 3 * y2 + 1) + (3 * y2 - 6 *y1) * Math.pow(t,2) + 3 * y1 * t
function UnitBezier(p1x, p1y, p2x, p2y) {
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx - this.bx;
    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;
}
UnitBezier.prototype = {
    sampleCurveX: function (t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    },
    sampleCurveY: function (t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    }
}
```
