/*
 * @Author: fyg 
 * @Date: 2018-10-25
 * @Last Modified by: fyg
 * @Last Modified time: 2018-10-30 20:58:12
 */


# JSX
嵌入表达式：用 `{ }`
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
> 在 `js` 中， `true && expression` 总是会评估为 `expression` ，`false && expression` 总是执行为 false 



# 组件
## 元素
元素是React DOM之中描述UI界面的最小单位

> 可以把React元素理解为DOM元素；但实际上，React元素只是JS当中普通的对象
> 

```javascript
// 先用 JSX 语法描述一个元素
const element = <h1>Hello, world</h1>;
// 也就相当于是调用React的方法创建了一个对象
const element = React.createElement('h1', null, 'Hello, world');
```



# 组件
组件是构建在元素的基础之上的

是可以被独立划分的、可复用的、独立的模块。

类似于JS当中对function函数的定义，一般接收一个名为 `props` 的输入，然后返回相应的 `React` 元素，再交给 `ReactDOM` ，最后渲染到屏幕上


原生 `HTML` 元素名以`小写字母`开头，而自定义的 `React` 类名以`大写字母`开头，比如 `HelloMessage` 不能写成 `helloMessage`。除此之外还需要注意 **组件类只能包含一个顶层标签**


分 函数式组件 或者类组件

函数式组件：定义一个接收 `props` 传值，返回React元素的方法
```javascript

function HelloMessage(props) {
    return <h1>Hello World!</h1>;
}
//还可以
const Message = props => <h1>Hello,{props}</h1>


//这样子用
const element = <HelloMessage />;
ReactDOM.render(
  element,
  // <HelloMessage />,
  document.getElementById('root')
);
```

类组件：自带一个 `render` 方法，但是传值时候就要用 `this.porps`
```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```


## props state
`React` 遇到一个代表用户定义组件的元素时，它将 `JSX` 属性以一个单独对象的形式( `props对象` )传递给相应的组件
> 哎哟我感觉我脑子不太好，这里找了相关的4 、5个地方的文档，然后弄清楚了 函数式定义一个组件 => 实例化时候从 JSX 的属性向组件中传数据的流动
> 
> http://react.css88.com/docs/components-and-props.html


如：
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
整个流程如下：
1. 调用 `ReactDOM.render()` 方法并向其中传入了 `<Welcome name="Sara" />` 元素。
2. React 调用 `Welcome 组件`，并向其中传入了 `{name: 'Sara'}` 作为 `props 对象`。
3. `Welcome 组件` 返回 `<h1>Hello, Sara</h1>`。
4. `React DOM` 迅速更新 DOM ，使其显示为 `<h1>Hello, Sara</h1>`


**所有 `React` 组件都必须是纯函数，并禁止修改其自身 `props`**

### state
`state` 和 `props` 类似，但是它是类组件私有的，是类定义的组件额外的特性

 有些容器组件需要定义 `state` 来更新和修改数据。 而子组件只能通过 `props` 来传递数据。

又比如，用类定义组件，分别用 `props`、`state`传值时候， `props` 不用构造函数里面放什么方法时候， `constructor`、`super` 就都可以省掉：
```javascript
class TimeShow2 extends Component{
  render(){
    return (
      <div>
        <h3>{this.props.date}</h3>
      </div>
    )
  }
}

class TimeShow3 extends Component{
  constructor(props){
    super(props)

    this.state = {
      date: new Date()
    }
  }

  render(){
    return (
      <div>
        <h3>{this.state.date.toLocaleDateString()}</h3>
      </div>
    )
  }
}


...
render(){
  return {
    <TimeShow2 date = {new Date().toLocaleDateString()}/>
    <TimeShow3 />
  }
}
...

```
>`state` 更新可能是异步的

>React 为了优化性能，有可能会将多个 `setState()` 调用合并为一次更新。

>因为 `this.props` 和 `this.state` 可能是异步更新的，你不能依赖他们的值计算下一个state(状态)。



### setState()
第 2 种 `setState() 的格式`:它接收一个函数，而不是一个对象。该函数接收前一个状态值作为第 1 个参数， 并将更新后的值作为第 2 个参数，避免这种情况：
```javascript
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
因为是异步更新的，可能出错，而改为：
```javascript
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```


## 条件渲染 / 列表
要么：
```javascript
render() {
    const isLogin = this.state.isLogin;
    let button;

    if (isLogin) {
      button = <LogOutBtn onClick={this.handleLogOutClick} />
    } else {
      button = <LogInBtn onClick={this.handleLogInClick} />
    }
    return (
      <div>
        <Greeting isLoggedIn={isLogin} />
        {button}
      </div>
    )
  }
```

要么用内联的 `if`：
```javascript
render(){
  const isLogin = this.state.isLogin;
  return (
    <div>
      <Greeting isLoggedIn={isLogin} />
      {
        this.state.isLogin ? (<LogOutBtn onClick={this.handleLogOutClick} />) : (<LogInBtn onClick={this.handleLogInClick} />)
      }
    </div>
  )
}
```
**组件里面返回 `null` 将不渲染（隐藏）该组件**
```javascript
function Greeting(props) {
  const isLogin = props.isLoggedIn;
  if (isLogin) {
    return null
  }
  return <GuestGreeting />
}
```

> 从组件的 render 方法返回 null 不会影响组件生命周期方法的触发。 例如， componentDidUpdate 仍将被调用。


## List & Key
遍历一个 `list`，然后**对于每一项都返回一个元素即可**
```javascript
const numbers = [1, 2, 3, 4, 5];
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()>{number}</li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

<NumberList numbers={numbers} />
```

`key` 套路同 `vue`，用来提高对数组处理的性能

> `Key` 被用来帮助 `React` 标识哪个项被修改、添加或者移除了。
>
> 如果列表项的顺序可能改变，我们不建议使用索引作为 keys。这可能会对性能产生负面影响，并可能导致组件状态问题。 

默认使用索引作为键(key)。

`key`应该放在数组遍历处理过程中的元素中，而不是展示组件中



## Form
表单元素自然地保留了一些内部状态








## 生命周期方法
  - componentDidMount 组件输出到 `DOM` 后会执行钩子
  - componentWillUnmount


# 事件
```javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

> 一般情况下，如果你引用一个后面没跟 () 的方法，例如 onClick={this.handleClick} ，那你就应该 绑定(bind) 该方法。

> 引用一个方法是后面没有()，如onClick = {this.handleClick}，就会绑定该方法


# Advancee

## Presentational & Container

- 展示组件
> 主要负责组件内容如何展示
> 
> 从props接收父组件传递来的数据
> 
> 大多数情况可以通过函数定义组件声明


- 容器组件
> 主要关注组件数据如何交互
> 
> 拥有自身的state，从服务器获取数据，或与redux等其他数据处理模块协作
> 
> 需要通过类定义组件声明，并包含生命周期函数和其他附加方法

## Controlled & Uncontrolled
> 受控组件的值由 props 或 state 传入，用户在元素上交互或输入内容会引起应用 state 的改变。 在state 改变之后重新渲染组件，我们才能在页面中看到元素中值的变化，假如组件没有绑定事件处理函数改变 state ，用户的输入是不会起到任何效果的

> 类似于传统的 DOM 表单控件，用户输入不会直接引起应用 state 的变化，我们也不会直接为非受控组件传入值。想要获取非受控组件，我们需要使用一个特殊的 ref 属性，同样也可以使用 defaultValue 属性来为其指定一次性的默认值
