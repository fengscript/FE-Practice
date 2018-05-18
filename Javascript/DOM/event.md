## eventDelegate

## addEventListener
第三个参数可以传进去一个对象：
```javascript
{
  once : false,
  captrue: true,
  passive: true
}
```

如：
```javascript
document.getElementById('box').addEventListener('click', function (e) {
  console.log("target :" + e.target);
  console.log("tagName :" + e.target.tagName);
}, {
  once: true,
  captrue: false,
  passive: true
});
```




## removeEventListener
```javascript
var div = document.getElementById('div');
var listener = function (event) {
  /* do something here */
};
div.addEventListener('click', listener, false);
div.removeEventListener('click', listener, false);
```