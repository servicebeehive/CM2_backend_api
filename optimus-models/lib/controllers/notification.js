'use strict'
const express = require('express');

const FCM = require('fcm-node');

const serverKey = 'AAAAdO3Tky4:APA91bF47ib5ev-8VeOX4RpYTR0AtQThP8rHFDIyWBjLC6AAxH5iC3-zyjo_Ab2CFKOcmdtZ26ZN-gBqbUg1qP2uahXhTPbzo5vsf34xC3rkBy_-GRxWpJoMKZZstCrFqBOHpG4naXui';
const fcm = new FCM(serverKey);

module.exports.notification = (req, res, next) => {

   let response = {
      'success': false,
      'message': ''
   }

   const message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: req.body.userFcmToken,

      notification: {
         title: req.body.notificationTitle,
         body: req.body.notificationBody
      },

      priority: req.body.notificationPriority ? req.body.notificationPriority : 'high',

      // data: {  //you can send only notification or only data(or include both)
      //     my_key: 'my value',
      //     my_another_key: 'my another value'
      // }
   };
   fcm.send(message, function (err, data) {
      if (err) {
         response['success'] = false
         response['message'] = err.message
         return res.status(200).json(response)
      } else {
         response['success'] = true
         response['message'] = 'Notified'
         response['data'] = data
         return res.status(200).json(response)
      }
   });

}