/*
 * @Author: fyg 
 * @Date: 2018-10-24 12:35:19 
 * @Last Modified by: fyg
 * @Last Modified time: 2018-11-18 22:26:46
 */
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// function TimeShow (props) {
//   return <h3>{props.data}</h3>
// }

class TimeShow2 extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.date}</h3>
      </div>
    );
  }
}

class TimeShow3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <div>
        <h3>{this.state.date.toLocaleDateString()}</h3>
      </div>
    );
  }
}

function CountNumber(props) {
  return (
    <div>
      <h3>{props.data}</h3>
      <h3>{props.data2}</h3>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);

    this.counterAdd = this.counterAdd.bind(this);
    this.state = {
      color: "red",
      countInit: 0,
      countInit2: 1
    };
  }

  componentDidMount() {
    this.counterAdd();
  }

  componentWillUnmount() {
    clearInterval(this.addTimer);
  }

  counterAdd() {
    // let countInit = this.state.countInit;
    // countInit++;
    this.addTimer = setInterval(() => {
      this.setState({
        // 我擦 这里用  this.state.countInit++ 就崩了。。。。妈蛋
        countInit: this.state.countInit + 1
      });

      this.setState(state => ({
        countInit2: state.countInit2 + 1
      }));
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p style={{ color: this.state.color }}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
          {/* <h3>{this.state.countInit}</h3> */}
          <CountNumber
            data={this.state.countInit}
            data2={this.state.countInit2}
          />
          {/* <TimeShow2 date = {new Date().toLocaleDateString()}/> */}
          {/* <TimeShow3 /> */}

          {/* <TolggleButton /> */}
          <LoginControl />
          <List />
          <NumberList numbers={numbers} />
          <FormTest />
          <SelectTest />
          <Calcultor />
        </header>
      </div>
    );
  }
}

// class ControlledInput extends React.Component {
//   constructor() {
//     super();
//     this.state = { value: "Please type here..." };
//   }
//   handleChange(event) {
//     console.log("Controlled change:", event.target.value);
//     this.setState({ value: event.target.value });
//   }
//   render() {
//     return (
//       <label>
//         Controlled Component:
//         <input
//           type="text"
//           value={this.state.value}
//           onChange={e => this.handleChange(e)}
//         />
//       </label>
//     );
//   }
// }

// class UncontrolledInput extends React.Component {
//   constructor() {
//     super();
//   }

//   handleChange() {
//     console.log("Uncontrolled change:", this.input.value);
//   }

//   render() {
//     return (
//       <label>
//         Uncontrolled Component:
//         <input
//           type="text"
//           defaultValue="Please type here..."
//           ref={input => (this.input = input)}
//           onChange={() => this.handleChange()}
//         />
//       </label>
//     );
//   }
// }

// //Handle multiple inputs with one function.

// class ContactEdit extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       contact : {
//         firstName: 'Bolun',
//         lastName: 'Yu',
//         phone: '123123123'
//       }
//     }
//     this.handleChangeFor = propertyName => event => {
//       const { contact } = this.state;
//       const newContact = {
//         ...contact,
//         [propertyName]: event.target.value
//       };
//       this.setState({ contact: newContact });
//     };
//   }

//   render() {
//     return (
//       <div>
//         <input
//           type="text"
//           onChange={this.handleChangeFor("firstName")}
//           value={this.state.contact.firstName}
//         />
//         <input
//           type="text"
//           onChange={this.handleChangeFor("lastName")}
//           value={this.state.contact.lastName}
//         />
//         <input
//           type="text"
//           onChange={this.handleChangeFor("phone")}
//           value={this.state.contact.phone}
//         />
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <div>
//     <ContactEdit />
//   </div>,
//   document.getElementById("root")
// );

/**
 * EVT TEST
 */

class TolggleButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isToggle: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggle: !state.isToggle
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggle ? "ON" : "OFF"}
        </button>
      </div>
    );
  }
}

/**
 * 条件渲染
 */

function UserGreeting(props) {
  return <h4>Welcome back!</h4>;
}

function GuestGreeting(props) {
  return <h4>Please sign up.</h4>;
}

function Greeting(props) {
  const isLogin = props.isLoggedIn;
  if (isLogin) {
    return null;
    // return <UserGreeting />
  }
  // console.log(false)
  return <GuestGreeting />;
}
function LogInBtn(props) {
  return <button onClick={props.onClick}>LogIn</button>;
}
function LogOutBtn(props) {
  let say = _ => {
    console.log("invoke");
  };
  return (
    // <button onClick={say}>
    <button onClick={props.onClick}>LogOut</button>
  );
}

class LoginControl extends Component {
  constructor(props) {
    super(props);
    // this.handleLogInClick = this.handleLogInClick.bind(this);
    // this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.state = {
      isLogin: false
    };
  }

  handleLogInClick() {
    this.setState({
      isLogin: true
    });
  }
  handleLogOutClick() {
    this.setState({
      isLogin: false
    });
  }
  // render() {
  //   const isLogin = this.state.isLogin;
  //   let button;

  //   if (isLogin) {
  //     button = <LogOutBtn onClick={this.handleLogOutClick} />
  //   } else {
  //     button = <LogInBtn onClick={this.handleLogInClick} />
  //   }
  //   return (
  //     <div>
  //       <Greeting isLoggedIn={isLogin} />
  //       {button}
  //     </div>
  //   )
  // }

  // 更好的，用内联if
  render() {
    const isLogin = this.state.isLogin;
    return (
      <div>
        <Greeting isLoggedIn={isLogin} />
        {this.state.isLogin ? (
          <LogOutBtn onClick={this.handleLogOutClick.bind(this)} />
        ) : (
          <LogInBtn onClick={this.handleLogInClick.bind(this)} />
        )}
      </div>
    );
  }
}

/**
 * 列表
 */
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(number => <li>{number}</li>);

function List(props) {
  return <ul>{listItems}</ul>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => (
    <li key={number.toString()}>{number}</li>
  ));

  return <ul>{listItems}</ul>;
}

/**
 * Form
 */

class FormTest extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handChange = this.handChange.bind(this);
    this.handSubmit = this.handSubmit.bind(this);
  }

  handChange(event) {
    this.setState({
      value: event.target.value
    });
    console.log(event.target.value);
  }
  handSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handSubmit}>
        <label htmlFor="input">
          Name:
          <input
            type="text"
            name="input"
            value={this.state.value}
            onChange={this.handChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}

// select

class SelectTest extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handChange = this.handChange.bind(this);
  }
  handChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="seltcttest">
          <select
            onChange={this.handChange}
            value={this.state.value}
            name="seltcttest"
            id="">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>
      </form>
    );
  }
}

/**
 * 状态提升
 */
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水开了水开了</p>;
  }
  return <p>水没开啊我擦</p>;
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "123" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    // this.setState({
    //   value: event.target.value
    // });
    this.props.onTemperatureChange(event.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    // const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>输入温度 {scaleNames[scale]}： </legend>
        <input type="text" value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calcultor extends Component {
  constructor(props) {
    super(props);
    this.handCelsiusChange = this.handCelsiusChange.bind(this);
    this.handFahrenheitChange = this.handFahrenheitChange.bind(this);
    this.state = {
      temperature: "",
      scale: "c"
    };
  }
  handCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }
  handFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}



class tempauture2 extends Component {
  render () {
    return (
      <div>
        
      </div>
    )
  }
}







export default App;
