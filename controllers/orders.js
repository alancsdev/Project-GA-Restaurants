const Order = require('../models/order');
const User = require('../models/user');

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const user = await User.findOne({ googleId: req.user.googleId });
    const name = req.params.name;
    res.render('order/index', { name, user });
  } catch (err) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Error getting user' });
  }
}

async function create(req, res) {
  try {
    const user = await User.findOne({ googleId: req.user.googleId })
      .select('googleId')
      .lean();
    const items = req.body.orderItems;
    const newOrder = new Order({
      restaurant: req.body.restaurantName,
      googleId: user.googleId,
      items: items,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Error adding order' });
  }
}
