# Preview

我们上传一个大文件之后，需要实时监听他的进度，并且待进度进行到100的时候停止监听。

对于一般的做法我们可以采用短轮询的方式来实现，在对于异步请求的封装的时候，如果我们采用Promise的方式，那么我们一般的做法就可以采用编写一个用于轮询的方法，获取返回值进行处理，如果进度没有完成则延迟一定时间再次调用该方法，同时在出现错误的时候需要捕获错误并处理。

显然，这样的处理方式无疑在一定程度上给开发者带来了一定开发和维护成本，因为这个过程更像是我们在观察一个事件，这个事件会多次触发并让我感知到，不仅如此还要具备取消订阅的能力，Promise在处理这种事情时的方式其实并不友好，而RxJS对于异步数据流的管理就更加符合这种范式。

优点：

状态改变就不会再变，任何时候都能得到相同的结果 将异步事件的处理流程化，写法更方便 缺点：

无法取消 错误无法被try catch（但是可以使用.catch方式） 当处于pending状态时无法得知现在处在什么阶段

直接调用 Generator函数并不会执行，也不会返回运行结果，而是返回一个遍历器对象（Iterator Object） 依次调用遍历器对象的next方法，遍历 Generator函数内部的每一个状态

响应式编程（Reactive Programming），它是一种基于事件的模型。在上面的异步编程模式中，我们描述了两种获得上一个任务执行结果的方式，一个就是主动轮训，我们把它称为 Proactive 方式。另一个就是被动接收反馈，我们称为 Reactive。简单来说，在 Reactive 方式中，上一个任务的结果的反馈就是一个事件，这个事件的到来将会触发下一个任务的执行。

响应式编程的思路大概如下：你可以用包括 Click 和 Hover 事件在内的任何东西创建 Data stream（也称“流”，后续章节详述）。Stream 廉价且常见，任何东西都可以是一个 Stream：变量、用户输入、属性、Cache、数据结构等等。

作为响应式编程的核心，流的本质是一个按时间顺序排列的进行中事件的序列集合。

对于一流或多个流来说，我们可以对他们进行转化，合并等操作，生成一个新的流，在这个过程中，流是不可改变的，也就是只会在原来的基础返回一个新的stream。

## Iteartor

可以让用户透过特定的接口巡访容器中的每一个元素而不用了解底层的实现。

`Iterator`作用：

- 为各种数据结构，提供一个统一的、简便的访问接口；
- 使得数据结构的成员能够按某种次序排列；
- 为新的遍历语法 `for...of` 实现循环遍历

在许多文章中，有人会喜欢把迭代器和遍历器混在一起进行概念解析，其实他们表达的含义是一致的，或者可以说（迭代器等于遍历器)。

## Observable

表示一个概念，这个概念是一个可调用的未来值或事件的集合。它能被多个observer订阅，每个订阅关系相互独立、互不影响。

我们可以调用Observable.create方法来创建一个Observable，这个方法接受一个函数作为参数，这个函数叫做 producer 函数， 用来生成 Observable 的值。这个函数的入参是 observer，在函数内部通过调用 observer.next() 便可生成有一系列值的一个 Observable。

```jsx
const observer = {
next: function(value) {
console.log(value);
 },
error: function(error) {
console.log(error)
 },
complete: function() {
console.log('complete')
 }
}
```

# Subject (主体)

它是一个代理对象，既是一个 Observable 又是一个 Observer，它可以同时接受 Observable 发射出的数据，也可以向订阅了它的 observer 发射数据，同时，Subject 会对内部的 observers 清单进行多播(multicast)

Subjects 是将任意 Observable 执行共享给多个观察者的唯一方式

# 单播

普通的Observable 是单播的，那么什么是单播呢？

单播的意思是，每个普通的 Observables 实例都只能被一个观察者订阅，当它被其他观察者订阅的时候会产生一个新的实例。也就是普通 Observables 被不同的观察者订阅的时候，会有多个实例，不管观察者是从何时开始订阅，每个实例都是从头开始把值发给对应的观察者。

# 多播

那么如果实现多播能力呢，也就是实现我们不论什么时候订阅只会接收到实时的数据的功能。

可能这个时候会有小伙伴跳出来了，直接给个中间人来订阅这个源，然后将数据转发给A和B不就行了

```jsx
const source = Rx.Observable.interval(1000).take(3);
const subject = {
observers: [],
 subscribe(target) {
this.observers.push(target);
 },
next: function(value) {
this.observers.forEach((next) => next(value))
 }
}

source.subscribe(subject);

subject.subscribe((value) => console.log('A ' + value))

setTimeout(() => {
 subject.subscribe((value) => console.log('B ' + value))
}, 1000)

// A 0
// A 1
// B 1
// A 2
// B 2
```

同样我们结合现实场景来进行理解，假设有我们需要使用它来维护一个状态，在它变化之后给所有重新订阅的人都能发送一个当前状态的数据，这就好比我们要实现一个计算属性，我们只关心该计算属性最终的状态，而不关心过程中变化的数

我们知道普通的Subject只会在当前有新数据的时候发送当前的数据，而发送完毕之后就不会再发送已发送过的数据，那么这个时候我们就可以引入BehaviorSubject来进行终态维护了，因为订阅了该对象的观察者在订阅的同时能够收到该对象发送的最近一次的值