// 简单的中间层
export function setToken(fetchResponse) {
  if (fetchResponse.headers) {
    let token = fetchResponse.headers.get('x-auth-token');
    if (token) {
      window.localStorage.setItem('x-auth-token', token);
    }
  }
  if (fetchResponse.json) {
    return fetchResponse.json();
  }
  return fetchResponse;
}

export function checkLogon(standardResponse) {
  if (standardResponse.retCode === '10005') {
    window.localStorage.removeItem('x-auth-token');
    window.location.href = '#/login/长时间未操作，请重新登陆';
    throw standardResponse.message;
  } else {
    return standardResponse.data;
  }
}

export function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('promise timeout'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

/**
 * 对象属性转换成搜索条件
 * @date   2016-11-11
 * @author niko
 * @param  {Object}   queryObj 对象
 * @return {[type]}            [description]
 */
export function generateQueryParams(queryObj) {
  let values = '';
  Object.keys(queryObj).forEach((key) => {
    if ({}.hasOwnProperty.call(queryObj, key)) {
      values += `${key}=${queryObj[key]}&`;
    }
  });
  return values;
}
