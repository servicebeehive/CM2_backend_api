'use strict'
module.exports.gettrasnactiondetails = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_vendor = req.body.p_vendor
      , p_invoicestart = req.body.p_invoicestart
      , p_invoiceend = req.body.p_invoiceend
      , p_username = req.body.p_username
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', clientschema)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_trasnaction_details($1::int,$2::text,$3::text,$4::text)', [p_vendor, p_invoicestart, p_invoiceend, p_username], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].get_trasnaction_details
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}