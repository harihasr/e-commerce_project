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

module.exports = router;
