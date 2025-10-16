'use strict'
const selectDBObject = require('../../config/selectdb.js')
const _ = require('lodash')
    , jwt = require('jsonwebtoken')
    , secret = "beehive@dev"



module.exports.login = (req, res, next) => {
    let options = req.headers.options
        , db = options.db
    let uname = req.body.uname
        , token = req.body['x-access-token']
        , clientcode = req.body.clientcode



    let _selectTokenAndUserName = (uname_val, clientschema) => {

        return new Promise((resolve, reject) => {
            db.query('select ' + clientschema + '.get_user_token($1,$2)', [uname_val, 'GET'], (err, result) => {
                if (err) {
                    console.log('Error', err)
                    reject(null)
                } else {
                    console.log('The Select Token', result)
                    resolve(result)
                }
            })
        })


    }
    let _updateTokenInDataBase = (uname_val, clientschema) => {
        return new Promise((resolve, reject) => {
            db.query('select ' + clientschema + '.get_user_token($1,$2)', [uname_val, 'UPDATE'], (err, result) => {
                if (err) {
                    console.log('Error', err)
                    reject(null)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //Check from DB User Token is exists or NOT
    selectDBObject(clientcode, db).then(result => {
        if (result.validatedclient == 1) {
            req.headers.options.db.clientdb = result.dbname

            _selectTokenAndUserName(uname, req.headers.options.db.clientdb).then(result => {
                console.log('Inside Login Auth', result.rows[0].get_user_token)
                if (!result.rows[0].get_user_token) {
                    return res.status(501).json({ success: false, tokenstatus: false, message: 'Please provide your login credentials First' })
                    //console.log('Error in Token Selection')
                } else {
                    console.log('the token', token)
                    if (token === result.rows[0].get_user_token[0].usertoken) {
                        console.log('the token', token)
                        jwt.verify(token, secret, (error, result) => {
                            if (error) {
                                _updateTokenInDataBase(uname, req.headers.options.db.clientdb).then(result => {
                                    console.log('The Generated Token Is', result)

                                })
                                return res.status(200).json({ success: false, tokenstatus: false, message: 'Token Verification fail' })

                            } else {
                                console.log('The client DB name____', req.headers.options.db.clientdb)
                                next()
                            }
                        })
                    } else {
                        return res.status(200).json({ success: false, tokenstatus: false, message: 'Please provide your login credentials' })
                    }
                }
            })
        } else {
            return res.status(200).json({ success: false, tokenstatus: false, message: 'Please check your suscription' })
        }
    })

}