'use strict'
module.exports.insertpurchaseheader = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_operationtype = req.body.p_operationtype
      , p_purchaseid = req.body.p_purchaseid
      , p_vendorid = req.body.p_vendorid
      , p_invoiceno = req.body.p_invoiceno
      , p_invoicedate = req.body.p_invoicedate
      , p_remarks = req.body.p_remarks
      , p_active = req.body.p_active
      , p_deliveryboy  = req.body.p_deliveryboy
      , p_amountpaid  = req.body.p_amountpaid
      , p_loginuser = req.body.p_loginuser
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.insert_purchase_header($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::numeric,$10::text)', [p_operationtype, p_purchaseid, p_vendorid, p_invoiceno, p_invoicedate, p_remarks, p_active, p_deliveryboy, p_amountpaid, p_loginuser], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].insert_purchase_header
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}