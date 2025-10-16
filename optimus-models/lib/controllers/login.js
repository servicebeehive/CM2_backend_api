'use strict'
const selectDBObject = require('../../../../config/selectdb.js')

module.exports.login = (req, res, next) => {
    let options = req.headers.options
        , logger = options.logger
        , db = options.db
        , usercode = req.body.usercode
        , pwd = req.body.pwd
        , logintype = req.body.logintype
        , clientcode = req.body.clientcode
        , jwt = require('jsonwebtoken')
        , secret = "beehive@dev"
        , emailconfig = require('../../../../config/emailsend.js')
        , response = {
            'success': false,
            'message': ''

        }
        , token = ''
    console.log('The body is', req.body)


    let _generateToken = (usercode_val) => {
        return new Promise((resolve, reject) => {
            let token = jwt.sign({ usercode: usercode_val }, secret, {
                expiresIn: "1d" // expires in NINTY_DAYS
            })
            resolve(token)
        })
    }
    let _updateNewGeneratedTokenInDataBase = (usercode_val, new_token) => {
        return new Promise((resolve, reject) => {
            db.query('select ' + db.clientdb + '.get_user_update_token($1,$2)', [usercode_val, new_token], (err, result) => {
                if (err) {
                    console.log('Error', err)
                    reject(null)
                } else {
                    resolve(result)
                }
            })
        })
    }

    return new Promise((resolve, reject) => {

        selectDBObject(clientcode, db).then(result => {
            console.log('result', result)
            if (result.validatedclient === true) {
                db.clientdb = result.dbname
                db.query('Select ' + db.clientdb + '.get_user_login($1,$2,$3)', [usercode, pwd, logintype], (err, finalresult) => {
                    console.log('finalresult', finalresult.rows[0]);
                    if (err) {
                        console.log('The Error', err)
                        response['success'] = false
                        response['message'] = 'Error in Operation'
                        return reject(response)

                    } else {
                        //console.log('the row value', finalresult.rows[0].get_user_signin)
                        response['success'] = true
                        response['message'] = 'Data Fetched'
                        token = finalresult.rows[0].get_user_login[0].usertoken
                        console.log('The Token Is', token)
                        // logger.info('User Toekn',finalresult.rows[0].get_user_login[0].usertoken)
                        if (token) {
                            jwt.verify(token, secret, (error, jwtresult) => {
                                console.log('verify JWT error', error)
                                console.log('verify result', jwtresult)
                                if (error) {

                                    _generateToken(usercode).then(returntoken => {
                                        console.log('The Generated Token Is', returntoken)
                                        _updateNewGeneratedTokenInDataBase(usercode, returntoken).then(result => {
                                            //console.log('The Generated Token Is', result)
                                            finalresult.rows[0].get_user_login[0].usertoken = returntoken
                                            response['data'] = finalresult.rows[0].get_user_login[0]
                                            return resolve(response)

                                        })
                                    })


                                } else {
                                    response['data'] = finalresult.rows[0].get_user_login[0]
                                    logger.info('Response Data login ', response)
                                    return resolve(response)

                                }
                            })
                        } else {
                            if (token == null || token == '') {
                                _generateToken(usercode).then(returntoken => {
                                    console.log('The Generated Token Is', returntoken)
                                    _updateNewGeneratedTokenInDataBase(usercode, returntoken).then(result => {
                                        //console.log('The Generated Token Is', result)
                                        finalresult.rows[0].get_user_login[0].usertoken = returntoken
                                        response['data'] = finalresult.rows[0].get_user_login[0]
                                        return resolve(response)

                                    })
                                })
                            } else {
                                response['success'] = false
                                response['data'] = finalresult.rows[0].get_user_login[0]
                                response['message'] = finalresult.rows[0].get_user_login[0].msg
                                return resolve(response)

                            }

                        }
                    }

                })
            } else {
                response['success'] = false
                response['data'] = ''
                response['message'] = "Suscription over Or client code worng"
                res.status(200).json(response)
            }
        })

    }).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        console.log(error)
        res.status(200).json(response)
    })

}