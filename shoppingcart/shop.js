const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartList = document.getElementById('cart-items');

function changeItemQuantity(index, change) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1); // Удаляем товар из корзины, если его количество стало равно 0
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

function displayCartItems() {
    cartList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `<img src="${item.image}" alt="${item.name}">
                                 <span>${item.name} - $${item.price} - Количество: ${item.quantity}</span>`;

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.onclick = () => changeItemQuantity(index, 1);

        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.onclick = () => changeItemQuantity(index, -1);

        itemElement.appendChild(increaseBtn);
        itemElement.appendChild(decreaseBtn);

        li.appendChild(itemElement);
        cartList.appendChild(li);
    });
}

displayCartItems();

/**/

function calculateTotal() {
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    return { totalQuantity, totalPrice };
}

function updateCartSummary() {
    const { totalQuantity, totalPrice } = calculateTotal();

    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Вызываем функцию для обновления информации о корзине после каждого изменения количества товаров
updateCartSummary();