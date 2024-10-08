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
        let cartContent = '';
        let total = 0;

        cart.forEach(item => {
            cartContent += `
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

        cartItemsContainer.innerHTML = cartContent;
        cartTotal.textContent = `Total: R${total.toFixed(2)}`;
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
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

    products.forEach(product => productGrid.appendChild(product)); // Reorder products in the DOM
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

    products.forEach(product => productGrid.appendChild(product)); // Reorder products in the DOM
}

// Handle shipping cost calculations
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsTable = document.getElementById('cart-items-table').getElementsByTagName('tbody')[0];
    const subtotalElement = document.getElementById('subtotal');
    const shippingCostElement = document.getElementById('shipping-cost');
    const totalCostElement = document.getElementById('total-cost');
    const shippingMethodSelect = document.getElementById('shipping-method');

    const cartItems = [
        { name: 'Product Name 1', quantity: 2, price: 50.00 },
    ];

    let subtotal = 0;

    cartItems.forEach(item => {
        const row = cartItemsTable.insertRow();
        row.insertCell().textContent = item.name;
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = `$${item.price.toFixed(2)}`;
        const total = item.quantity * item.price;
        subtotal += total;
        row.insertCell().textContent = `$${total.toFixed(2)}`;
    });

    function calculateTotalCost() {
        let shippingCost = 0;
        switch (shippingMethodSelect.value) {
            case 'standard':
                shippingCost = subtotal < 50 ? 5 : 0;
                break;
            case 'express':
                shippingCost = 15;
                break;
            case 'same-day':
                shippingCost = 25;
                break;
        }
        const totalCost = subtotal + shippingCost;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingCostElement.textContent = `$${shippingCost.toFixed(2)}`;
        totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
    }

    shippingMethodSelect.addEventListener('change', calculateTotalCost);
    calculateTotalCost();
});

// Blog post functionality
const blogPosts = [
    {
        title: "The Future of Gadgets: What to Expect in 2024",
        date: "August 1, 2024",
        content: "As we look forward to the latest in tech, here are some trends to watch out for in the coming year...",
        fullContent: "As we look forward to the latest in tech, here are some trends to watch out for in the coming year. From AI advancements to the next generation of smart devices, the future is looking bright for gadget enthusiasts...",
        comments: []
    },
    {
        title: "Top 10 Must-Have Gadgets for Tech Enthusiasts",
        date: "July 20, 2024",
        content: "Check out our list of the top 10 gadgets that every tech lover should own...",
        fullContent: "Check out our list of the top 10 gadgets that every tech lover should own. These include the latest in wearable tech, smart home devices, and much more. Stay ahead of the curve with these must-have gadgets...",
        comments: []
    },
    {
        title: "How to Choose the Right Laptop for Your Needs",
        date: "July 5, 2024",
        content: "With so many options available, picking the right laptop can be a daunting task. Here are some tips to help you make the right choice...",
        fullContent: "With so many options available, picking the right laptop can be a daunting task. Here are some tips to help you make the right choice based on your needs, whether you're a student, a professional, or a gamer...",
        comments: []
    }
];

// Display blog post summaries
function displayBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    blogContainer.innerHTML = '';
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>${post.date}</small>
            <button onclick="viewBlogPost('${post.title}')">Read More</button>
        `;
        blogContainer.appendChild(postElement);
    });
}

// View full blog post
function viewBlogPost(title) {
    const blogPost = blogPosts.find(post => post.title === title);
    const blogContainer = document.getElementById('blog-post-content');
    
    if (blogPost && blogContainer) {
        blogContainer.innerHTML = `
            <h2>${blogPost.title}</h2>
            <small>${blogPost.date}</small>
            <p>${blogPost.fullContent}</p>
            <h3>Comments:</h3>
            <ul id="comment-list">
                ${blogPost.comments.map(comment => `<li>${comment}</li>`).join('')}
            </ul>
            <input type="text" id="comment-input" placeholder="Add a comment">
            <button onclick="addComment('${blogPost.title}')">Submit Comment</button>
        `;
    }
}

// Add comment to a blog post
function addComment(title) {
    const blogPost = blogPosts.find(post => post.title === title);
    const commentInput = document.getElementById('comment-input');
    
    if (blogPost && commentInput) {
        blogPost.comments.push(commentInput.value);
        viewBlogPost(blogPost.title);
    }
}

// Initialize blog posts on page load
document.addEventListener('DOMContentLoaded', displayBlogPosts);
