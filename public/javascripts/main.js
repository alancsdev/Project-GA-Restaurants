function handleItemClick(item) {
  const items = document.querySelectorAll('.settings-item');
  const user = document.querySelector('.account-title');
  const userAddress = document.querySelector('.account-title-address');
  items.forEach(function (item) {
    item.classList.remove('settings-item-selected');
  });

  item.closest('.settings-item').classList.add('settings-item-selected');

  if (items[0].classList.contains('settings-item-selected')) {
    user.style.display = 'block';
  } else {
    user.style.display = 'none';
  }

  if (items[1].classList.contains('settings-item-selected')) {
    userAddress.style.display = 'block';
  } else {
    userAddress.style.display = 'none';
  }
}

let latitude = undefined;
let longitude = undefined;

// Get cookie, if there is no cookie, call the getLocation()
function getLocationFromCookie() {
  const cookies = document.cookie.split(';');

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name === 'latitude') {
      latitude = value;
    } else if (name === 'longitude') {
      longitude = value;
    }
  });

  if (!latitude && !longitude) {
    getLocation();
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, handleLocationError);
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// Save the location in the cookies and send a request to the server to update the restaurant page
function sendLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  const currentDate = new Date();

  const expirationDate = new Date(
    currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
  );
  document.cookie = `latitude=${latitude}; expires=${expirationDate}; path=/`;
  document.cookie = `longitude=${longitude}; expires=${expirationDate}; path=/`;

  fetch('/reload-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ latitude, longitude }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to send location data to server');
      }
      window.location.reload();
      console.log('Location data sent successfully to server');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function handleLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      console.error('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      console.error('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      console.error('An unknown error occurred.');
      break;
    default:
      console.error('An unknown error occurred.');
      break;
  }
}

getLocationFromCookie();
