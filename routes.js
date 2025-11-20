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
    , insertpurchaseheaderController = projectModels['insertpurchaseheader']
    , insertitemdetailsController = projectModels['insertitemdetails']
    , deletepurchasedetailsController = projectModels['deletepurchasedetails']
    , getstockadjustmentController = projectModels['getstockadjustment']
    , updatestockadjustmentController = projectModels['updatestockadjustment']
    , getitemdetailsController = projectModels['getitemdetails']
    , inserttransactiondetailsController = projectModels['inserttransactiondetails']
    , returndropdownDetailsController = projectModels['returndropdowndetails']

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
//CM2 APIs
router.post('/getdropdowndetails', dropdownDetailsController.dropdowndetails)
router.post('/returndropdowndetails', returndropdownDetailsController.returndropdowndetails)
router.post('/insertpurchaseheader', insertpurchaseheaderController.insertpurchaseheader)
router.post('/insertitemdetails', insertitemdetailsController.insertitemdetails)
router.post('/deletepurchasedetails', deletepurchasedetailsController.deletepurchasedetails)
router.post('/getstockadjustment', getstockadjustmentController.getstockadjustment)
router.post('/updatestockadjustment', updatestockadjustmentController.updatestockadjustment)
router.post('/getitemdetails', getitemdetailsController.getitemdetails)
router.post('/inserttransactiondetails', inserttransactiondetailsController.inserttransactiondetails)
router.post('/notification', notificationController.notification)
//
console.log('Server Started')
module.exports = router



