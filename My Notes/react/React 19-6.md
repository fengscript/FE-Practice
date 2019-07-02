# 1 JSX & Component

> 由于 `JSX` 编译后会调用 `React.createElement` 方法，所以在你的 `JSX` 代码中必须首先声明 `React` 变量

```jsx
const OriginFunction = name => {
  return <h3>I will show you OriginFunction - {name}</h3>;
};

const Functional = ({ name }) => {
  return <h3>I will show you Functional - {name}</h3>;
};

//use

{
  Test.OriginFunction("fyg");
}
<Test.Functional name="FYG" />;
```

有效的 React 组件接收唯一带有数据的 ==props（代表属性）对象== 与并返回一个 React 元素。这类组件被称为函数组件

_所以，函数式组件接受 props 时候要解构_

# 2 Hooks

WHY？

- 跨组件复用含状态的逻辑 （Render props 或者 高阶组件）

  > Hooks，可以把含有 state 的逻辑从组件中提取抽象出来，以便于独立测试和复用，Hooks 允许在不更改组件结构的情况下重用有状态的逻辑

- Hooks 允许根据相关的部分（例如设置订阅或获取数据）将一个组件拆分为更小的函数，而不是基于生命周期方法强制拆分

- 在没有类的情况下使用更多 React 的功能

- 逻辑代码的复用

- 减小了代码体积

- 没有 this 的烦恼

`class` 的问题：

- 不能很好的被 minify
- 使热更新的模块（flaky ）变得不稳定和不可靠
- 造成了太多不必要的组件更新

redux-hook：<https://codesandbox.io/s/react-hook-redux-zvx57>

> Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数

## 2.1 走起

`useState`

- 返回：一对当前状态和一个让你更新它的函数的值
- 参数：state 的 init 值
- `const [count, setCount] = useState(0);`

调用这个方法时候：

```react
<button
  onClick={() => {
    setCount(count + 1);
  }}>
  Click Me
</button>
```



`useEffect`

```javascript
useEffect(() => {
  //
  return () => {
    //
  };
}, [dependencies]);
```

- 返回：一个函数来指定如何“清除”副作用
  **这个函数会在会在组件销毁或者后续渲染重新执行副作用函数时被调用****
  
  
  
  > 所谓 Effect，拉取数据，修改 DOM 等有副作用称为 Effect

> `useEffect` 函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途

默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候



useEffect 中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是异步执行的，而之前的 componentDidMount 或 componentDidUpdate 中的代码则是同步执行的



执行时机：在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作



每次重新渲染都要执行一遍这些副作用函数，显然是不经济的。为了跳过一些不必要的计算，给 `useEffect` 传入一个依赖：

```react
useEffect(()=>{
  alert(count+1)
},[count])
```



要是只传入一个空数组 `[ ]` ，可以让组件只在首次渲染的时候执行这个 `useEffect` ，但是容易造成 bug



## 2.2 Custom Hooks

Hook 是一种复用状态逻辑的方式，它不复用 `state` 本身，所以自定义 Hook 的逻辑在别处调用时， `state` 是独立不相关的

emmm，约定，函数名以 `use`开头，比如：

```javascript
import React, { useState, useEffect } from "react";

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 使用

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  );
}
```

## 2.3 其他 Hook

- `useCallback` 返回一个 memoized 回调函数, 该回调函数仅在某个依赖项改变时才会更新
  ```javascript
  const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  }, [a, b]);
  ```
- `useRef` 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变
  `const refContainer = useRef(initialValue);`

  本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”，useRef 可以很方便地保存任何可变值
  
  > 如果你将 ref 对象以 <div ref={myRef} /> 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。


- `useContext` 不使用组件嵌套就可以订阅 React 的 Context
- `useReducer` 通过 reducer 来管理组件本地的复杂 state
- `useLayoutEffect` 会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新

这里有有用的 FQ：
https://react.docschina.org/docs/hooks-reference.html#usereducer

# 生命周期

- [**componentDidMount()**](https://react.docschina.org/docs/react-component.html#componentdidmount)
- [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
- [**componentDidUpdate()**](https://react.docschina.org/docs/react-component.html#componentdidupdate)
- [**componentWillUnmount()**](https://react.docschina.org/docs/react-component.html#componentwillunmount)

#### <http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>



# render proops

那些写成 class 的组件，它们本身包含了状态，所以复用这类组件就变得很麻烦

渲染属性指的是使用一个值为函数的 prop 来传递需要动态渲染的 nodes 或组件