function handleItemClick(item) {
  const items = document.querySelectorAll('.settings-item');
  const user = document.querySelector('.account-title');
  const userAddress = document.querySelector('.account-title-address');
  console.log(items);
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

navigator.geolocation.getCurrentPosition(function (position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Enviar dados de localização para o servidor
  fetch('/location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ latitude, longitude }),
  })
    .then((response) => {
      // Lidar com a resposta do servidor
      if (response.ok) {
        return response.json();
      }
      throw new Error('Erro ao obter dados dos restaurantes');
    })
    .then((data) => {
      // Manipular os dados dos restaurantes recebidos do servidor
      console.log('Dados dos restaurantes:', data);
      // Aqui você pode atualizar a página ou fazer qualquer outra coisa com os dados
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
});
