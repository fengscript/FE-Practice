import axios from "axios";

const base = {
  fetch(url, params) {
    return new Promise((reslove, reject) => {
      axios
        .get(url, params)
        .then(response => reslove(response.data))
        .catch(error => reject(error));
    });
  },
  post(url, params) {
    return new Promise((reslove, reject) => {
      axios
        .post(url, params)
        .then(response => reslove(response.data))
        .catch(error => reject(error));
    });
  }
};
const API = {
  fetchPerson() {
    return base.fetch("http://localhost:3000/perso");
  }
};
export default API;
