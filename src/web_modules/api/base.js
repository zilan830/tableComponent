import 'isomorphic-fetch';
import { API_ROOT } from '../config';

export default (data, url, type) => {
  var headers = new Headers({
    "Content-Type": "application/json",
    "x-auth-token": "48fa8ac0-5c5b-4268-a76a-5a8d38fcc80a"
  });
  return fetch(API_ROOT + url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
    mode: "cors"
  })
    .then(response => {
      if (!response.ok) {
        throw "网络请求失败";
      }
      var token = response.headers.get("x-auth-token");
      if (token) {
        window.localStorage.setItem("x-auth-token", token);
      }
      return response.json();
    })
    .then(res => {
      if (res.retCode !== "10000") {
        window.localStorage.removeItem("x-auth-token");
        throw res.message;
      } else {
        return res;
      }
    });
};
