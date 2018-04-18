# My Note
## 临时禁用
首先，实例化时候：
```javascript
var albumScroll = null;
function loadScroll() {
    albumScroll = new IScroll('#containerSlider', {});
    siderScroll = new IScroll('#asideSlider', {});
}
```
然后打印发现  `albumScroll` 有个 `enable` 属性， `false` 掉就禁用了滚动；