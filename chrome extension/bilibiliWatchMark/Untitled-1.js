(() => {
  let history = localStorage.getItem('b-history') && JSON.parse(localStorage.getItem('b-history')) || {};
  const videoId = window.location.pathname.replace('/video/', '').replace(/\?p=\d+/, '');
  const getLinkNode = (videoId, item) => document.querySelector(`[href="/video/${videoId}?p=${item}"]`);
  history[videoId] = history[videoId] || [];

  const timer = setInterval(() => {
    setViewed(history, videoId, () => {
      clearInterval(timer);
    })
  }, 200);

  bindEvent('router-link-active', 'click', (e) => {
    if (!history[videoId].includes(e.target.href.match(/p=(\d+)/)[1])) {
      history[videoId].push(e.target.href.match(/p=(\d+)/)[1]);
    }

    localStorage.setItem('b-history', JSON.stringify(history));
    setViewed(history, videoId);
  });

  function setViewed(history, videoId, cb) {
    history[videoId].forEach(item => {
      if (getLinkNode(videoId, item)) {
        getLinkNode(videoId, item).classList.add('viewed');
        getLinkNode(videoId, item).children[0].style.display = 'inline-block';

        if (cb) {
          cb();
        }
      }
    })
  }

  function bindEvent(className, type, cb) {
    document.body.addEventListener(type, e => {
      if (Array.from(e.target.classList).includes(className)) {
        cb(e);
      }
    });
  }
})()