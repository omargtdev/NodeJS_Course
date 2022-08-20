const router = require('express').Router();

router.get('/add-product', (req, res, next) => {
  res.send("<form action='/product' method='post'><input name='product'> <br> <input type='submit' value='Submit'></h1>")
}); // Add product 

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/add-product')
}); // New product (POST) 

module.exports = router;
