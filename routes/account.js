const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const accountController = require('../controllers/account');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, accountController.index);
router.get('/logout', accountController.logout);

router.post('/:id/address', ensureLoggedIn, accountController.create);

module.exports = router;
