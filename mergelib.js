const  merge  = require('concat')
const files=[
  './dist/ng-login-component/main-es5.js',
  './dist/ng-login-component/polyfills-es5.js',
  './dist/ng-login-component/runtime-es5.js'

]

merge( files, './dist/ng-login-component/logincomp.js');
console.info('file generated')
