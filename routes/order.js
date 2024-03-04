const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const orderController = require('../controllers/orders');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/:name', ensureLoggedIn, orderController.index);

router.post('/add', ensureLoggedIn, orderController.create);

module.exports = router;
