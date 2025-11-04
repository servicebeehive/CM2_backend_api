'use strict'


const express = require('express')
    , config = require(__dirname + '/config')
    , appdir = config.appDir
const router = express.Router()
    // const fileUpload = require('express-fileupload')

    , projectModels = require('optimus-models')
    , adauth = require('optimus-auth')
    , logincontroller = projectModels['login']
    , inserttaskdetailsController = projectModels['inserttaskdetails']
    , gettaskdetailsController = projectModels['gettaskdetails']
    , getuserdetailsController = projectModels['getuserdetails']
    , updatetaskdetailsController = projectModels['updatetaskdetails']
    , getreporttypesController = projectModels['reporttypecode']
    , getreporttdataController = projectModels['getreportdata']
    , getdevicetokenController = projectModels['getdevicetoken']
    , notificationController = projectModels['notification']
    , forgotpasswordController = projectModels['forgotpassword']
    , dropdownDetailsController = projectModels['dropdowndetails']


//router.post('/authenticate',adauth.authenticate)

router.post('/login', logincontroller.login)
router.post('/forgotpassword', forgotpasswordController.forgotpassword)
router.use(adauth.login)
router.post('/inserttask', inserttaskdetailsController.inserttaskdetails)
router.post('/gettaskdetails', gettaskdetailsController.gettaskdetails)
router.post('/getuserdetails', getuserdetailsController.getuserdetails)
router.post('/updatetaskdetails', updatetaskdetailsController.updatetaskdetails)
router.post('/getreporttype', getreporttypesController.reporttypecode)
router.post('/getreportdata', getreporttdataController.getreportdata)
router.post('/getdevicetoken', getdevicetokenController.getdevicetoken)
router.post('/getdropdowndetails', dropdownDetailsController.dropdowndetails)
router.post('/notification', notificationController.notification)




//



console.log('Server Started')
module.exports = router



