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

document.addEventListener('DOMContentLoaded', function () {
  const menuList = document.getElementById('menu-list');
  const pedidoList = document.getElementById('pedido-list');
  const totalSpan = document.getElementById('total');
  const orderItems = {};

  const menuItems = [
    { name: 'Hamburguer Simples', price: 10 },
    { name: 'Hamburguer Duplo', price: 15 },
    { name: 'Batata Frita', price: 5 },
    { name: 'Refrigerante', price: 3 },
  ];

  // Função para adicionar um item ao pedido
  function addItem(name, price) {
    if (orderItems[name]) {
      orderItems[name].amount++;
      orderItems[name].element.textContent = `${name} x${
        orderItems[name].amount
      } - R$${(orderItems[name].amount * price).toFixed(2)}`;
    } else {
      const itemPedido = document.createElement('li');
      itemPedido.textContent = `${name} x1 - R$${price.toFixed(2)}`;
      pedidoList.appendChild(itemPedido);
      orderItems[name] = { amount: 1, element: itemPedido };
    }

    // Atualiza o total
    const totalAtual = parseFloat(totalSpan.textContent);
    totalSpan.textContent = (totalAtual + price).toFixed(2);
  }

  // Função para remover um item do pedido
  function removeItem(name, price) {
    if (orderItems[name]) {
      orderItems[name].amount--;
      if (orderItems[name].amount === 0) {
        orderItems[name].element.remove();
        delete orderItems[name];
      } else {
        orderItems[name].element.textContent = `${name} x${
          orderItems[name].amount
        } - R$${(orderItems[name].amount * price).toFixed(2)}`;
      }

      // Atualiza o total
      const totalAtual = parseFloat(totalSpan.textContent);
      totalSpan.textContent = (totalAtual - price).toFixed(2);
    }
  }

  // Gera a lista de itens do menu dinamicamente
  menuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${item.name} - R$${item.price.toFixed(2)}</span>
      <button class="btn-add">+</button>
      <button class="btn-remove">-</button>
    `;
    menuList.appendChild(listItem);

    // Adiciona eventos de clique aos botões
    listItem.querySelector('.btn-add').addEventListener('click', () => {
      addItem(item.name, item.price);
    });

    listItem.querySelector('.btn-remove').addEventListener('click', () => {
      removeItem(item.name, item.price);
    });
  });
});
