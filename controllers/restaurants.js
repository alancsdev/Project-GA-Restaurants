module.exports = {
  index,
};

async function index(req, res) {
  res.render('restaurants/index', { user: req.user });
}
