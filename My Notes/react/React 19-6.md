# 1 JSX & Component

>  由于 `JSX` 编译后会调用 `React.createElement` 方法，所以在你的 `JSX` 代码中必须首先声明 `React` 变量



```jsx
const OriginFunction = name => {
  return <h3>I will show you OriginFunction - {name}</h3>;
};

const Functional = ({ name }) => {
  return <h3>I will show you Functional - {name}</h3>;
};

//use

{Test.OriginFunction("fyg")}
<Test.Functional name="FYG"/>
```





有效的 React 组件接收唯一带有数据的  ==props（代表属性）对象== 与并返回一个 React 元素。这类组件被称为函数组件

*所以，函数式组件接受 props 时候要解构*





# 2 Hooks

WHY？

- state 的复用