const getActiveTab = () =>
  new Promise((resolve) => {
    console.log("getActiveTab promise init");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs && resolve(tabs[0].id);
    });
  });

class Shortcut {
  constructor() {
    this.fullWidth = window.screen.availWidth;
    // this.SplitScreenLeft = this.SplitScreenLeft.bind(this);
  }
  splitScreenLeft(width) {
    return {
      // width: Math.round(this.fullWidth / 2),
      // this.fullWidth -> chrome.system.display.getInfo[0].workArea.width
      width: Math.round(width / 2),
      left: 0,
    };
  }
  splitScreenRight = (width) => {
    return {
      width: Math.round(width / 2),
      left: Math.round(width / 2) + (window.screen.width - width),
    };
  };
  splitScreenFull = (width) => {
    return {
      width,
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
    // 或者 正则
    // 'split-screen-left'.replace(/(\-)(\w)/g, (data, p1, p2) => {
    //   console.log(data,p2)
    //          return p2.toUpperCase()
    //   })
  }

  // execute(command) {
  execute = async command => {
    const tabId = await getActiveTab();
    const width = await getDisplayWidth();
 
    // 直接 async， 就可以

    chrome.windows.create({
      tabId,
      ...this[this.convertCommand(command)](width),
    });
    // chrome.windows.create({
    //   tabId,
    //   // ...shortcut.execute[command].bind(shortcut),
    //   ...shortcut.execute[command](),
    // });

    // console.log(this[this.convertCommand(command)]);
    // return this[this.convertCommand(command)].bind(this);
    // 就不需要在上面 bind
    // 或者在 那边shortcut.execute[command] 里面  bind
    //
    // return this[this.convertCommand(command)];
  };
}
