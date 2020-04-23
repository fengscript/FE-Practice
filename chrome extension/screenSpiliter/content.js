(function () {
  const getJson = () => {
    return new Promise((resolve) => {
      resolve(document.body.innerText);
    });
  };

  const jsonConvert = (data) => {
    return JSON.stringify(JSON.parse(data), " ", 2);
  };

  const outPut = async () => {
    const data = await getJson();
    document.body.innerHTML = `<pre style='overflow-wrap: break-word; white-space: pre-wrap; user-select: auto;'>${jsonConvert(
      data
    )}</pre>`;
  };

  outPut();
})();
