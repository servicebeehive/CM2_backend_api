'use strict'
const selectDBObject = require('../../../../config/selectdb.js')

module.exports.forgotpassword = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , username = req.body.username
      , fullname = req.body.fullname
      , pwd = req.body.pwd
      , active = req.body.active
      , operationtype = req.body.operationtype
      , phone = req.body.phone
      , email = req.body.email
      , oldpwd = req.body.oldpwd
      , clientcode = req.body.clientcode

      , response = {
         'success': false,
         'message': ''

      }

   console.log('The body is', req.body)


   return new Promise((resolve, reject) => {

      selectDBObject(clientcode, db).then(result => {
         db.clientdb = result.dbname
         db.query('select ' + db.clientdb + '.get_user_details($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text)', [fullname, username, pwd, active, operationtype, phone, email, oldpwd], (err, result) => {
            if (err) {
               console.log('The Error', err)
               response['success'] = false
               response['message'] = err.message
               return reject(response)

            } else {

               response['success'] = true
               response['message'] = 'data fetch'
               response['data'] = result.rows[0].get_user_details
               return resolve(response)

            }

         })
      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}