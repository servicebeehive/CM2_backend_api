'use strict'
module.exports.getdevicetoken = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_username = req.body.username
      , operationtype = req.body.operationtype
      , p_emailaddress = req.body.emailaddress
      , p_devicetoken = req.body.devicetoken

      , p_operatingsystem = req.body.operatingsystem
      , p_devicemodel = req.body.devicemodel
      , p_deviceid = req.body.deviceid
      , p_userid = req.body.userid
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }


   console.log('The body is', clientschema)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_user_device_token($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text)',
         [p_username, operationtype, p_emailaddress, p_devicetoken, p_operatingsystem, p_devicemodel, p_deviceid], (err, result) => {
            if (err) {
               console.log('The Error', err)
               response['success'] = false
               response['message'] = err.message
               return reject(response)

            } else {

               response['success'] = true
               response['message'] = 'data fetch'
               response['data'] = result.rows[0].get_user_device_token
               return resolve(response)

            }

         })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}