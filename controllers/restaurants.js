module.exports = {
  index,
};

async function index(req, res) {
  console.log('MEU BODY', req.body);
  res.render('restaurants/index', { user: req.user });
}
