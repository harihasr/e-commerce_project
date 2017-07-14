/**
 * Created by Sampath on 7/8/2017.
 */
var passport = require('passport');
var express = require('express');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var crypt = require('../app/crypt');
var db = require('../app/db');
var apiRoutes = express.Router();

// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});

apiRoutes.get('/orders', requireAuth, function (request, response) {
    var user_type = request.user.user_type;
    console.log(request.body);
    if(!user_type) {
        db.getAllOrders(function (res) {
            response.status(200).json({success: true, orders: res});
        }, function (err) {
            response.status(400).json({success: false, message: "Error retrieving orders"});
        })
    }
    else{
        response.status(400).json({success: false, message: "Unauthorized"});
    }
});

apiRoutes.put('/orders', requireAuth, function (request, response) {
    var user_type = request.user.user_type;
    console.log(request.body);
    if(!user_type) {
        var order = {
            order_id: request.body.order_id,
            status: request.body.status
        };
        db.updateOrder(order, function (res) {
            response.status(200).json({success: true, message: "Successfully updated"});
        }, function (err) {
            response.status(400).json({success: false, message: "Error retrieving orders"});
        })
    }
    else{
        response.status(400).json({success: false, message: "Unauthorized"});
    }
});

module.exports = apiRoutes;