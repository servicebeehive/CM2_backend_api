'use strict'
module.exports.inserttransactiondetails = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_transactiontype = req.body.p_transactiontype
      , p_transactionid = req.body.p_transactionid
      , p_transactiondate = req.body.p_transactiondate
      , p_customername = req.body.p_customername
      , p_mobileno = req.body.p_mobileno
      , p_totalcost = req.body.p_totalcost
      , p_totalsale = req.body.p_totalsale
      , p_overalldiscount = req.body.p_overalldiscount
      , p_roundoff = req.body.p_roundoff
      , p_totalpayable = req.body.p_totalpayable
      , p_currencyid = req.body.p_currencyid
      , p_gsttran = req.body.p_gsttran
      , p_status = req.body.p_status
      , p_isactive = req.body.p_isactive
      , p_loginuser = req.body.p_loginuser
      , p_linktransactionid = req.body.p_linktransactionid
      , p_replacesimilir = req.body.p_replacesimilir
      , p_creditnoteno = req.body.p_creditnoteno
      , p_paymentmode = req.body.p_paymentmode
      , p_paymentdue = req.body.p_paymentdue
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)

   return new Promise((resolve, reject) => {

      const saleValue = JSON.stringify(req.body.p_sale);

      db.query('select ' + clientschema + '.insert_transaction_details($1::text,$2::int,$3::text,$4::text,$5::text,$6::int,$7::int,$8::int,$9::numeric,$10::int,$11::int,$12::text,$13::text,$14::text,$15::text,$16::int,$17::text,$18::text,$19::text,$20::int,$21::jsonb)', [p_transactiontype, p_transactionid, p_transactiondate, p_customername, p_mobileno, p_totalcost, p_totalsale, p_overalldiscount, p_roundoff, p_totalpayable, p_currencyid, p_gsttran, p_status, p_isactive, p_loginuser, p_linktransactionid, p_replacesimilir, p_creditnoteno, p_paymentmode, p_paymentdue, saleValue], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].insert_transaction_details
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}