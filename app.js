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

 document.addEventListener('DOMContentLoaded', () => {
            const cartItemsTable = document.getElementById('cart-items-table').getElementsByTagName('tbody')[0];
            const subtotalElement = document.getElementById('subtotal');
            const shippingCostElement = document.getElementById('shipping-cost');
            const totalCostElement = document.getElementById('total-cost');
            const shippingMethodSelect = document.getElementById('shipping-method');

            // Dummy cart data for demonstration
            const cartItems = [
                { name: 'Product Name 1', quantity: 2, price: 50.00 },
                // Add more items as needed
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

            // Handle shipping method change
            shippingMethodSelect.addEventListener('change', calculateTotalCost);

            // Calculate total cost on page load
            calculateTotalCost();
        });

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
                fullContent: "With so many options available, picking the right laptop can be a daunting task. Here are some tips to help you make the right choice based on your needs, whether you're a gamer, a professional, or just need a basic machine for daily use...",
                comments: []
            }
        ];

        // Function to display blog posts
        function displayBlogPosts() {
            const blogPostsContainer = document.getElementById('blog-posts');
            blogPostsContainer.innerHTML = '';

            blogPosts.forEach((post, index) => {
                blogPostsContainer.innerHTML += `
                    <article class="blog-post">
                        <h2>${post.title}</h2>
                        <p><em>${post.date}</em></p>
                        <p>${post.content}</p>
                        <button onclick="readMore(${index})" class="read-more-button">Read More</button>
                    </article>
                `;
            });
        }

        // Function to display full blog post with comments
        function readMore(index) {
            const post = blogPosts[index];
            const blogPostsContainer = document.getElementById('blog-posts');
            blogPostsContainer.innerHTML = `
                <article class="full-blog-post">
                    <h2>${post.title}</h2>
                    <p><em>${post.date}</em></p>
                    <p>${post.fullContent}</p>

                    <section id="comments-section-${index}" class="comments-section">
                        <h3>Comments</h3>
                        <div id="comments-${index}">
                            <!-- Comments will be dynamically inserted here -->
                        </div>

                        <textarea id="comment-input-${index}" placeholder="Add a comment..."></textarea>
                        <button onclick="addComment(${index})">Submit</button>
                    </section>

                    <button onclick="displayBlogPosts()" class="back-button">Back to Blog</button>
                </article>
            `;

            displayComments(index);
        }

        // Function to display comments
        function displayComments(index) {
            const commentsContainer = document.getElementById(`comments-${index}`);
            const comments = blogPosts[index].comments;
            commentsContainer.innerHTML = '';

            comments.forEach((comment, commentIndex) => {
                commentsContainer.innerHTML += `
                    <div class="comment">
                        <p>${comment.text}</p>
                        <button onclick="editComment(${index}, ${commentIndex})">Edit</button>
                    </div>
                `;
            });
        }

        // Function to add a comment
        function addComment(index) {
            const commentInput = document.getElementById(`comment-input-${index}`);
            const commentText = commentInput.value;

            if (commentText) {
                blogPosts[index].comments.push({ text: commentText });
                commentInput.value = ''; // Clear input after adding
                displayComments(index); // Refresh comments section
            }
        }

        // Function to edit a comment
        function editComment(postIndex, commentIndex) {
            const newCommentText = prompt("Edit your comment:", blogPosts[postIndex].comments[commentIndex].text);

            if (newCommentText !== null && newCommentText.trim() !== '') {
                blogPosts[postIndex].comments[commentIndex].text = newCommentText;
                displayComments(postIndex); // Refresh comments section
            }
        }

        // Initialize blog page
        displayBlogPosts();
