// (function() {
//   function addCode(code) {
//     var script = document.createElement("script");
//     script.text = code;
//     document.head.appendChild(script);
//   }
//   addCode(`document.querySelector('#user-login').removeAttribute('id')`);
// })();
document.querySelector(".js_btn_down").addEventListener("click", handleClick);
document.querySelector(".js_down").addEventListener("click", handleClick);

function handleClick() {
  console.log(" hi hi hi");
  setTimeout(function() {
    document.querySelector(".popup__subtit").innerText =
      "QQ Music Download Exercise";
    document.querySelector(
      ".popup__desc"
    ).innerHTML = `<a target='_blank' href="${document
      .querySelector("#h5audio_media")
      .getAttribute("src")}">直接下载</a>`;
  }, 100);
}
