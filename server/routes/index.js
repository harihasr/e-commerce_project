var express = require('express');
var router = express.Router();
var db = require('../app/db');
var Cart = require('../models/cart');

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

router.post('/checkout', function (request, response, next) {
    var stripe = require("stripe")("");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
    var token = request.body.stripeToken; // Using Express

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
        response.status(200).json({success: true, message:'Successfully bought the products'});
    });
});

module.exports = router;
