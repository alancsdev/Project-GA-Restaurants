const User = require('../models/user');

module.exports = {
  index,
  logout,
  create,
};

async function index(req, res) {
  res.render('account/index', { user: req.user });
}

async function logout(req, res) {
  res.render('/logout');
}

async function create(req, res) {
  try {
    const user = await User.findById(req.params.id);

    user.address = req.body.address;

    await user.save();

    res.redirect('/account');
  } catch (error) {
    console.error('Error saving the address:', error);
    res.status(500).send('Error saving address. Please try again later.');
  }
}
