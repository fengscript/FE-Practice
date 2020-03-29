/* eslint-disable no-undef */
function loadJs(url) {
  let script = document.createElement("script");
  // script.src = url;
  script.src = chrome.runtime.getURL(url);
  document.body.appendChild(script);
}

loadJs('insert.js')

/**
 * method 2
 */

function addCode(code) {
  var script = document.createElement("script");
  script.className = "99999999999999999999999999";
  script.textContent = code;
  document.body.appendChild(script);
}
// list_menu__icon_down, js_down 是cursor时候的按钮
// js_all_down是最大那个下载按钮

const scriptText = `
document.addEventListener('click', function (e) {
  let classList = e.target.classList;
  if(classList.contains('js_all_down') 
  || classList.contains('list_menu__icon_down') 
  || classList.contains('js_down') 
  || classList.contains('js_btn_down')){
    handleClick(e)
  }
});
// document.querySelector(".js_all_down") && document.querySelector(".js_all_down").addEventListener("click", handleClick);
//  document.querySelector(".list_menu__icon_down").addEventListener("click", handleClick);
// document.querySelector(".js_btn_down") && document.querySelector(".js_btn_down").addEventListener("click", handleClick);
function handleClick(e) {
  alert(1)
  let timer = null;
     timer = setTimeout(function() {
       clearTimeout(timer);
       document.querySelector(".popup__subtit").innerText =
         "QQ Music Download Exercise";
       document.querySelector(
         ".popup__desc"
       ).innerHTML = "<a target='_blank' href=" + document.querySelector("#h5audio_media").getAttribute("src") + " }>直接下载</a>;"
     }, 100);
}`;

// addCode(scriptText);
