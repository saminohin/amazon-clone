// --- PRODUCT DATA ---
const mockProducts = [
    { id: 1, title: "EDOLICA Anti-Theft Laptop Backpack", discount: "15% off", deal: "Limited time deal", price: 29.99, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop" },
    { id: 2, title: "USB C to USB C Cable (2-Pack)", discount: "10% off", deal: "Limited time deal", price: 9.99, img: "https://images.unsplash.com/photo-1583863788434-e58f12b8d136?w=300&auto=format&fit=crop" },
    { id: 3, title: "Makeup Organizer and Storage Case", discount: "32% off", deal: "Limited time deal", price: 24.99, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop" },
    { id: 4, title: "Men's Chronograph Watch", discount: "13% off", deal: "Ends in 03:37:43", price: 89.99, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop" },
    { id: 5, title: "Wooden Jewelry Box Organizer", discount: "15% off", deal: "Ends in 03:37:43", price: 19.99, img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop" },
    { id: 6, title: "3-Tier Rolling Utility Cart", discount: "20% off", deal: "Limited time deal", price: 34.99, img: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=300&auto=format&fit=crop" },
    { id: 7, title: "Mechanical Gaming Keyboard RGB", discount: "25% off", deal: "Limited time deal", price: 49.99, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&auto=format&fit=crop" }
];

// --- CAROUSEL LOGIC ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-img');

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(() => { changeSlide(1); }, 5000);

// --- CART LOGIC ---
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    const product = mockProducts.find(p => p.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.title} added to cart!`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
}

// --- RENDER PRODUCTS ---
function createProductCard(product, isGrid = false) {
    const div = document.createElement('div');
    div.className = 'product-card';
    
    if (isGrid) {
        // Grid layout (Search results)
        div.innerHTML = `
            <img src="${product.img}" alt="${product.title}">
            <div class="discount-badge">${product.discount}</div>
            <div class="product-title" style="margin-bottom: 10px;">${product.title}</div>
            <div style="font-size: 18px; font-weight: bold; color: #B12704; margin-bottom: 10px;">$${product.price}</div>
            <button class="checkout-btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
        `;
    } else {
        // Horizontal row layout
        div.innerHTML = `
            <img src="${product.img}" alt="${product.title}">
            <div class="discount-badge">${product.discount}</div>
            <div class="deal-text">${product.deal}</div>
            <div class="product-title">${product.title}</div>
        `;
        div.addEventListener('click', () => {
            document.querySelector('.search-input').value = product.title;
            performSearch();
        });
    }
    return div;
}

function populateRow(rowId, products) {
    const row = document.getElementById(rowId);
    row.innerHTML = '';
    products.forEach(product => {
        row.appendChild(createProductCard(product, false));
    });
}

// --- SEARCH FUNCTIONALITY ---
const searchInput = document.querySelector('.search-input');

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query === '') return;

    const results = mockProducts.filter(p => p.title.toLowerCase().includes(query));

    document.getElementById('homepage-content').style.display = 'none';
    document.querySelector('.hero-wrapper').style.display = 'none';

    const searchSection = document.getElementById('search-results-section');
    const searchGrid = document.getElementById('search-grid');
    const searchTitle = document.getElementById('search-title');
    
    searchSection.style.display = 'block';
    searchGrid.innerHTML = '';
    searchTitle.innerText = `Results for "${searchInput.value}"`;

    if (results.length === 0) {
        searchGrid.innerHTML = `<p>No results found for "${searchInput.value}".</p>`;
    } else {
        results.forEach(product => {
            searchGrid.appendChild(createProductCard(product, true));
        });
    }
}

function clearSearch() {
    searchInput.value = '';
    document.getElementById('search-results-section').style.display = 'none';
    document.getElementById('homepage-content').style.display = 'block';
    document.querySelector('.hero-wrapper').style.display = 'block';
}

// Bind Search Events
document.querySelector('.search-button').addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// --- INITIALIZE ---
window.addEventListener('DOMContentLoaded', () => {
    populateRow('row-1', mockProducts.slice(0, 5));
    populateRow('row-2', mockProducts.slice(2, 7));
    updateCartCount();
});