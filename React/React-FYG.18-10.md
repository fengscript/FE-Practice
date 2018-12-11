/*
 * @Author: fyg 
 * @Date: 2018-10-25
 * @Last Modified by: fyg
 * @Last Modified time: 2018-12-11 23:18:53
 */


# JSX
可以任意嵌入 `js` 表达式：用 `{ }`
诸如 `2 + 2`， `user.firstName`，`formatName(user)` 都是OK的
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

本质上，`JSX`只是为 `React.createElement(component, props, ...children)` 提供的语法糖：
```javascript
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
//编译为：
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

> 1. 大写开头的 `JSX` 标签表示一个 `React` 组件。这些标签将会被编译为同名变量并被引用，所以如果你使用了 `<Foo />` 表达式，则必须在作用域中先声明 `Foo` 变量

> 2. 由于 `JSX` 编译后会调用 `React.createElement` 方法，所以在你的 `JSX` 代码中必须首先声明 `React` 变量

## 点表示法
`JSX`中可以直接使用 `.` 来引用组件：
```javascript
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```
==这个我觉得很有意思，就可以不用在全局搞一堆 `class XXX extends Components`了==


## 属性
- 使用引号来定义以字符串为值的属性
- 可以使用大括号来定义以 JavaScript 表达式为值的属性

> 在 `js` 中， `true && expression` 总是会评估为 `expression` ，`false && expression` 总是执行为 false 

> `React DOM` 使用 `camelCase` 来定义属性的名称，而不是使用 `HTML` 的属性名称


## `props.children`
```javascript
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```



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

给元素属性上传值时
```javascript
<Element scale = "0" />
//或者
<Element scale = {0} />
```
都可以


### HTML 属性
最好以对象的方式：
```jsx
<span style={{"color":"red"}}></span>
```
不然 `eslint` 会烦你 ： `[eslint] Style prop value must be an object [react/style-prop-object]`

参考这里：https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md



## 组件
组件是构建在元素的基础之上的

是可以被独立划分的、可复用的、独立的模块。

类似于JS当中对function函数的定义，一般接收一个名为 `props` 的输入，然后返回相应的 `React` 元素，再交给 `ReactDOM` ，最后渲染到屏幕上


原生 `HTML` 元素名以`小写字母`开头，而自定义的 `React` 类名以`大写字母`开头，

**组件类只能包含一个顶层标签**


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


### props state
`React` 遇到一个代表用户定义组件的元素时，它将 `JSX` 属性以一个单独对象的形式( `props对象` )传递给相应的组件
> 哎哟我感觉我脑子不太好，这里找了相关的4 、5个地方的文档，然后弄清楚了 函数式定义一个组件 => 调用（实例化）时候从 JSX 的属性向组件中传数据的流动
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
4. `React DOM` 更新 DOM ，使其显示为 `<h1>Hello, Sara</h1>`


**所有 `React` 组件都必须是纯函数，并禁止修改其自身 `props`**

#### state
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

==如果你不在 render() 中使用某些东西，它就不应该在状态中==

#### setState()
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
HTML 的表单元素自然地保留了一些内部状态

### Controlled Components

> 在 HTML 中，表单元素表单元素通常保持自己的状态，并根据用户输入进行更新。
> 
> 我们可以通过使 React 的 state 成为 “单一数据源原则” 来结合这两个形式。然后渲染表单的 React 组件也可以控制在用户输入之后的行为。这种形式，其值由 React 控制的输入表单元素称为“受控组件”。


### textarea
> html中，<textarea> 元素通过它的子节点定义了它的文本值 `<texarea>xxx</texarea>`

而 `react` 中用 `value` 来控制对 `texarea` 元素的赋值，所以更像单行文本输入框：
```javascript
<textarea value={this.state.value} onChange={this.handleChange} />
```

### select
默认选中 `seleted` 的处理: `this.state` 里面的一个 `value`来控制，把这个 `value` 赋搭配 `select`根标签即可：
```javascript
constructor (props) {
  super(props)
  this.state={value:"C"}
}

...
render () {
    return (
      <form>
        <label htmlFor="seltcttest">
          <select onChange={this.handChange} value={this.state.value} name="seltcttest" id="">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>
      </form>
    )
  }
```
当然也可以多选：
```javascript
<select multiple={true} value={['B', 'C']}>
```

#### 多个input
可以用一个事件来控制，给每个 `input` 赋给不同的 `name`，根据 `event.target.name`的值来选择要做什么：

```javascript
handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

render() {
  return (
    <form>
      <label>
        Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={this.state.isGoing}
          onChange={this.handleInputChange} />
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={this.state.numberOfGuests}
          onChange={this.handleInputChange} />
      </label>
    </form>
  );
}
```

## Controlled & Uncontrolled

> 受控组件的值由 props 或 state 传入，用户在元素上交互或输入内容会引起应用 state 的改变。 在state 改变之后重新渲染组件，我们才能在页面中看到元素中值的变化，假如组件没有绑定事件处理函数改变 state ，用户的输入是不会起到任何效果的

> 类似于传统的 DOM 表单控件，用户输入不会直接引起应用 state 的变化，我们也不会直接为非受控组件传入值。想要获取非受控组件，我们需要使用一个特殊的 ref 属性，同样也可以使用 defaultValue 属性来为其指定一次性的默认值


## Listing State Up
> 几个组件需要共用状态数据的情况下，将这部分共享的状态提升至他们最近的父组件当中进行管理

在 React 中，共享 state(状态) 是通过将其移动到需要它的组件的最接近的共同祖先组件来实现的。 这被称为 `“状态提升(Lifting State Up)”`。


> 在一个 React 应用中，对于任何可变的数据都应该循序“单一数据源”原则

> 通常情况下，`state` 首先被添加到需要它进行渲染的组件。然后，如果其它的组件也需要它，你可以提升状态到它们最近的祖先组件。你应该依赖 从上到下的数据流向 ，而不是试图在不同的组件中同步状态

## 组合还是继承？
复用组件代码时，用组合模式而不是继承


## 嵌套子组件
1. `props.children` 属性来直接输出子元素
2. 嵌套 `JSX` 传递子组件
   ```javascript
    function WelcomeDialog() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Welcome
        </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
    );
    }
   ```
   
3. 组件有多个入口时，用自定义属性
  ```javascript
    function SplitPane(props) {
      return (
        <div className="SplitPane">
          <div className="SplitPane-left">
            {props.left}
          </div>
          <div className="SplitPane-right">
            {props.right}
          </div>
        </div>
      );
    }

    function App() {
      return (
        <SplitPane
          left={
            <Contacts />
          }
          right={
            <Chat />
          } />
      );
    }
  ```
  

> 如果要在组件之间复用 UI 无关的功能，我们建议将其提取到单独的 JavaScript 模块中。这样可以在不对组件进行扩展的前提下导入并使用该函数、对象或类。

# 事件
```javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

> 一般情况下，如果你引用一个后面没跟 () 的方法，例如 onClick={this.handleClick} ，那你就应该 绑定(bind) 该方法。

> 引用一个方法是后面没有()，如onClick = {this.handleClick}，就会绑定该方法

就是说，为了在子组件中访问父组件属性和方法，要绑定 `this` 到父组件的 `context`，要么
```javascript
class XXX extends Component {
  constructor(props) {
    super(props);
    this.xxx = this.xxx.bind(this);
  ...
```

要么，在回调中使用一个 `arrow function`：
```javascript
render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

或者在回调中绑定：
```javascript
return (
    <button onClick={(e) => this.handleClick(e).bind(this)}>
      Click me
    </button>
  );
```

## 传参
```javascript
//要么
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

//要么
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```



## 阻止默认行为
不能通过 `return false`，需要显式的：
```javascript
function handleClick(e) {
  e.preventDefault();
  console.log('The link was clicked.');
}
```

# 生命周期钩子
  - componentWillMount()
  - render()
  - componentDidMount() 组件输出到 `DOM` 后会执行钩子
  - componentWillReciveProps()
    - componentWillUpdate()
    - render()
    - componentDidUpdate()
  - componentWillUnmount()


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


# React 思想
- 单一功能原则
在理想状况下，一个组件应该只做一件事情。如果这个组件功能不断丰富，它应该被分成更小的组件

- 单向数据流
  React 中的数据流是单向的，并在组件层次结构中向下传递
  
  > 要构建一个用于呈现数据模型的静态版本的应用程序，你需要创建能够复用其他组件的组件，并通过 props 来传递数据。props 是一种从父级向子级传递数据的方法。如果你熟悉 state 的概念， 在创建静态版本的时候不要使用 state。State 只在交互的时候使用，即随时间变化的数据。由于这是静态版本的应用，你不需要使用它。
  
==props 都是从父级向子级传递数据==
==State 只在交互的时候使用==

> 你可以自顶向下或者自底向上构建应用，在较为简单的例子中，通常自顶向下更容易，而在较大的项目中，自底向上会更容易并且在你构建的时候有利于编写测试。