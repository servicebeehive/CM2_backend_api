'use strict'
module.exports.gettrasnactionreport = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_request_id = req.body.p_request_id
      , p_user_id = req.body.p_user_id
      , p_usertype_id = req.body.p_usertype_id
      , p_action = req.body.p_action
      , p_remarks = req.body.p_remarks ?? null
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
  
   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.fn_approve_request($1::int,$2::int,$3::int,$4::text,$5::text)', [p_request_id, p_user_id, p_usertype_id, p_action, p_remarks], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].fn_approve_request
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}