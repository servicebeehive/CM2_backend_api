'use strict'
module.exports.getreportdata = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_startdate = req.body.startdate
      , p_enddate = req.body.enddate
      , p_status = req.body.status
      , p_taskassignee = req.body.taskassignee
      
       ,p_reporttypecode = req.body.reporttypecode
       ,p_userid = req.body.userid     
       ,clientschema = req.headers.options.db.clientdb
      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', clientschema)

  
   return new Promise((resolve, reject) => {

      db.query('select ' +clientschema +'.get_report_data($1::timestamp,$2::timestamp,$3::text,$4::int,$5::text,$6::int)', [p_startdate,p_enddate,p_status,p_taskassignee,p_reporttypecode,p_userid], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = 'Error in Operation'
            return reject(response)

         } else {
           
             response['success'] = true             
             response['message'] = 'data fetch'
             response['data'] =   result.rows[0].get_report_data
             return resolve(response)
                
            }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}