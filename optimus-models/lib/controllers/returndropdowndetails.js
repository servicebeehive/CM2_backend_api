'use strict'
module.exports.returndropdowndetails = (req, res, next) => {
    let options = req.headers.options
        , db = options.db
        , p_username = req.body.p_username
        , p_returntype = req.body.p_returntype
        , p_returnvalue = req.body.p_returnvalue
        , clientschema = req.headers.options.db.clientdb

        , response = {
            'success': false,
            'message': ''

        }
    console.log('The body is', req.body)
    console.log('clientschema', clientschema)


    return new Promise((resolve, reject) => {

        db.query('select ' + clientschema + '.return_dropdown_value($1::text,$2::text,$3::text)', [p_returntype, p_returnvalue, p_username], (err, result) => {
            if (err) {
                console.log('The Error', err)
                response['success'] = false
                response['message'] = err.message
                return reject(response)

            } else {

                response['success'] = true
                response['message'] = 'data fetch'
                response['data'] = result.rows[0].return_dropdown_value
                return resolve(response)

            }

        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(200).json(response)
    })

}