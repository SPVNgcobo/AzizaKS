// Global cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.total = existingProduct.quantity * existingProduct.price;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, total: price });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
    showModal('modal-add-to-cart');
}

// Function to update the cart UI on the home page
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('cart-icon');
    
    if (cartIcon) {
        cartIcon.textContent = `Cart (${cartCount})`;
    }
}

// Function to update the cart UI on the cart page
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>R${item.price.toFixed(2)}</td>
                    <td>R${item.total.toFixed(2)}</td>
                    <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
                </tr>
            `;
            total += item.total;
        });

        cartTotal.textContent = total.toFixed(2);
    }
    document.getElementById('checkout-button').addEventListener('click', function() {
            // Redirect to the checkout page
  window.location.href = 'Checkoutpage.html';  // Make sure the path is correct		
}
  

// Function to remove items from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
}

// Function to show specifications in a modal
function showSpecs(productId) {
    const specs = {
        'macbook-air': 'MacBook Air 13" Starlight Specs...',
        'asus-x515': 'Asus X515 Specs...',
        'hisense-40a4k': 'Hisense 40-inch Smart TV-40A4K Specs...',
        'samsung-galaxy-s24-ultra': 'SAMSUNG GALAXY S24 ULTRA 256GB 5G Specs...',
        'iphone-15-pro-max': 'iPhone 15 Pro Max 1TB Specs...'
    };

    document.querySelector('#modal-view-specs .modal-content p').textContent = specs[productId] || 'Specifications not available.';
    showModal('modal-view-specs');
}

// Function to show a modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Initialize cart UI and count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    updateCartCount();
});

    // Simulate adding to wishlist
function addToWishlist(productName) {
    alert(`${productName} has been added to your wishlist!`);
    // Here, you can implement functionality to save this item to the user's wishlist.
}

