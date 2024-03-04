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

document.addEventListener('DOMContentLoaded', function () {
  const menuList = document.getElementById('menu-list');
  const orderList = document.getElementById('order-list');
  const totalSpan = document.getElementById('total');
  const orderItems = [];

  const menuItems = [
    {
      description: 'Hamburguer Simples',
      price: 10,
    },
    { description: 'Hamburguer Duplo', price: 15 },
    { description: 'Batata Frita', price: 5 },
    { description: 'Refrigerante', price: 3 },
  ];

  function addItem(item) {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.description === item.description
    );
    if (existingItem) {
      existingItem.amount++;
      existingItem.element.textContent = `${item.description} x${
        existingItem.amount
      } - $${(existingItem.amount * item.price).toFixed(2)}`;
    } else {
      const itemOrdered = document.createElement('li');
      itemOrdered.textContent = `${item.description} x1 - $${item.price.toFixed(
        2
      )}`;
      orderList.appendChild(itemOrdered);
      orderItems.push({ ...item, amount: 1, element: itemOrdered });
    }

    const totalAtual = parseFloat(totalSpan.textContent);
    totalSpan.textContent = (totalAtual + item.price).toFixed(2);

    console.log(orderItems);
  }

  function removeItem(description, price) {
    const index = orderItems.findIndex(
      (item) => item.description === description
    );
    if (index !== -1) {
      orderItems[index].amount--;
      if (orderItems[index].amount === 0) {
        orderItems[index].element.remove();
        orderItems.splice(index, 1);
      } else {
        orderItems[index].element.textContent = `${description} x${
          orderItems[index].amount
        } - $${(orderItems[index].amount * price).toFixed(2)}`;
      }

      const totalAtual = parseFloat(totalSpan.textContent);
      totalSpan.textContent = (totalAtual - price).toFixed(2);
    }
  }

  menuItems.forEach((item) => {
    const listItem = document.createElement('li');
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('item-details');
    divWrapper.innerHTML = `
      <div class="item-details-span">
        <span>${item.description} - $${item.price.toFixed(2)}</span>
      </div>
      <div class="item-details-buttons">
        <button class="btn-add">+</button>
        <button class="btn-remove">-</button>
      </div>
    `;
    listItem.appendChild(divWrapper);
    menuList.appendChild(listItem);

    divWrapper.querySelector('.btn-add').addEventListener('click', () => {
      addItem(item);
    });

    divWrapper.querySelector('.btn-remove').addEventListener('click', () => {
      removeItem(item.description, item.price);
    });
  });

  document
    .getElementById('btn-submit-order')
    .addEventListener('click', function () {
      fetch('/order/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderItems }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao adicionar pedido');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Pedido adicionado com sucesso:', data);
        })
        .catch((error) => {
          console.error('Erro:', error);
        });
    });
});
