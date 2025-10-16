'use strict'

require('directory')(__dirname +'/lib/controllers/', (module, name) => {
  exports[name] = module
 
})
