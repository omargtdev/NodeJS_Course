const router = require('express').Router();

router.get('/about', (req, res, next) => {
  res.send("<h1>About page</h1>")
}); //  About 

router.get('/contact', (req, res, next) => {

  res.send("<h1>Contact page</h1>")
}); // Contact

router.get('/', (req, res, next) => {
  res.send("<h1>Home page</h1>")
}); // Home 

module.exports = router;
