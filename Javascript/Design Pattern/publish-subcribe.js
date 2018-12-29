var Event = (function() {
  var clientList = {},
    listen,
    trigger,
    remove;

  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function() {
    var key = [].shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };

  remove = function(key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l > 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          // 这里的对比，只有传入函数名或者变量名才能对比，直接传进去函数，永远是false
          fns.splice(l, 1);
        }
      }
    }
  };

  return {
    listen,
    trigger,
    remove
  };
})();

Event.listen("test", function() {
  console.log("it's a test pagement");
});

Event.listen("test2", function() {
  console.log("it's a test pagement");
});
Event.listen("test2", function() {
  console.log("it's another test pagement");
});
Event.trigger("test");
Event.remove('test2')