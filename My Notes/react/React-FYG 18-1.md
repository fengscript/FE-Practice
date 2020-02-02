https://zhuanlan.zhihu.com/p/19896745



**React.js**
React.js 是 React 的核心库，在应用中必须先加载核心库。

**ReactDOM.js** 
ReactDOM.js 是 React 的 DOM 渲染器，React 将核心库和渲染器分离开了，为了在 web 页面中显示开发的组件，需要调用 ReactDOM.render 方法， 第一个参数是 React 组件，第二个参数为 HTMLElement。

**JSX**
JSX 是 React 自定义的语法，最终 JSX 会转化为 JS 运行于页面当中。



# 1 JSX

## 1.1 基础语法

1. 标签必须严格闭合

2. React 可以渲染 HTML 标签 (strings) 或 React 组件 (classes)。

   要渲染 HTML 标签，只需在 JSX 里使用小写字母的标签名。

   ```react
   //HTML组件
   function render() {
     return  <p> hello, React World </p>
   }

   function render() {
     return <ul> 
               <li>list item 1</li>
               <li>list item 2</li>
            </ul>
   }
   ```
   **要渲染 React 组件，需创建一个大写字母开头的本地变量。**

   ```react
   // 定义一个自定义组件
   var CustomComponnet = React.createClass({
     render: function() {
       return <div> custom component </div>
     }
   });

   // 使用自定义组件
   function render() {
       return <p> <CustomComponent/> </p>
   }
   ```

3. JSX 属性可以是字符串、Js变量，传递变量是用花括号，字符串全部用驼峰式：

   ```react
   //普通 JSX 属性
   function render() {
       return <p> <CustomComponent customProps="data"/> </p>
     }
   }

   //传递变量
   function render() {
   	var data = {a: 1, b:2};
   return <p> <CustomComponent customProps={data}/> </p>
   }
   ```

   `class`要用`className`   `for` 要用 `htmlFor`

    `data-*` 和 `aria-*` 两类属性是和 HTML 一致的。

   或者做简单运算：

   ```react
     funtion render() {
       var text = text;
       var isTrue = false;
       var arr = [1, 2, 3];
       return <p>
         {text}
         {isTrue ? "true" : "false"}

         {arr.map(function(it) {
           return <span> {it} </span>
         })}

         </p>
     }
   ```

4. 注释： `/* */`

5. 限制：`render`方法返回的组件必须有且只能有一个根组件：

   ```react
     // 无法编译通过，JSX 会提示编译错误
     function render() {
       return (<p> .... </p>
              <p> .... </p>)
     }
   ```

6. JSX 可以通过命名空间的方式使用组件，以此来解决相同名称不同用途组件的冲突：

   ```react
     function render() {
       return <p>
              <CustomComponent1.SubElement/>
              <CustomComponent2.SubElement/>
              </p>
     }
   ```

7. jsx 文件可以从外部引入

8. 用 **camelCase** 语法来设置内联样式. React 会在指定元素数字后自动添加 **px** 

   ```react
   var names = ['Alice', 'Emily', 'Kate'];
   var color = {
   	fontSize:40,
   	color:'#168BEE'
   };

   ReactDOM.render(
   <div>{names+' '}</div>,
   document.getElementById('a')
   )
   ```



## 1.2 编译方式

1. 在 HTML 中引入 babel 编译器
2. 离线编译 JSX，通过 babel 编译 JSX



# 2 组件

## 2.1 创建组件

 React.createClass( ) 方法，传入的参数为一个对象，对象定义一个 render 方法，render 方法返回值为组件的渲染结构

也可以理解为一个组件实例（React.createElement 工厂方法的返回值），返回值有且只能为一个组件实例，或者返回 null/false，当返回值为 null/false 的时候，React 内部通过 <noscript/> 标签替换。



## 2.2 state

只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM?）

- `getInitialState` 方法用于定义初始状态，也就是一个对象，这个对象可以通过 `this.state` 属性读取。
- `this.setState ` 修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。

```react
var LikeButton = React.createClass({
        getInitialState: function() {
          return {liked: false};
        },
        handleClick: function(event) {
          this.setState({liked: !this.state.liked});
        },
        render: function() {
          var text = this.state.liked ? '喜欢' : '不喜欢';
          return (
            <p onMouseOver={this.handleClick}>
              你<b>{text}</b>我。点我切换状态。
            </p>
          );
        }
      });

      ReactDOM.render(
        <LikeButton />,
        document.getElementById('example')
      );
```

API：

### 2.2.1 setState

```
setState(object nextState[, function callback])

```

- **nextState**，新状态，该状态会和当前的**state**合并
- **callback**，可选参数，回调函数。该函数会在**setState**设置成功，且组件重新渲染后调用。

setState()并不会立即改变this.state，而是创建一个即将处理的state。setState()并不一定是同步的，为了提升性能React会批量执行state和DOM渲染。

setState()总是会触发一次组件重绘，除非在shouldComponentUpdate()中实现了一些条件渲染逻辑。



### 2.2.2 replaceState

```
replaceState(object nextState[, function callback])
```

- nextState: 新状态，该状态会替换当前的**state**





### 2.2.3 setProps

```
setProps(object nextProps[, function callback])
```

- nextProps : 要设置的新属性，该状态会和当前的**props**合并

设置组件属性，并重新渲染组件。

**props**相当于组件的数据流，它总是会从父组件向下传递至所有的子组件中。当和一个外部的JavaScript应用集成时，可能会需要向组件传递数据或通知**React.render()**组件需要重新渲染，可以使用**setProps()**。

更新组件，可以在节点上再次调用**React.render()**，也可以通过**setProps()**方法改变组件属性，触发组件重新渲染。



### 2.2.4 replaceProps

```
replaceProps(object nextProps[, function callback])
```

删除原有props



### 2.2.5 forceUpdate

```
forceUpdate([function callback])
```

forceUpdate()方法会使组件调用自身的render()方法重新渲染组件，组件的子组件也会调用自己的render()。组件重新渲染时，依然会读取this.props和this.state，如果状态没有改变，那么React只会更新DOM。

forceUpdate()方法适用于this.props和this.state之外的组件重绘（如：修改了this.state后），通过该方法通知React需要调用render()

尽量避免使用forceUpdate()，而仅从this.props和this.state中读取状态并由React触发render()调用。



### 2.2.6 findDOMNode

```
DOMElement findDOMNode()
```

如果组件已经挂载到DOM中，该方法返回对应的本地浏览器 DOM 元素。当**render**返回**null** 或 **false**时，**this.findDOMNode()**也会返回**null**。从DOM 中读取值的时候，该方法很有用，如：获取表单字段的值和做一些 DOM 操作。



























## 2.3 props

子组件通过 `props` 传递数据

```react
  var HelloMessage = React.createClass({
    render: function() {
      return <h1>Hello {this.props.name}</h1>;
    }
  });

  ReactDOM.render(
    <HelloMessage name="Runoob" />,
    document.getElementById('example')
  );
```
props 不可变的，而 state 可以根据与用户交互来改变

### 默认 props

` getDefaultProps()` 为 props 设置默认值

```react
var HelloMessage = React.createClass({
  getDefaultProps: function() {
    return {
      name: 'Runoob'
    };
  },
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
 
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
);
```

## 2.4 混合传值

在父组件中设置 state， 并通过在子组件上使用 props 将其传递到子组件上

```react
var WebSite = React.createClass({
  getInitialState: function() {
    return {
      name: "菜鸟教程",
      site: "http://www.runoob.com"
    };
  },
 
  render: function() {
    return (
      <div>
        <Name name={this.state.name} />
        <Link site={this.state.site} />
      </div>
    );
  }
});

var Name = React.createClass({
  render: function() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
});

var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});

ReactDOM.render(
  <WebSite />,
  document.getElementById('example')
);
```


## 2.5 props valid

`propTypes` 用来验证传入的数据是否是预期的

```react
React.createClass({
  propTypes: {
    // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
   optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
 
    // 可以被渲染的对象 numbers, strings, elements 或 array
    optionalNode: React.PropTypes.node,
 
    //  React 元素
    optionalElement: React.PropTypes.element,
 
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),
 
    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
 
    // 可以是多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),
 
    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
 
    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
 
    // 特定 shape 参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),
 
    // 任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,
 
    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,
 
    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
```

如

```
 propTypes: {
    title: React.PropTypes.string.isRequired,
  },
```