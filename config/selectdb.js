'use strict'

let selectCilentDataBaseDetails = (clientcode, db) => {
    console.log('clientcode', clientcode);
    console.log('db', db);
    return new Promise((resolve, reject) => {

        if (clientcode) {
            console.log('The Client Id value is', clientcode)
            db.query('SELECT get_client_detail($1::text)', [clientcode], (err, result) => {
                console.log('The Result is client___', result.rows[0].get_client_detail[0])

                if (err) {
                    reject(null)
                } else {
                    console.log('The Select Client DB Name____', result.rows[0].get_client_detail[0])
                    resolve(result.rows[0].get_client_detail[0])

                }
            })
        }
        else {
            reject(null)
        }

    })

}

module.exports = selectCilentDataBaseDetails