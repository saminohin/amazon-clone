let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cart-list');
const subtotalPrice = document.getElementById('subtotal-price');
const checkoutBtn = document.querySelector('.checkout-btn');

function renderCheckout() {
    cartList.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartList.innerHTML = `
            <h3>Your Amazon Cart is empty.</h3>
            <a href="index.html" style="color: #007185;">Continue shopping</a>
        `;
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        return;
    }

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="checkout-item-details">
                <h3>${item.title}</h3>
                <p style="color: #007600; font-size: 12px; margin-bottom: 5px;">In Stock</p>
                <div class="price">$${item.price.toFixed(2)}</div>
                <p style="font-size: 14px; margin-bottom: 10px;">Quantity: ${item.quantity}</p>
                <button class="remove-btn" onclick="removeItem(${item.id})">Delete</button>
            </div>
        `;
        cartList.appendChild(itemDiv);
    });

    subtotalPrice.innerText = `$${subtotal.toFixed(2)}`;
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCheckout();
}

function placeOrder() {
    alert("Order Placed Successfully! Thank you for shopping with us.");
    localStorage.removeItem('cart');
    window.location.href = "index.html";
}

window.addEventListener('DOMContentLoaded', renderCheckout);