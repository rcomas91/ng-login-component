const  merge  = require('concat')
const files=[
  './dist/ng-busqueda-almacen/main-es5.js',
  './dist/ng-busqueda-almacen/polyfills-es5.js',
  './dist/ng-busqueda-almacen/runtime-es5.js'

]

merge( files, './dist/ng-busqueda-almacen/winatmcomp.js');
console.info('file generated')
