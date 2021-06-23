```JS
// method 1 delete
var target = {name: "yong", age: 18, gender: 'man'};

function omit1(target, arr){

    var tempObj = {...target};

    for(var i in tempObj){
        if(arr.includes(i)){
            delete tempObj[i];
        }
    }


    return tempObj;
};


var result = omit1(target, ['age']);

// method 2 add
function omit2(target, arr){
    var tempObj = {};

    for(var i in target){
        if(!arr.includes(i)){
            tempObj[i] = target[i];
        }
    }


    return tempObj;
};
var result2 = omit2(target, ['age']);


// method 3 ...
function omit3(target, arr){
    eval(`var {${arr.join(',')}, ...rest} = ${JSON.stringify(target)}`);
//     eval(`var {${arr.join(',')}, ...rest} = ` + JSON.stringify(target));
    
    return rest;
};


var result3 = omit3(target, ['age', 'name']);
console.log(result3); // {name: "yong", gender: "man"}
console.log(target);
```

