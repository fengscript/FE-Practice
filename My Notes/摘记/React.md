JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖

**React.createElement**

返回一个 react 元素对象，包含：

- `$$typeof`：Symbol.for('react.element')（暂时只涉及react element）
- type：原生标签类型（h1、p、div等）或者 function（类组件、函数组件等）(还有别的类型，比如React.Fragment、React.Suspense，这里暂不涉及)
- key：列表中标识元素的唯一性
- ref：同 [react ref](https://link.zhihu.com/?target=https%3A//react.docschina.org/docs/refs-and-the-dom.html) 属性
- props：元素的 props 属性（包含 jsx 中写在元素标签上的属性和 **children** 属性）

props.children 指向的是当前 react element 的子节点，这个子节点非常灵活，可以是字符串、函数、react element等

https://zhuanlan.zhihu.com/p/115344190](https://zhuanlan.zhihu.com/p/115344190](https://zhuanlan.zhihu.com/p/115344190))

## Hooks vs Class

- 基于 Classes 的组件，某种程度上不利于 AOT 优化，不利于 minify，也不利于 hot reloading 等能力的稳定性
- 解决「面向生命周期编程」的问题

## useCallback

使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；这样，子组件就能避免不必要的更新

[useMemo与useCallback使用指南_大灰狼的小绵羊哥哥的博客-CSDN博客_usecallback](https://blog.csdn.net/sinat_17775997/article/details/94453167)

useEffect、useMemo、useCallback都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种hooks的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用ref来访问