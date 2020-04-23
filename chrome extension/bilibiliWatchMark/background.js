/* eslint-disable */

// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, { message: "changeBackground" }, function(
//     response
//   ) {});

//   chrome.tabs.onUpdated.addListener(function() {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "updated" }, function(
//       response
//     ) {});
//   });
// });

chrome.tabs.query({}, tabs => {
  tabs.forEach(tab => {
    chrome.tabs.onUpdated.addListener(function() {
      alert(window.location.search.replace("?p=", ""))
      chrome.tabs.sendMessage(tab.id, { bilibili_currentIndex: currentIndex }, function(
        response
      ) {});
    });
  });
});
