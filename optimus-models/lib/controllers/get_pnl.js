'use strict'
module.exports.get_pnl = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_reporttype = req.body.p_reporttype
      , p_fromdate = req.body.p_fromdate
      , p_todate = req.body.p_todate
      , p_loginuser = req.body.p_loginuser
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
  
   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_pnl($1::text,$2::text,$3::text,$4::text)', [p_reporttype ,p_fromdate, p_todate, p_loginuser], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].get_pnl
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}