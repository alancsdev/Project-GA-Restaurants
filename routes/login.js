const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const loginController = require('../controllers/login');

router.get('/', loginController.index);

module.exports = router;
