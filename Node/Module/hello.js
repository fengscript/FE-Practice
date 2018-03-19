'use strict'
var s = 'Hello'

function greet(name) {
  console.log(s + name + '!')
}

// module.exports = greet;
export default{
  greet
}
// module.exports = greet;
