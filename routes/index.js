let express = require('express');
let router = express.Router();
let Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err, docs) {
      // we create these chunks so it will fit in the bootstraps col-md-4 grid created in index.hbs
      let productChunks = [];
      let chunkSize = 3;
      for (let i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
      }
      res.render('shop/index', { title: 'Shopping Cart' , products: productChunks});
  });
});


module.exports = router;
