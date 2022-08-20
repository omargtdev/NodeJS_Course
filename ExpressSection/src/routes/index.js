const router = require('express').Router();

const admin = require('./admin');
const shop = require('./shop');

router.use(admin);
router.use(shop);

module.exports = router;
