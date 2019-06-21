# 1 左边固定宽度，右边自适应

```html
<div class="parent">
  <div class="l-child">左边固定1 左边固定2 左边固定3</div>
  <div class="r-child">右边自适应1 右边自适应2 右边自适应3</div>
</div>

<style>
  .parent {
    display: relative;
    background: #ddd;
  }
  .l-child {
    position: absolute;
    width: 100px;
    background: #bbb;
  }
  .r-child {
    margin-left: 100px;
    background: #999;
  }
</style>
```
