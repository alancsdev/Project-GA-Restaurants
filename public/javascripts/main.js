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
