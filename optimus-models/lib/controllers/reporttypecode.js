'use strict'
module.exports.reporttypecode = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_user = req.body.userid
      , clientschema = req.headers.options.db.clientdb

      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_report_type_code($1::int)', [p_user], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].get_report_type_code
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}