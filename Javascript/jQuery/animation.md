## 1 判断是否处于动画中，防止动画重复

```js
if(!$("element").is(":animated")){
    bulabulabula
}
```

## 2 停止动画

```js
$("element").stop(stopAll:<Boolean>, goToEnd:<Boolean>)
```
paras:
1. 规定是否停止被选元素的所有加入队列的动画
2. 规定是否允许完成当前的动画