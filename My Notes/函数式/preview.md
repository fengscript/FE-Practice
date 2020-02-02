# 1 函数是一等公民
## 删除多余的包裹函数
如
```javascript
httpGet('/post/2', function(json){
  return renderPost(json);
});
```

后面要添加 `error` 参数，做更多处理，就要对 `renderPost` 也处理

```javascript
// 把整个应用里的所有 httpGet 调用都改成这样，可以传递 err 参数。
httpGet('/post/2', function(json, err){
  return renderPost(json, err);
});
```

然而可以改成

```javascript
httpGet('/post/2', renderPost);
```
代码更精简


## 命名要更通用、普遍
如
```javascript
// 只针对当前的博客
var validArticles = function(articles) {
  return articles.filter(function(article){
    return article !== null && article !== undefined;
  });
};

// 对未来的项目友好太多
var compact = function(xs) {
  return xs.filter(function(x) {
    return x !== null && x !== undefined;
  });
};
```

# 2 纯函数

即相同的输入要保证有相同的输出
## `slice` 和 `splice`

### `slice`:
```javascript
arr.slice();
// [0, end]
arr.slice(begin);
// [begin, end]
arr.slice(begin, end);
// [begin, end)
```

删除的范围：[begin, end)

#### 参数：
- begin 可选
从该索引处开始提取原数组中的元素（从0开始）。

如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取。

- end 可选
在该索引处结束提取原数组元素（从0开始）。

提取原数组中索引从 begin 到 end 的所有元素（**包含begin，但不包含end**）。

如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。

如果 end 被省略，则slice 会一直提取到原数组末尾。

如果 end 大于数组长度，slice 也会一直提取到原数组末尾。

#### 返回值
一个含有提取元素的新数组

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice


### `splice`
```javascript
array.splice(start)

array.splice(start, deleteCount) 

array.splice(start, deleteCount, item1, item2, ...)
```

#### 参数：
- start 可选
指定修改的开始位置（从0计数）。

如果超出了数组的长度，则从数组末尾开始添加内容；

如果是负值，则表示从数组末位开始的第几位（从1计数）；

若只使用start参数而不使用deleteCount、item，如：array.splice(start) ，表示删除[start，end]的元素。

如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取。

- deleteCount 可选
整数，表示要移除的数组元素的个数。

如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。

如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。

如果deleteCount被省略，则其相当于(arr.length - start)。

- item1, item2, ... 可选
要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。

#### 返回值
由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

## 典型的例子

一个典型的例子：
```javascript
var xs = [1,2,3,4,5];

// 纯的
xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]


// 不纯的
xs.splice(0,3);
//=> [1,2,3]

xs.splice(0,3);
//=> [4,5]

```

另外一个
```javascript
// 不纯的
var minimum = 21;

var checkAge = function(age) {
  return age >= minimum;
};


// 纯的
var checkAge = function(age) {
  var minimum = 21;
  return age >= minimum;
};
```
> 在不纯的版本中，`checkAge` 的结果将取决于 `minimum` 这个可变变量的值。换句话说，它取决于系统状态（system state）；这一点令人沮丧，因为它引入了外部的环境，从而增加了认知负荷（cognitive load）。

我们需要让函数 **自给自足** ，不会因外部状态改变而改变

所以，也可以让 `minimum ` 成为一个 `immutable` 不可变对象，如：


   
## 1 pure function

仅仅针对输入参数进行操作，所以，没有参数时，只能返回一个常数。

- 纯函数对于给定相同的输入，总是产生相同的输出
- 纯函数没有函数副作用





## 2 避免共享状态

共享状态：任意变量、对象或者内存空间存在于共享作用域下，或者作为对象的属性在各个作用域之间被传递。

共享作用域包括全局作用域和闭包作用域。通常，在面向对象编程中，对象以添加属性到其他对象上的方式在作用域之间共享。

避免共享状态，函数的调用时序不同就不会改变函数的调用结果





## immutable

函数式编程中没有变量，传统变量已经保存的值仍然称为变量，但是它们是常量

const 创建一个变量绑定，让该变量不能再次被赋值。const 并不创建不可变对象。你虽然不能改变绑定到这个变量名上的对象，但你仍然可以改变它的属性，这意味着 const 的变量仍然是可变的，而不是不可变的。

不可变对象完全不能被改变。你可以通过深度冻结对象来创造一个真正的不可变的值

```
const a = Object.freeze({
  foo: 'Hello',
  bar: 'world',
  baz: '!'
});
 
a.foo = 'Goodbye';
// Error: Cannot assign to read only property 'foo' of object Object
```



> 在许多函数式编程语言中，有特殊的不可变数据结构，被称为 trie 数据结构(trie 的发音为 tree)，这一结构有效地深冻结 —— 意味任何属性无论它的对象层级如何都不能被改变。



## Side Effects(副作用)

副作用是指除了函数返回值以外，任何在函数调用之外观察到的应用程序状态改变。副作用包括：

函数式语言不能消除函数副作用，它们只能限制函数副作用



## 高阶函数

函数式编程倾向于复用一组通用的函数功能来处理数据。

在函数式编程里，对任何类型的数据一视同仁。同样的 map() 操作可以 map 对象、字符串、数字或任何别的类型，因为它接受一个函数参数，来适当地操作给定类型。函数式编程通过使用高阶函数来实现这一技巧。



函数式编程通过递归实现循环

```
// simple loop construct
var acc = 0;
for (var i = 1; i <= 10; ++i)
    acc += i;
console.log(acc); // prints 55

// without loop construct or variables (recursion)
function sumRange(start, end, acc) {
    if (start > end)
        return acc;
    return sumRange(start + 1, end, acc + start)
}
console.log(sumRange(1, 10, 0)); // prints 55
```

