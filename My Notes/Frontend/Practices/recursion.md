```js
var foo = (arr, str) => {
    if(arr.length === 0){
           return -1;
    }

    if(arr.slice(-1)[0] === str){ 
        return arr.length - 1;
    }

    return foo(arr.slice(0, -1), str)
}

foo(['ab', 'aa', 'seven', 'ddd'], 'xxx')
```

