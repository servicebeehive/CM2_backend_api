'use strict'
module.exports.getstockadjustment = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_categoryid = req.body.p_categoryid
      , p_itemid = req.body.p_itemid
      , p_username = req.body.p_username
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)

   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_stock_adj_grid_value($1::int,$2::int,$3::text)', [p_categoryid, p_itemid, p_username], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = 'Error in Operation'
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].get_stock_adj_grid_value
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}