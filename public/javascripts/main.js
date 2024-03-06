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

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, handleLocationError);
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

function sendLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  fetch('/restaurants', {
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

getLocation();

// let get = 0;

// function checkLocationAndReload() {
//   if (latitude !== undefined && longitude !== undefined && get === 0) {
//     location.reload();
//     get = 1;
//   }
// }

// function updateLocation() {
//   setInterval(checkLocationAndReload, 1000);
// }

// updateLocation();
