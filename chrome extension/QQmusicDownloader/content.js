// (function() {
// })();
function addCode(code) {
  var script = document.createElement("script");
  script.className = "99999999999999999999999999"
  script.text = code;
  document.body.appendChild(script);
}
// addCode(`console.log('11111111111111111')`)

function loadJs(url) {
  let script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
}

const scriptText = `
alert(123)
console.log("111111111111111111", document.querySelector(".js_btn_down"))
document.querySelector(".js_btn_down").addEventListener("click", function (e) {
  console.log(" hi hi hi");
  alert(1)
);`;

addCode(scriptText);
// document.querySelector(".list_menu__icon_down").addEventListener("click", handleClick);

// document.querySelector(".js_btn_down").addEventListener("click", handleClick);
// function handleClick() {
//   console.log(" hi hi hi");
//   let timer = null;
//   timer = setTimeout(function() {
//     clearTimeout(timer);
//     document.querySelector(".popup__subtit").innerText =
//       "QQ Music Download Exercise";
//     document.querySelector(
//       ".popup__desc"
//     ).innerHTML = `<a target='_blank' href="${document
//       .querySelector("#h5audio_media")
//       .getAttribute("src")}">直接下载</a>`;
//   }, 100);
// }
