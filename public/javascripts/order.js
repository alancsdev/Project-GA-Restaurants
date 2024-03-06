document.addEventListener('DOMContentLoaded', function () {
  const menuList = document.getElementById('menu-list');
  const orderList = document.getElementById('order-list');
  const totalSpan = document.getElementById('total');
  const orderItems = [];

  const menuItems = [
    { description: 'Simple Burger', price: 10 },
    { description: 'Double Burger', price: 15 },
    { description: 'Cheeseburger', price: 12 },
    { description: 'Bacon Burger', price: 13 },
    { description: 'Veggie Burger', price: 11 },
    { description: 'Chicken Sandwich', price: 9 },
    { description: 'Fish Burger', price: 14 },
    { description: 'Onion Rings', price: 6 },
    { description: 'Milkshake', price: 7 },
    { description: 'Salad', price: 8 },
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

  const restaurantName = document.getElementById('nameRestaurant').textContent;
  const address = document.getElementById('address-detail');
  let auxAddress = true;
  let auxOrder = true;
  document
    .getElementById('btn-submit-order')
    .addEventListener('click', function (event) {
      if (address.textContent.trim() === '') {
        if (auxAddress) {
          const newP = document.createElement('p');
          newP.textContent = 'Add an address to your registration';
          address.insertAdjacentElement('afterend', newP);
          auxAddress = !auxAddress;
        }
        event.preventDefault();
      } else if (orderItems.length === 0) {
        if (auxOrder) {
          const newP = document.createElement('p');
          newP.textContent = 'Add items to your order';
          address.insertAdjacentElement('afterend', newP);
          auxAddress = !auxAddress;
        }
        event.preventDefault();
      } else {
        fetch('/order/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderItems, restaurantName }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error adding the order');
            }
            return response.json();
          })
          .then((data) => {
            window.location.href = '/order/my-orders';
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
});
