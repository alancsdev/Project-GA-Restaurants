module.exports = {
  index,
};

async function index(req, res) {
  console.log('MEU BODY', req.body);
  res.render('restaurants/index', { user: req.user, function: getLocation() });
}

function getLocation() {
  if (navigator.geolocation) {
    console.log(navigator.geolocation.getCurrentPosition(getCoordinates));
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function getCoordinates(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log('Latitude: ' + latitude);
  console.log('Longitude: ' + longitude);

  // Agora você pode fazer a solicitação à API da Yelp usando as coordenadas obtidas
  const apiUrl = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=restaurant`;

  fetch(apiUrl, {
    headers: {
      Authorization: 'Bearer SUA_CHAVE_DE_API',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Aqui estão os dados dos restaurantes próximos
    })
    .catch((error) => {
      console.error('Erro ao buscar dados:', error);
    });
}
