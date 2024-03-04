const Order = require('../models/order');
const User = require('../models/user');

module.exports = {
  index,
  create,
};

async function index(req, res) {
  const name = req.params.name;
  res.render('order/index', { name });
}

async function create(req, res) {
  try {
    const user = await User.findOne({ googleId: req.user.googleId })
      .select('googleId')
      .lean();

    const items = req.body.orderItems;
    const newOrder = new Order({
      googleId: user.googleId,
      items: items,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Erro ao adicionar pedido:', error);
    res.status(500).json({ message: 'Erro ao adicionar pedido' });
  }
}
