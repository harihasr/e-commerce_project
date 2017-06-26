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

var csrfProtection = csrf();
apiRoutes.use(csrfProtection);

// API Route Section

// Bring in defined Passport Strategy
require('../config/passport')(passport);

// Create API group routes


// Fetching products
apiRoutes.get('/', function (request, response) {
    console.log(request.body);
    var product;
    db.getProducts(product, function (res) {
       response.status(200).json({success: true, products:res});
    }, function (err) {
        return response.status(400).json({success: false, message: 'Error fetching products'});
    });

});

module.exports = apiRoutes;
