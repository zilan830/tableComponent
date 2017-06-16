import Rx from "rxjs";
import baseApi from "../api/base";

const baseAjax = (action, store) => {
    const { data, url } = action;
    return Rx.Observable.fromPromise(baseApi(data,url));
}

module.exports = {
    baseAjax
}
