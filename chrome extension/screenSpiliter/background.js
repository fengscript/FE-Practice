/* eslint-disable */
(function () {
  const getActiveTab = () =>
    new Promise((resolve) => {
      console.log("getActiveTab promise init");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tabs && resolve(tabs[0].id);
      });
    });
  const shortcut = new Shortcut();
  // command is
  chrome.commands.onCommand.addListener(async (command) => {
    const tabId = await getActiveTab();

    chrome.windows.create({
      tabId,
      // ...shortcut.execute[command].bind(shortcut),
      ...shortcut.execute[command](),
    });
  });
})();

/**
 * verison 1
 */
// (function () {
//   const getActiveTab = () => {
//     return new Promise((resolve) => {
//       console.log("getActiveTab promise init");
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         tabs && resolve(tabs[0].id);
//       });
//     });
//   };

//   const fullWidth = window.screen.availWidth;
//   const commandMap = {
//     "split-screen-left": {
//       width: Math.round(fullWidth / 2),
//       left: 0,
//     },
//     "split-screen-right": {
//       width: Math.round(fullWidth / 2),
//       left: Math.round(fullWidth / 2),
//     },
//     "split-screen-full": {
//       width: fullWidth,
//       left: 0,
//     },
//   };
//   chrome.commands.onCommand.addListener(async (command) => {
//     const tabId = await getActiveTab();

//     chrome.windows.create({
//       tabId,
//       ...commandMap[command],
//     });
//   });
// })();

/**
 * shortcut
 */

// class Shortcut {
//   constructor() {
//     this.fullWidth = window.screen.availWidth;
//     this.splitScreenLeft = this.splitScreenLeft.bind(this)
//     this.splitScreenRight = this.splitScreenRight.bind(this)
//     this.splitScreenFull = this.splitScreenFull.bind(this)
//   }
//   splitScreenLeft() {
//     return {
//       width: Math.round(this.fullWidth / 2),
//       left: 0,
//     };
//   }
//   splitScreenRight() {
//     return {
//       width: Math.round(this.fullWidth / 2),
//       left: Math.round(this.fullWidth / 2),
//     };
//   }
//   splitScreenFull() {
//     return {
//       width: this.fullWidth,
//       left: 0,
//     };
//   }
//   convertCommand(command) {
//     command.split("-").reduce((acc, cur, index) => {
//       if (index === 0) {
//         return acc + cur;
//       } else {
//         return acc + cur.slice(0, 1).toUpperCase() + cur.slice(1);
//       }
//     });
//     // 'split-screen-left'.replace(/(\-)(\w)/g, (data, p1, p2) => {
//     //   console.log(data,p2)
//     //          return p2.toUpperCase()
//     //   })
//   }
//   execute(command) {
//     return this[this.convertCommand(command)];
//   }
// }

/**
 * reg
 * 其实
 */
// 'split-screen-left'.replace(/(\-)(\w)/g, (data, p1, p2) => {
//   console.log(data,p2)
//          return p2.toUpperCase()
//   })
// 改成下面的更好👇

// 'split-screen-left'.replace(/\-(\w)/g, (data, p1) => {
//   console.log(data,p1)
//          return p1.toUpperCase()
//   })
