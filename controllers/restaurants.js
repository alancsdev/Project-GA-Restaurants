const axios = require('axios');
module.exports = {
  index,
};

async function index(req, res) {
  const random1 = 0;
  const random2 = 0;
  axios
    .get(
      'https://api.yelp.com/v3/businesses/search?location=SYDNEY&categories=restaurants&limit=15',
      {
        headers: {
          Authorization:
            'Bearer sOETYfHBSv8BY_SKA8Bjf5cqtOfm0IGmke-ROchPULdGYBoyyFQaQMX9Qzo6ds2ex7oqehYJoVwzSmWTS0ytJZ6HzjpmSG8oBCp_PMrKu3wgRUeRoKNuyiJu043hZXYx',
        },
      }
    )
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
