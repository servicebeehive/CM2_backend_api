'use strict'
module.exports.getinvoicedetails = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_startdate = req.body.p_startdate
      , p_enddate = req.body.p_enddate
      , p_customer = req.body.p_customer
      , p_mobile = req.body.p_mobile
      , status = req.body.status
      , p_username = req.body.p_username
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', clientschema)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_invoice_details($1::text,$2::text,$3::text,$4::text,$5::text,$6::text)', [p_startdate, p_enddate, p_customer, p_mobile, status, p_username], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].get_invoice_details
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}