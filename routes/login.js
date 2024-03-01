const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const loginController = require('../controllers/login');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', loginController.index);

module.exports = router;
