'use strict'
module.exports.deletechildUOM = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_uomchildid = req.body.p_uomchildid
      , p_loginuser = req.body.p_loginuser
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)

   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.delete_childuom($1::int,$2::text)', [p_uomchildid, p_loginuser], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].delete_childuom
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}