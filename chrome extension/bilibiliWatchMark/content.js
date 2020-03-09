(function() {
  /**
   * key: bilibili video id
   * value : current watch list
   * like - avxxxxx : [1,2,3]
   */

  let history =
    (window.localStorage.getItem("bilibili-history") &&
      JSON.parse(window.localStorage.getItem("bilibili-history"))) ||
    {};
  const currentVideoId = window.location.pathname.replace("/video/", "");
  // initial watched video list
  history[currentVideoId] = [];
  // start
  toStartWithMethodConfig({
    chromeExtensionMethond: true,
    bindEventMethod: false
  });

  /**
   *
   * funtions
   */
  function toStartWithMethodConfig(
    obj = { chromeExtensionMethond: false, bindEventMethod: true }
  ) {
    /**
     * to use chrome.tab onUpdate() method handle this
     */
    if (obj.chromeExtensionMethond) {

      // chrome.tabs.onUpdated.addListener(function() {
      //   console.log("tabs updated");
      //   const currentIndex = window.location.search.replace("?p=", "");

      //   setMarkWithEvent(currentIndex);
      // });
    } else {
      bindEvent("click", "router-link-active", e => {
        const href = e.target.href;
        const currentIndex = href.match(/(?<=\?p=)\d+/)[0] - 1;
        /**
         *     document.querySelectorAll(".list-box li a")[currentIndex].querySelector('._mark-viwed')
         *  will return dom, so !... = false
         */

        setMarkWithEvent(currentIndex);
      });
    }
  }

  function setMarkWithEvent(currentIndex) {
    if (
      !~history[currentVideoId].indexOf(currentIndex) &&
      !document
        .querySelectorAll(".list-box li a")
        [currentIndex].querySelector("._mark-viwed")
    ) {
      history[currentVideoId].push(currentIndex);

      window.localStorage.setItem("bilibili-history", JSON.stringify(history));

      setMarkByIndex(document.querySelectorAll(".list-box li a")[currentIndex]);
    }
  }

  // init setMark
  checkLoadFinish(".router-link-active").then(() => {
    // console.log(document.querySelector(".router-link-active"));
    window.localStorage.getItem("bilibili-history") &&
      JSON.parse(window.localStorage.getItem("bilibili-history"))[
        currentVideoId
      ].forEach(item =>
        setMarkByIndex(document.querySelectorAll(".list-box li a")[item])
      );
  });

  function setMarkByIndex(target, callback) {
    const tempElement = document.createElement("i");
    tempElement.className = "_mark-viwed";
    tempElement.textContent = "✔️";
    tempElement.style.cssText = "float:right;";
    target && target.appendChild(tempElement);

    if (typeof callback === "function") {
      callback();
    }
  }

  function bindEvent(type, target, callback) {
    document.body.addEventListener(type, function(e) {
      if (e.target.classList.contains(target)) {
        callback(e);
      }
    });
  }

  function checkLoadFinish(target) {
    return new Promise((resolve, reject) => {
      let timer = setInterval(function() {
        if (document.querySelector(target)) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  }

  // function chromeTabWatch = state => {
  //   if (state === true) {
  //     chrome.runtime.onMessage.addListener(
  //       function(message, sender, semdResponse) {
  //         console.log(message);
  //         if (message.bilibili === "updated"){
           
  //         }
  //      });
  //   }
  // }
})();
