/*
 * @Author: fyg 
 * @Date: 2018-10-24 13:02:17 
 * @Last Modified by: fyg
 * @Last Modified time: 2018-10-26 23:26:32
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));



function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

// setInterval(tick, 1000);

let mystyle = {
  fontSize: 30,
  color: "#ccc",
}


let arr = ["name", "age", "career"]
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2 style={mystyle} >现在是 {this.props.date.toLocaleTimeString()}.</h2>
        <h4> arr:{arr} </h4>
      </div>
    )
  }
}

// function MyEle (prop) {
//   return <h1>FYG</h1>
// }

// var element = <MyEle />;

// class name extends React.Component{
//   render(){
//     element,
//   }
// }
// ReactDOM.render(element, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
