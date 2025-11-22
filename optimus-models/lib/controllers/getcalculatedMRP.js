'use strict'
module.exports.getcalculatedMRP = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_itemid = req.body.p_itemid
      , p_qty = req.body.p_qty
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)

   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.fn_calculate_mrp($1::int,$2::numeric)', [p_itemid, p_qty], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].fn_calculate_mrp
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}