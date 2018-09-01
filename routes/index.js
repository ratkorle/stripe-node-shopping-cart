let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let Cart = require('../models/cart');
let Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err, docs) {
      let successMsg = req.flash('success')[0];
      // we create these chunks so it will fit in the bootstraps col-md-4 grid created in index.hbs
      let productChunks = [];
      let chunkSize = 3;
      for (let i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
      }
      res.render('shop/index', { title: 'Shopping Cart' , products: productChunks, successMsg: successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});
router.get('/reduce/:id', function(req, res, next) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});
router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    let cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});
router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    let cart = new Cart(req.session.cart);
    let errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    let cart = new Cart(req.session.cart);

    let stripe = require("stripe")(
        "sk_test_nYn7VxCUFzJJNZDmXoHFhpVo"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        let order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}