const axios = require('axios');
module.exports = {
  index,
};

async function index(req, res) {
  let LINKSEARCH =
    'https://api.yelp.com/v3/businesses/search?location=SYDNEY&categories=restaurants&limit=15';
  console.log(req.body);

  if (req.body.latitude && req.body.longitude !== undefined) {
    LINKSEARCH = `https://api.yelp.com/v3/businesses/search?latitude=${req.body.latitude}&longitude=${req.body.longitude}&categories=restaurants`;
  }
  axios
    .get(LINKSEARCH, {
      headers: {
        Authorization: process.env.API_KEY_YEL,
      },
    })
    .then((response) => {
      const restaurants = response.data.businesses.map((restaurant) => ({
        name: restaurant.name,
        image_url: restaurant.image_url,
        categories: restaurant.categories.map((category) => category.title),
        rating: restaurant.rating,
        price: restaurant.price,
        reviews: restaurant.review_count,
        random1: Math.floor(Math.random() * (30 - 10 + 1)) + 10,
        random2: Math.floor(Math.random() * (60 - 40 + 1)) + 40,
        featured: Math.floor(Math.random() * 2),
        cart: Math.floor(Math.random() * 5),
      }));

      const totalCart = restaurants.reduce((accumulator, currentRestaurant) => {
        return accumulator + currentRestaurant.cart;
      }, 0);
      res.render('restaurants/index', {
        user: req.user,
        restaurants,
        totalCart,
      });
    })
    .catch((error) => {
      console.error('Error getting data from Yelp API:', error);
      res.render('error', { error: 'Error getting data from Yelp API' });
    });
}
