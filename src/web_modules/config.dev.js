import webInspector from '@nfq/web-inspector';

let configure = webInspector.make('API_ROOT', 'http://192.168.10.6:8090/');
webInspector.make('FILE_API_ROOT', 'http://file.dev.nongfenqi.com/');
webInspector.make('GALEN_API_ROOT', 'https://galen.dev.nongfenqi.com');
// const API_ROOT = 'http://192.168.10.6:8090/';
// // const API_ROOT = 'http://192.168.10.149:8088/';
// const FILE_API_ROOT = 'http://file.dev.nongfenqi.com/';
// const GALEN_API_ROOT = 'https://galen.dev.nongfenqi.com';
console.log('use dev env');

module.exports = configure;
