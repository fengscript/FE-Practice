const getDisplayWidth = () =>
  new Promise((resolve) => {
    console.log("getDisplay promise init");
    chrome.system.display.getInfo((infos) => {
      resolve(infos[0].workArea.width);
    });
  });
