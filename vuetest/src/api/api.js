import axios from "axios";

const API = {
  fetch(url, params) {
    return new Promise((reslove, reject) => {
      axios
        .post(url, params)
        .then(response => reslove(response.data))
        .catch(error => reject(error));
    });
  }
};
export default API;
