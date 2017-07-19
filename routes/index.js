var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var db = require('../app/db');
var dateTime = require('node-datetime');
var Cart = require('../models/cart');


var requireAuth = passport.authenticate('jwt', {session: false});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  db.findProductById(productId, function(product){
          cart.add(product, product.product_id);
          req.session.cart = cart;
          console.log(req.session.cart);
          res.status(200).json({success: true, message:'Successfully added to cart'});
      },
      function (err) {
          return res.json({error: err});
  });
});

router.get('/addtocart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    product = {
        price: 100
    };
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.status(200).json({success: true, message:'Successfully added to cart'});

});

router.get('/isvalid', requireAuth, function (request, response, next) {
   response.status(200).json({success: true, message:"Valid"});
});

router.post('/checkout', requireAuth, function (request, response, next) {
    var stripe = require("stripe")("sk_test_CnylQLVgH3XgJvdnGw5iBnEK");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
    var token = request.body.stripeToken; // Using Express
    var address_id = request.body.address_id;
    var products = request.body.products;
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    var user_id = request.user.user_id;

// Charge the user's card:
    var charge = stripe.charges.create({
        amount: request.body.amount * 100,
        currency: "usd",
        description: "Example charge to "+request.body.email_id,
        source: token,
    }, function(err, charge) {
        // asynchronously called
        if(err){
            console.log(err);
            response.status(400).json({success: false, message:'Error making charge'});
            return;
        }
        var order = {
            date: formatted,
            address_id: address_id,
            user_id: user_id
        };
        db.createOrder(order, function (res) {
            console.log("Purchase successful and updated in DB");
        }, function (err) {
            console.error("Internal Database error: "+err);
        });
        response.status(200).json({success: true, message:'Successfully bought the products'});

    });
});

module.exports = router;
