import ajax from './base';

let sysapi = {};
// 这里是请求的用法范例
sysapi.postSample = (username, password) => {
  return ajax({ userCode: username, password }, 'login').then((res) => {
    if (res.retCode === '1000') {
      // 登录成功
      return true;
    }
    throw res.message;
  });
};
sysapi.putSample = (queryObj) => {
  return ajax({ ...queryObj }, 'test', 'PUT');
};
sysapi.getSample = () => {
  return ajax({}, 'test', 'GET');
};
sysapi.patchSample = (queryObj) => {
  return ajax({ ...queryObj }, 'test', 'PATCH');
};
sysapi.deleteSample = (id) => {
  return ajax(null, `test/${id}`, 'DELETE');
};
module.exports = sysapi;
