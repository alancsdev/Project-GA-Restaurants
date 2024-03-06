const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const restaurantsController = require('../controllers/restaurants');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, restaurantsController.index);

router.post('/', ensureLoggedIn, restaurantsController.index);

module.exports = router;
