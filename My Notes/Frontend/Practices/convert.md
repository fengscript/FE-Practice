```js
var a = {name: ' young', age: 18, gender: '  ', a: ''};

function convert(obj){ var temp = {};

​```
for( i in obj ){
    if(typeof obj[i] === 'string' && obj[i].trim().length === 0 ){
                                    /^\\\\s*$/.test(obj[i]) === true
        temp[i] = 'young';
        continue;
    }

    temp[i] = obj[i];
}

return temp;
​```

}

var result = convert(a);

console.log(result); //{name: 'young', age: 18, gender: 'young'}
```

