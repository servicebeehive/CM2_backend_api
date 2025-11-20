'use strict'
module.exports.gettaskdetails = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , uname = req.body.uname
      , operationtype = req.body.operationtype
      , taskid = req.body.taskid
      , p_user = req.body.p_user
      , clientschema = req.headers.options.db.clientdb

      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.get_task_details($1::text,$2::int,$3::int)', [operationtype, taskid, p_user], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].get_task_details
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}