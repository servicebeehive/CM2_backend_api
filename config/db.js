'use strict'

// const config = require(__dirname + '/index.js')
//       ,mysql = require('mysql')
//       ,sqlConfig = {
//           host : config.serverHost,
//           user : config.databaseusername,
//           password: config.databasepwd,
//           database : config.databasename
         
//       }

// let connection = mysql.createConnection(sqlConfig)

//connection.connect(function(err){
//     if(err){    

//         connection.end()
//         console.log('Problem in SQL Connection'+err)
//         return;
        
//     }else{
//         console.log('My SQL Connection Successfully')
//     }
// })

//  const config = require(__dirname + '/index.js')
//        ,mysql = require('mysql')
//  var pool  = mysql.createPool({
//      connectionLimit : 100,
//      host : config.serverHost,
//      user : config.databaseusername,
//      password: config.databasepwd,
//      database : config.databasename,
//      debug : false

//  })
// module.exports = pool

 const config = require(__dirname + '/index.js')
 const { Pool  } = require('pg')
 const pool = new Pool({
   user: config.databaseusername,
   host: config.serverHost,
   database: config.databasename,
   password: config.databasepwd,
   port:  config.dbport,
   clientdb : ''
 })

module.exports = pool

