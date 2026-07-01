'use strict'

let selectCilentDataBaseDetails = (clientcode, db) => {
    return new Promise((resolve, reject) => {

        db.query("SELECT 'cm2' AS clientdb, 'cm2' AS dbname", (err, result) => {
            if (err) {
                console.log('Error in selectCilentDataBaseDetails', err)
                reject(err)
            } else {
                console.log('The Select Client DB Name____', result.rows[0].clientdb, result.rows[0])
                resolve(result.rows[0])
            }
        })

    })
}

module.exports = selectCilentDataBaseDetails