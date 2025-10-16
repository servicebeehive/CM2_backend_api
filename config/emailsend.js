'use strict'

var nodemailer = require('nodemailer')


    
   let sendmail =(toEmailAddress,emailSubject,emailBody)=>{
       
   

        var transporter = nodemailer.createTransport({
            host:'smtp.hostinger.com',
            smtp:'',
            secureConnection:'tls',
            port:'465',
            auth: {
                user: 'do_not_reply@cryptohashh.com',
                pass: 'Do_not_reply21'
            }
            // service: 'smtp.hostinger.com',
            // auth: {
            //        user: 'support@cryptohashh.com',
            //        pass: 'sumant2702'
            //    }
        })
        var mailOptions = {
            from: 'do_not_reply@cryptohashh.com',
            to: toEmailAddress,
            subject: emailSubject,
            html: emailBody
          }
          transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.log('The Email Not Send',error)
            } else {
              console.log('Email sent')
             
            }
          })

     
    }

module.exports = sendmail