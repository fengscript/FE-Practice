function existy(x) {
    return x != null;
}

function truthy(x) {
    return (x !== false) && existy(x)
}

// do something when a condition true
function doWhen(cond, action) {
    if (truthy(cond)) return action()
    else return undefined
}




function splat(fn) {
    return function (arr) {
        return fn.apply(null, arr)
    }
}

var addArrParas = splat(function (a, b) {
    console.log(a + b)
})

// addArrParas([1, 2])


function compare(arr) {
    return arr.sort(compareFn)
}

function compareFn(x, y) {
    return y - x
}

function comparator(pred) {
    return function (x, y) {
        if (truthy(pred(x, y))) {
            return -1;
        } else if (truthy(pred(x, y))) {
            return 1
        } else return 0
    }
}


let results = compare([10, -5, 0, 3, -2, 1]);

// console.log(results)