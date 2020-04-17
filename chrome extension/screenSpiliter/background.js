/* eslint-disable */
(function() {
  class Shortcut {
    SplitScreenLeft() {
      return {
        width: Math.round(fullWidth / 2),
        left: 0
      };
    }
    SplitScreenRight() {
      return {
        width: Math.round(fullWidth / 2),
        left: Math.round(fullWidth / 2)
      };
    }
    SplitScreenFull() {
      return {
        width: fullWidth,
        left: 0
      };
    }

    execute() {}
  }
})()(function() {
  const getActiveTab = () => {
    return new Promise(resolve => {
      console.log("getActiveTab promise init");
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        tabs && resolve(tabs[0].id);
      });
    });
  };

  const fullWidth = window.screen.availWidth;
  const commandMap = {
    "split-screen-left": {
      width: Math.round(fullWidth / 2),
      left: 0
    },
    "split-screen-right": {
      width: Math.round(fullWidth / 2),
      left: Math.round(fullWidth / 2)
    },
    "split-screen-full": {
      width: fullWidth,
      left: 0
    }
  };
  chrome.commands.onCommand.addListener(async command => {
    const tabId = await getActiveTab();

    chrome.windows.create({
      tabId,
      ...commandMap[command]
    });
  });
})();
