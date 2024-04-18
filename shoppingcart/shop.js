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


/*отображает элементы корзины на странице.*/
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

/*считает количество элементов в корзине и подсчитывает общую цену:*/
function calculateCartTotal() {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    return { totalItems, totalPrice };
}