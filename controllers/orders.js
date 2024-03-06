const Order = require('../models/order');
const User = require('../models/user');
// const orderScript = require('../public/javascripts/order');

module.exports = {
  index,
  orders,
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

async function orders(req, res) {
  try {
    const order = await Order.findOne({ googleId: req.user.googleId });
    console.log('MINHAS ORDERS', order);
    // res.render('order/my-orders', { order });
  } catch (err) {
    console.error('Error getting orders:', error);
    res.status(500).json({ message: 'Error getting orders' });
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
    // res.redirect('/my-orders');
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Error adding order' });
  }
}
