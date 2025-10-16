'use strict'

const isThere = require('is-there')
    ,currEnv = process.env.NODE_ENV || 'development'
    //,currEnv = process.env.NODE_ENV || 'production'
    ,envFilePath = __dirname +'/env/' + currEnv +'.js'

let environmentOptions
   

if(!isThere(envFilePath)){
    console.log('Environment File Missing')
}else{
    environmentOptions = require(envFilePath)
}

module.exports = {
    dbport : environmentOptions.server.DBport,
    port : environmentOptions.server.port,
    serverHost : environmentOptions.server.host,
    databasename : environmentOptions.database.databasename,
    databaseusername : environmentOptions.database.username,
    databasepwd :  environmentOptions.database.password,
    
    paytmconfig_mid : environmentOptions.paytmconfig.mid,
    paytmconfig_key : environmentOptions.paytmconfig.key,
    paytmconfig_website : environmentOptions.paytmconfig.website,
      
    appDir : process.cwd()
}
