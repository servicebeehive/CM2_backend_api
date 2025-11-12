'use strict'
module.exports.updatestockadjustment = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_loginuser = req.body.p_loginuser
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)

   return new Promise((resolve, reject) => {

      const stockValue = JSON.stringify(req.body.p_stock);

      db.query('select ' + clientschema + '.update_stock_adjustment($1::text,$2::jsonb)', [p_loginuser, stockValue], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = 'Error in Operation'
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].update_stock_adjustment
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}