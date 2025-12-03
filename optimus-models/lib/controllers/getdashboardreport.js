'use strict'
module.exports.getdashboardreport = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_reporttype = req.body.p_reporttype
      , p_warehouse = req.body.p_warehouse
      , p_period = req.body.p_period
      , p_category = req.body.p_category
      , p_item = req.body.p_item
      , p_loginuser = req.body.p_loginuser
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', clientschema)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_dashboardreport($1::text,$2::text,$3::text,$4::int,$5::text,$6::text)', [p_reporttype, p_warehouse, p_period, p_category, p_item, p_loginuser], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].get_dashboardreport
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}