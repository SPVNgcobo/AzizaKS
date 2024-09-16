// Global cart array, load from localStorage or initialize
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add items to the cart
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.total = existingProduct.quantity * existingProduct.price;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, total: price });
    }

    saveCart(); // Save cart to localStorage
    updateCartUI(); // Update cart items on the cart page (if applicable)
    updateCartCount(); // Update the cart count in the header
    showModal('modal-add-to-cart'); // Show add-to-cart modal
}

// Function to update the cart count (displayed in the header)
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
    
    if (cartItemsContainer && cartTotal) {
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

        cartTotal.textContent = `Total: R${total.toFixed(2)}`;
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'Checkoutpage.html'; // Redirect to the checkout page
        });
    }
}

// Function to remove items from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
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

    const specContent = specs[productId] || 'Specifications not available.';
    const specModalContent = document.querySelector('#modal-view-specs .modal-content p');
    
    if (specModalContent) {
        specModalContent.textContent = specContent;
        showModal('modal-view-specs');
    }
}

// Function to show a modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Initialize cart UI and count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI(); // Populate cart page with items
    updateCartCount(); // Update the cart count on every page
});

// Function to simulate adding to wishlist
function addToWishlist(productName) {
    alert(`${productName} has been added to your wishlist!`);
    // Implement further logic for saving to the wishlist, if needed.
}

// Function to sort products by price
function sortProductsByPrice() {
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.getElementsByClassName('product'));

    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        return priceA - priceB;
    });

    // Reorder products in the DOM
    products.forEach(product => productGrid.appendChild(product));
}

// Function to sort products alphabetically (A to Z)
function sortProductsByName() {
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.getElementsByClassName('product'));

    products.sort((a, b) => {
        const nameA = a.getAttribute('data-name').toUpperCase();
        const nameB = b.getAttribute('data-name').toUpperCase();
        return nameA.localeCompare(nameB);
    });

    // Reorder products in the DOM
    products.forEach(product => productGrid.appendChild(product));
}
