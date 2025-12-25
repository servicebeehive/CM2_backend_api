'use strict'
module.exports.updateprofile = (req, res, next) => {
   let options = req.headers.options
      , db = options.db
      , p_companyname = req.body.p_companyname
      , p_companyaddress = req.body.p_companyaddress
      , p_companycity = req.body.p_companycity
      , p_companystate = req.body.p_companystate
      , p_companycountry = req.body.p_companycountry
      , p_companypincode = req.body.p_companypincode
      , p_companyphone = req.body.p_companyphone
      , p_companyemail = req.body.p_companyemail
      , p_companygstno = req.body.p_companygstno
      , p_companycontactperson = req.body.p_companycontactperson
      , p_companycontactphone = req.body.p_companycontactphone
      , p_companycontactemail = req.body.p_companycontactemail
      , p_companylogo = req.body.p_companylogo
      , p_statecode = req.body.p_statecode
      , p_bankname = req.body.p_bankname
      , p_branch = req.body.p_branch
      , p_ifsc = req.body.p_ifsc
      , p_accountno = req.body.p_accountno
      , p_pan = req.body.p_pan
      , p_warehouse = req.body.p_warehouse
      , p_loginuser = req.body.p_loginuser
      , clientschema = req.headers.options.db.clientdb

      , response = {
         'success': false,
         'message': ''

      }
   console.log('The body is', req.body)


   return new Promise((resolve, reject) => {

      db.query('select ' + clientschema + '.update_profile($1::text,$2::text,$3::text,$4::text,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text,$11::text,$12::text,$13::text,$14::text,$15::text,$16::text,$17::text,$18::text,$19::text,$20::text,$21::text)', [p_companyname, p_companyaddress, p_companycity, p_companystate, p_companycountry, p_companypincode, p_companyphone, p_companyemail, p_companygstno, p_companycontactperson, p_companycontactphone, p_companycontactemail, p_companylogo, p_statecode, p_bankname, p_branch, p_ifsc, p_accountno, p_pan, p_warehouse, p_loginuser], (err, result) => {
         if (err) {
            console.log('The Error', err)
            response['success'] = false
            response['message'] = err.message
            return reject(response)

         } else {

            response['success'] = true
            response['message'] = 'data fetch'
            response['data'] = result.rows[0].update_profile
            return resolve(response)

         }

      })
   }).then(response => {
      res.status(200).json(response)
   }).catch(error => {
      res.status(200).json(response)
   })

}