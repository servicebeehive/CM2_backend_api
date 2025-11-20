'use strict'
module.exports.inserttaskdetails = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , customername = req.body.customername
      , location = req.body.location
      , phone = req.body.phone
      , remarks = req.body.remarks
      , uname = req.body.uname
      , servicetype = req.body.servicetype
      , producttype = req.body.producttype
      , clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.ins_task_details($1,$2,$3,$4,$5,$6,$7)', [customername, location, phone, remarks, servicetype, producttype, uname], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].ins_task_details
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}