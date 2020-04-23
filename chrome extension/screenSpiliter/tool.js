class Shortcut {
  constructor() {
    this.fullWidth = window.screen.availWidth;
    // this.SplitScreenLeft = this.SplitScreenLeft.bind(this);
  }
  splitScreenLeft() {
    return {
      width: Math.round(this.fullWidth / 2),
      left: 0,
    };
  } 
  splitScreenRight = () => {
    return {
      width: Math.round(this.fullWidth / 2),
      left: Math.round(this.fullWidth / 2),
    };
  };
  splitScreenFull = () => {
    return {
      width: this.fullWidth,
      left: 0,
    };
  };
  convertCommand(command) {
    command.split("-").reduce((acc, cur, index) => {
      if (index === 0) {
        return acc + cur;
      } else {
        return acc + cur.slice(0, 1).toUpperCase() + cur.slice(1);
      }
    });
    // 'split-screen-left'.replace(/(\-)(\w)/g, (data, p1, p2) => {
    //   console.log(data,p2)
    //          return p2.toUpperCase()
    //   })
  }
  execute(command) {
    console.log(this[this.convertCommand(command)]);
    return this[this.convertCommand(command)].bind(this);
    // 就不需要在上面 bind
    // 或者在 那边shortcut.execute[command] 里面  bind
    // 
    // return this[this.convertCommand(command)];
  }
}
