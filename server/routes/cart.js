/**
 * Created by Sampath on 6/20/2017.
 */
var passport = require('passport');
var express = require('express');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var crypt = require('../app/crypt');
var db = require('../app/db');
var apiRoutes = express.Router();

// var csrfProtection = csrf();
// apiRoutes.use(csrfProtection);

var requireAuth = passport.authenticate('jwt', {session: false});

// Bring in defined Passport Strategy
require('../config/passport')(passport);

// Create API group routes


// Fetching products
apiRoutes.get('/', requireAuth, function (request, response) {
    console.log(request.body);
    var user = {
        user_id: request.user.user_id
    };
    db.getCart(user, function (res) {
        response.status(200).json({success: true, cart:res});
    }, function (err) {
        return response.status(400).json({success: false, message: 'Error fetching cart'});
    });

});

apiRoutes.post('/', requireAuth, function (request, response) {
    console.log(request.body);
    var cart={
        product_id: request.body.product_id,
        user_id: request.user.user_id,
        quantity: request.body.quantity
    };
    db.addToCart(cart, function (res) {
        response.status(200).json({success: true, message: "Added to cart successfully"});
    }, function (err) {
        return response.status(400).json({success: false, message: 'Error adding products to cart'});
    });

});

apiRoutes.put('/', requireAuth, function (request, response) {
    console.log(request.body);
    var cart = {
        product_id: request.body.product_id,
        user_id: request.user.user_id,
        quantity: request.body.quantity
    };
    db.updateCart(cart, function (res) {
        response.status(200).json({success: true, message: "Updated cart successfully"});
    }, function (err) {
        return response.status(400).json({success: false, message: 'Error updating the products in cart'});
    });

});

apiRoutes.delete('/:product_id', requireAuth, function (request, response) {
    var product_id = request.params.product_id;
    console.log(request.body);
    var cart = {
        product_id: product_id,
        user_id: request.user.user_id
    };
    db.deleteCart(cart, function (res) {
        response.status(200).json({success: true, message: "Deleted the product in cart successfully"});
    }, function (err) {
        return response.status(400).json({success: false, message: 'Error deleting the product in cart'});
    });

});

module.exports = apiRoutes;
