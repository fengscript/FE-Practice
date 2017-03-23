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

