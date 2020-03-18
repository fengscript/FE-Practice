/* eslint-disable no-undef */
// to avoid chrome var be alert
(function() {
  function getActiveTab() {
    return new Promise(resolve => {
      console.log("promise init");
      chrome.tabs.query({ active: true }, tabs => {
        tabs && resolve(tabs[0].id);
      });
    });
  }
  getActiveTab().then(id => {
    console.log(id);
  });
  // async function getIdAsync() {
  //   return await chrome.tabs.query({ active: true }, tabs => {
  //     return tabs[0].id;
  //   });
  // }
  // async function getIdAsync() {
  //   const id = await getActiveTab.then(id => id);
  // }
  // async function getId() {
  //   return await getActiveTab().then();
  // }
  chrome.commands.onCommand.addListener(command => {
    console.log("Command:", command);
    chrome.tabs.query({ active: true }, tabs => {
      // 3353

      chrome.windows.create(
        {
          tabId: tabs[0].id
          // left:,
          // top:,
        },
        obj => {
          alert(JSON.stringify(obj));
        }
      );
    });
    // getIdAsync();
    // const id = getIdAsync();

    // setTimeout(function() {
    //   chrome.windows.create(
    //     {
    //       tabId: 3353
    //       // left:,
    //       // top:,
    //     },
    //     obj => {
    //       alert(JSON.stringify(obj));
    //     }
    //   );
    // }, 3000);
  });
})();
