// JavaScript specific to cart interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart JavaScript loaded');

    // Example: Handle adding items to cart (this would typically be on product pages)
    // For demonstration, let's assume there are 'Add to Cart' buttons with a specific class
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId; // e.g., <button class="add-to-cart-btn" data-product-id="123">Add to Cart</button>
            const productName = this.dataset.productName;
            const productPrice = parseFloat(this.dataset.productPrice);

            if (productId && productName && productPrice) {
                addItemToCart(productId, productName, productPrice, 1);
                showUserMessage(`${productName} added to cart!`, 'success');
            } else {
                console.error('Product data missing for Add to Cart button.');
                showUserMessage('Could not add item to cart. Product data missing.', 'error');
            }
        });
    });

    // Load and display cart items on the cart page
    if (window.location.pathname.endsWith('cart.html')) {
        displayCartItems();
        updateCartTotal();
    }

    // Function to add an item to the cart (uses localStorage)
    function addItemToCart(id, name, price, quantity) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ id, name, price, quantity });
        }
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartDisplay(); // Update mini-cart or cart icon count if you have one
    }

    // Function to display cart items on cart.html
    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const cartItemsContainer = document.getElementById('cart-items-container'); // Ensure this ID exists on cart.html

        if (!cartItemsContainer) {
            // console.log('Cart items container not found on this page.');
            return;
        }

        cartItemsContainer.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item'); // For styling
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>Quantity: <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}"></span>
                <span>Price: $${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Add event listeners for remove buttons and quantity changes
        addCartEventListeners();
    }

    // Function to update cart total on cart.html
    function updateCartTotal() {
        const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const cartTotalContainer = document.getElementById('cart-total'); // Ensure this ID exists on cart.html

        if (!cartTotalContainer) return;

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalContainer.textContent = `$${total.toFixed(2)}`;
    }

    // Add event listeners for dynamic cart elements
    function addCartEventListeners() {
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                removeItemFromCart(itemId);
            });
        });

        document.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', function() {
                const itemId = this.dataset.id;
                const newQuantity = parseInt(this.value);
                updateItemQuantity(itemId, newQuantity);
            });
        });
    }

    // Function to remove an item from the cart
    function removeItemFromCart(id) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        displayCartItems(); // Re-render cart
        updateCartTotal();  // Re-calculate total
        updateCartDisplay();
        showUserMessage('Item removed from cart.', 'info');
    }

    // Function to update item quantity
    function updateItemQuantity(id, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex > -1 && newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else if (newQuantity <= 0) {
            // Optionally remove item if quantity is 0 or less
            cart = cart.filter(item => item.id !== id);
        }
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        displayCartItems();
        updateCartTotal();
        updateCartDisplay();
    }

    // Function to update a mini-cart display (e.g., item count in header)
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const cartIconCount = document.getElementById('cart-icon-count'); // Example ID for a cart count display
        if (cartIconCount) {
            cartIconCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    // Initial call to update mini-cart display on page load
    updateCartDisplay();

});

// Global function to show messages (could be in main.js if preferred)
function showUserMessage(message, type = 'info') {
    const messageContainer = document.getElementById('user-message-container-cart'); // Specific for cart page or general
    if (!messageContainer) { // Fallback to a general one if cart-specific doesn't exist
        const generalContainer = document.getElementById('user-message-container');
        if (generalContainer) {
            generalContainer.textContent = message;
            generalContainer.className = `message ${type}`;
            generalContainer.style.display = 'block';
            setTimeout(() => { generalContainer.style.display = 'none'; }, 3000);
        } else {
            console.log(`User Message (${type}): ${message}`);
        }
        return;
    }
    messageContainer.textContent = message;
    messageContainer.className = `message ${type}`;
    messageContainer.style.display = 'block';
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000); // Hide message after 3 seconds
}
