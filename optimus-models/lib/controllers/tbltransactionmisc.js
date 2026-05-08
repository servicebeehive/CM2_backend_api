'use strict'
module.exports.tbltransactionmisc = (req, res, next) => {
    let options = req.headers.options
    , db = options.db
    , transaction_id = req.body.transaction_id
    , transaction_date = req.body.transaction_date
    , head = req.body.head
    , amount = req.body.amount
    , createdby = req.body.createdby
    , createdon = req.body.createdon
    , updatedby = req.body.updatedby
    , updatedon = req.body.updatedon
    , clientschema = req.headers.options.db.clientdb
    , response = {
        'success': false,
        'message': ''
    }
    console.log('The body is', clientschema)

    return new Promise((resolve,reject)=>{
        db.query('select ' + clientschema + '.tbl_transaction_misc($1::int,$2::text,$3::text,$4::numeric,$5::text,$6::text,$7::text,$8::text)'
        ,[transaction_id, transaction_date, head, amount, createdby, createdon,updatedby, updatedon], (err, result) =>{
            if(err){
                console.log('The Error',err)
                response['success'] = false
                response['message'] = err.message
                return reject(response)
            }else{
                response['success'] = true
                response['message'] = 'data fetch'
                response['data'] = result.rows[0].tbl_transaction_misc
                return resolve(response)
            }
        })
    }).then(response => {
        res.status(200).json(response)
    }).catch(error =>{
        res.status(200).json(response)
    });
};