'use strict'
module.exports.updatetaskdetails = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_type = req.body.operationtype
      , p_taskid = req.body.taskid
      , p_status = req.body.taskstatus
      , p_remark = req.body.remark
      , p_user = req.body.taskassignee
      , p_uname = req.body.uname
      , clientschema = req.headers.options.db.clientdb

      , response = {
         'success': false,
         'message': ''

      }

   console.log('The body is', req.body)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.update_task_details($1::text,$2::int,$3::text,$4::text,$5::int,$6::text)', [p_type, p_taskid, p_status, p_remark, p_user, p_uname], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].update_task_details
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}