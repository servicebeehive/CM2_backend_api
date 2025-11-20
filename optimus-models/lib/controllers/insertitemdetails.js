'use strict'
module.exports.insertitemdetails = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_operationtype = req.body.p_operationtype
      , p_purchaseid = req.body.p_purchaseid
      , p_itemname = req.body.p_itemname
      , p_itemsku = req.body.p_itemsku
      , p_location = req.body.p_location
      , p_minimumstock = req.body.p_minimumstock
      , p_categoryid = req.body.p_categoryid
      , p_warrentyperiod = req.body.p_warrentyperiod
      , p_expirydate = req.body.p_expirydate
      , p_uomid = req.body.p_uomid
      , p_childuom = req.body.p_childuom
      , p_currencyid = req.body.p_currencyid
      , p_quantity = req.body.p_quantity
      , p_costprice = req.body.p_costprice
      , p_saleprice = req.body.p_saleprice
      , p_taxid = req.body.p_taxid
      , p_currentstock = req.body.p_currentstock
      , p_warehourse = req.body.p_warehourse
      , p_gstitem = req.body.p_gstitem
      , p_isactive = req.body.p_isactive
      , p_loginuser = req.body.p_loginuser
      , p_uom = req.body.p_uom
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)

   return new Promise((resolve, reject) => {

      const uomValue = JSON.stringify(req.body.p_uom);
      console.log('uomValue', uomValue);

      db.query('select ' + clientschema + '.insert_purchase_details_single($1::text,$2::int,$3::text,$4::text,$5::text,$6::int,$7::int,$8::int,$9::text,$10::int,$11::text,$12::int,$13::int,$14::int,$15::int,$16::int,$17::int,$18::text,$19::text,$20::text,$21::text,$22::jsonb)', [p_operationtype, p_purchaseid, p_itemname, p_itemsku, p_location, p_minimumstock, p_categoryid, p_warrentyperiod, p_expirydate, p_uomid, p_childuom, p_currencyid, p_quantity, p_costprice, p_saleprice, p_taxid, p_currentstock, p_warehourse, p_gstitem, p_isactive, p_loginuser, uomValue], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].insert_purchase_details_single
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}