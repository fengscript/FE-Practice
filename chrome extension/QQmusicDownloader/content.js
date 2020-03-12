(function() {
    // https://588ku.com/image/77.html
  function addCode(code) {
    var JS = document.createElement("script");
    JS.text = code;
    document.head.appendChild(JS);
  }
  
  addCode(`document.querySelector('#user-login').removeAttribute('id')`);
})();


// (function() {
//     let hadAddCode = false;
//   function addCode(code) {
//     var JS = document.createElement("script");
//     JS.text = code;
//     setInterval(function() {
//         if (hadAddCode === false) {
//             document.head && document.head.appendChild(JS);
//             hadAddCode = true;
//         }
//     }, 1);
//   }
//   addCode(`setInterval(function(){Time20Login = function(){};console.log(Time20Login);},1);`);
// })();
