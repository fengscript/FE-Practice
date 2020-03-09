## hosting
```javascript
  var outer = "outer";
  function fn() {
      console.log(outer);
      var outer;
  }
  fn()    //undefined
  ```
