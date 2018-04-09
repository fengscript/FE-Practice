```javascript
var index;
var arr = [];
for (index = 0; index < 3; index++) {

    arr[index] = function () {
        console.log(index);
    }

}
console.log(arr);

arr.map(function  (i) {
    i()
})
```

