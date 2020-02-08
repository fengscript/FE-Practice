let currentList = [];

const createMarkElement = () => {
  const temp = document.createElement("span");
  temp.className = "__mark";
  temp.textContent = "✔️";
  temp.style.float = "right";
  return temp;
};

const setSingleMark = n => {
  document
    .querySelectorAll(".list-box li a")
    [n - 1].appendChild(createMarkElement());
};

const initSetMark = cb => {
  chrome.storage.sync.get(["current"], items => {
    if (items.current) {
      console.log("load current list:", items.current);
      current = items.current;
      items.current.forEach(i => {
        document
          .querySelectorAll(".list-box li")
          [Number(i) - 1].querySelector("a")
          .appendChild(createMarkElement());
      });
      if (typeof cb === "function") {
        cb();
      }
    }
  });
};

const bindWatchEvent = () => {
  document.querySelector(".list-box") &&
    document.querySelector(".list-box").addEventListener("click", function(e) {
      if (e.target.nodeName === "A") {
        const href = e.target.href;
        const current = href.match(/(?<=\?p=)\d+/)[0];
        if (!~currentList.indexOf(current)) {
          currentList.push(current);
          chrome.storage.sync.set({ current: currentList });
          setSingleMark(current);
        }
      }
    });
};

const getTargetElement = () =>
  document.body.contains(document.querySelectorAll(".list-box li a")[0]);

const checkLoadFinish = () => {
  if (getTargetElement()) {
    let timer = setTimeout(function() {
      if (getTargetElement()) {
        window.clearTimeout(timer);
        initSetMark();
      } else {
        checkLoadFinish();
      }
    }, 500);
  } else {
    let reCheck = setInterval(function() {
      window.clearInterval(reCheck);
      checkLoadFinish();
    }, 500);
  }
};

// init & start
bindWatchEvent();

window.onload = function() {
  checkLoadFinish();
};

// var callback = function(mutationsList) {
//   getTargetElement &&
//     initSetMark(() => {
//       debugger;
//       observer.disconnect();
//     });
// };

// var observer = new MutationObserver(callback);

// let t = setInterval(function() {
//   if (document.getElementById("multi_page")) {
//     observer.observe(document.getElementById("multi_page"), {
//       childList: true
//     });
//     clearInterval(t);
//   }
// }, 1000);
