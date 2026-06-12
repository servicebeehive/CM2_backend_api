'use strict'


const express = require('express')
    , config = require(__dirname + '/config')
    , appdir = config.appDir
const router = express.Router()
    // const fileUpload = require('express-fileupload')

    , projectModels = require('./optimus-models')
    , adauth = require('./optimus-auth')
    , logincontroller = projectModels['login']
    , inserttaskdetailsController = projectModels['inserttaskdetails']
    , gettaskdetailsController = projectModels['gettaskdetails']
    , getuserdetailsController = projectModels['getuserdetails']
    , updatetaskdetailsController = projectModels['updatetaskdetails']
    , getreporttypesController = projectModels['reporttypecode']
    , getreporttdataController = projectModels['getreportdata']
    , getdevicetokenController = projectModels['getdevicetoken']
    , notificationController = projectModels['notification']
    , dropdownDetailsController = projectModels['dropdowndetails']
    , insertpurchaseheaderController = projectModels['insertpurchaseheader']
    , insertitemdetailsController = projectModels['insertitemdetails']
    , deletepurchasedetailsController = projectModels['deletepurchasedetails']
    , getstockadjustmentController = projectModels['getstockadjustment']
    , updatestockadjustmentController = projectModels['updatestockadjustment']
    , getitemdetailsController = projectModels['getitemdetails']
    , inserttransactiondetailsController = projectModels['inserttransactiondetails']
    , getcalculatedMRPController = projectModels['getcalculatedMRP']
    , returndropdownDetailsController = projectModels['returndropdowndetails']
    , deletechildUOMController = projectModels['deletechildUOM']
    , returnitemreportdetailsController = projectModels['returnitemreportdetails']
    , returntranreportdetailsController = projectModels['returntranreportdetails']
    , gettrasnactionreportController = projectModels['gettrasnactionreport']
    , getdashboardreportController = projectModels['getdashboardreport']
    , getinvoicedetailsController = projectModels['getinvoicedetails']
    , updateprofileController = projectModels['updateprofile']
    , gettrasnactiondetailsController = projectModels['gettrasnactiondetails']
    , tbltransactionmiscController = projectModels['tbltransactionmisc']
    , fnupserttransactionmiscController = projectModels['fnupserttransactionmisc']
    , fndeletetransactionController = projectModels['fndeletetransaction']
    , fnupsertcustomermasterController = projectModels['fnupsertcustomermaster']
    , fnupsertsuppliermasterController = projectModels['fnupsertsuppliermaster']
    , fnmanageapprovalrulelevelsController = projectModels['fnmanageapprovalrulelevels']
    , fnupdatewriteoffamountController = projectModels['fnupdatewriteoffamount']
    , fnapproverequestController = projectModels['fnapproverequest']
    , get_pnlController = projectModels['get_pnl']
//router.post('/authenticate',adauth.authenticate)

router.post('/login', logincontroller.login)
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
router.post('/deletechildUOM', deletechildUOMController.deletechildUOM)
router.post('/getstockadjustment', getstockadjustmentController.getstockadjustment)
router.post('/updatestockadjustment', updatestockadjustmentController.updatestockadjustment)
router.post('/getitemdetails', getitemdetailsController.getitemdetails)
router.post('/inserttransactiondetails', inserttransactiondetailsController.inserttransactiondetails)
router.post('/getcalculatedMRP', getcalculatedMRPController.getcalculatedMRP)
router.post('/returnitemreportdetails', returnitemreportdetailsController.returnitemreportdetails)
router.post('/returntranreportdetails', returntranreportdetailsController.returntranreportdetails)
router.post('/gettrasnactionreport', gettrasnactionreportController.gettrasnactionreport)
router.post('/getdashboardreport', getdashboardreportController.getdashboardreport)
router.post('/getinvoicedetails', getinvoicedetailsController.getinvoicedetails)
router.post('/gettrasnactiondetails', gettrasnactiondetailsController.gettrasnactiondetails)
router.post('/updateprofile', updateprofileController.updateprofile)
router.post('/notification', notificationController.notification)
router.post('/tbltransactionmisc', tbltransactionmiscController.tbltransactionmisc)
router.post('/fnupserttransactionmisc', fnupserttransactionmiscController.fnupserttransactionmisc)
router.post('/fndeletetransaction', fndeletetransactionController.fndeletetransaction)
router.post('/fnupsertcustomermaster', fnupsertcustomermasterController.fnupsertcustomermaster)
router.post('/fnupsertsuppliermaster',fnupsertsuppliermasterController.fnupsertsuppliermaster)
router.post('/fnmanageapprovalrulelevels', fnmanageapprovalrulelevelsController.fnmanageapprovalrulelevels)
router.post('/fnupdatewriteoffamount', fnupdatewriteoffamountController.fnupdatewriteoffamount)
router.post('/fnapproverequest', fnapproverequestController.fnapproverequest )
router.post('/get_pnl', get_pnlController.get_pnl)
//
console.log('Server Started')
module.exports = router



