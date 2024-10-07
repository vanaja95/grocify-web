


let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');

// Add click event listener to the menu icon
menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// Optional: Close the menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !navbar.contains(event.target)) {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
});



//searchbar js  
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById("search-box");
    const searchIcon = document.querySelector(".header-1 .search-box-container label");

    const performSearch = () => {
        const searchQuery = searchBox.value.toLowerCase();
        const productBoxes = document.querySelectorAll(".box");
        let isProductFound = false;

        productBoxes.forEach(box => {
            const productName = box.querySelector("h3").textContent.toLowerCase();

            if (productName.includes(searchQuery)) {
                box.style.display = "block"; // Show product
                isProductFound = true;
            } else {
                box.style.display = "none"; // Hide product
            }
        });

        // If no product is found, show an alert
        if (!isProductFound && searchQuery !== '') {
            alert("Product not found");
        }
    };

    // Trigger search when typing in the search box
   // searchBox.addEventListener("input", performSearch);

    // Trigger search when clicking the search icon
    searchIcon.addEventListener("click", () => {
        searchBox.focus(); // Focus on the search box to show text cursor
        performSearch(); // Perform search
    });
});




























// Initialize wishlist and cart
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Function to load and display wishlist items
function loadWishlist() {
    let wishlistContainer = document.querySelector('.wishlist-items');

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
    } else {
        wishlist.forEach((item, index) => {
            wishlistContainer.innerHTML += `
                <div class="wishlist-box">
                    <div class="cart-column remove">
                        <i class="fa fa-trash wishlist-remove" data-index="${index}"></i>
                    </div>
                    <div class="cart-column image">
                        <img src="${item.imgSrc}" alt="${item.title}" class="product-img">
                    </div>
                    <div class="cart-column item">${item.title}</div>
                    <div class="cart-column price">${item.price}</div>
                    <div class="cart-column quantity">
                        <input type="number" value="1" class="wishlist-quantity" data-index="${index}">
                    </div>
                    <div class="cart-column tlt">
                        <button class="add-to-cart-button" data-index="${index}">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }

    attachWishlistEventListeners();
}

// Function to remove item from wishlist
function removeItemFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
}

// Function to add product to wishlist
function addToWishlist(productId) {
    let product = document.getElementById(productId);
    if (!product) {
        console.error('Product not found: ' + productId);
        return;
    }

    let title = product.querySelector('h3').innerText;
    let price = product.querySelector('.price').innerText;
    let imgSrc = product.querySelector('img').src;

    let productObj = { title, price, imgSrc };

    let existingProductIndex = wishlist.findIndex(item => item.title === productObj.title);
    if (existingProductIndex === -1) {
        wishlist.push(productObj);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        showWishlistNotification();
    } else {
        alert("This item is already in your wishlist.");
    }
}

// Function to update wishlist count
function updateWishlistCount() {
    let wishlistCount = wishlist.length;
    let wishlistCountElement = document.getElementById('wishlist-count');

    if (wishlistCountElement) {
        wishlistCountElement.innerText = wishlistCount;
    } else {
        console.error("Wishlist count element not found");
    }
}

// Function to display a notification when an item is added to the wishlist
function showWishlistNotification() {
    var notification = document.getElementById("wishlist-notification");
    if (notification) {
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }
}

// Attach event listeners to wishlist items
function attachWishlistEventListeners() {
    let removeButtons = document.querySelectorAll('.wishlist-remove');
    let addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
            removeItemFromWishlist(index);
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
            addToCartFromWishlist(index);
        });
    });
}

// Function to add item to cart from wishlist
function addToCartFromWishlist(index) {
    let item = wishlist[index];
    if (!item) {
        console.error("Item not found in wishlist.");
        return;
    }

    let quantityInput = document.querySelector(`.wishlist-quantity[data-index="${index}"]`);
    let quantity = parseInt(quantityInput.value) || 1;

    let existingProductIndex = cart.findIndex(cartItem => cartItem.title === item.title);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        item.quantity = quantity;
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    removeItemFromWishlist(index);
}

// Function to update cart count
function updateCartCount() {
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    let cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    } else {
        console.error("Cart count element not found");
    }
}

// Load and display cart items on the cart page
function loadCart() {
    let cartContainer = document.querySelector('.cart-contant');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-box">
                    <div class="cart-remove" data-index="${index}"><i class="fa fa-trash"></i></div>
                    <div><img src="${item.imgSrc}" alt="${item.title}" class="product-img"></div>
                    <div class="cart-product-title">${item.title}</div>
                    <div class="cart-price">${item.price}</div>
                    <div>
                        <input type="number" value="${item.quantity}" class="cart-quantity" data-index="${index}">
                    </div>
                    <div class="cart-total">₹${(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</div>
                </div>
            `;
        });
    }

    updateTotal();
    attachCartEventListeners();
}

// Function to update total price
function updateTotal() {
    let total = cart.reduce((sum, item) => {
        let price = parseFloat(item.price.replace('₹', ''));
        return sum + (price * item.quantity);
    }, 0);

    document.querySelector('.total-price').innerText = `Grand Total: ₹${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeItemFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Function to handle quantity changes in the cart
function quantityChanged(event) {
    const input = event.target;
    const index = input.getAttribute('data-index');
    let newQuantity = parseInt(input.value);

    if (isNaN(newQuantity) || newQuantity <= 0) {
        newQuantity = 1;
        input.value = 1;
    }

    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateTotal();
    updateCartCount();
    updateCartItemPrice(index);
}

function updateCartItemPrice(index) {
    const item = cart[index];
    const itemPrice = parseFloat(item.price.replace('₹', ''));
    const itemTotal = itemPrice * item.quantity;

    const cartItemElement = document.querySelector(`.cart-box:nth-child(${parseInt(index) + 1}) .cart-total`);
    if (cartItemElement) {
        cartItemElement.innerText = `₹${itemTotal.toFixed(2)}`;
    }
}

// Attach event listeners to cart items
function attachCartEventListeners() {
    document.querySelectorAll('.cart-remove').forEach(button => {
        button.addEventListener('click', () => {
            let index = button.getAttribute('data-index');
            removeItemFromCart(index);
        });
    });

    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', quantityChanged);
    });

    document.querySelector('.buy-now-button').addEventListener('click', transferToOrderPage);
}

// Function to transfer items to the order page
function transferToOrderPage() {
    // Transfer items from the cart to the order array
    orders = [...cart];
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Items have been transferred to your orders.');
    window.location.href = 'orders.html'; // Redirect to the order page
}

// Function to load orders on the order page
function loadOrders() {
    let orderContainer = document.querySelector('.order-table tbody');
    if (!orderContainer) return;

    orderContainer.innerHTML = '';

    // If no orders, show a message
    if (orders.length === 0) {
        orderContainer.innerHTML = '<tr><td colspan="4">No orders placed yet.</td></tr>';
        updateSummary(0); // Update the summary with zero values
    } else {
        let subtotal = 0;

        orders.forEach((item) => {
            const itemPrice = parseFloat(item.price.replace('₹', ''));
            const itemTotal = itemPrice * item.quantity;
            subtotal += itemTotal;

            // Add each order to the table
            orderContainer.innerHTML += `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>₹${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });

        updateSummary(subtotal); // Update summary with subtotal
    }
}

// Function to update the order summary with tax, discount, and total
function updateSummary(subtotal) {
    const tax = subtotal * 0.05;
    const discount = parseFloat(document.querySelector('#discount').innerText.replace('₹', '')) || 0;
    const total = subtotal + tax - discount;

    document.querySelector('#subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.querySelector('#tax').innerText = `₹${tax.toFixed(2)}`;
    document.querySelector('#total').innerText = `₹${total.toFixed(2)}`;
}

// Promo code logic
document.getElementById('apply-code').addEventListener('click', () => {
    const promoCode = document.getElementById('promo-code').value;
    const promoFeedback = document.getElementById('promo-feedback');

    // Simple promo code check (you can expand this with an API or complex logic)
    if (promoCode === 'DISCOUNT10') {
        const subtotal = parseFloat(document.querySelector('#subtotal').innerText.replace('₹', ''));
        const discount = subtotal * 0.1; // 10% discount
        document.querySelector('#discount').innerText = `₹${discount.toFixed(2)}`;
        promoFeedback.innerText = 'Promo code applied successfully!';
        promoFeedback.style.color = 'green';
    } else {
        promoFeedback.innerText = 'Invalid promo code.';
        promoFeedback.style.color = 'red';
    }

    const subtotal = parseFloat(document.querySelector('#subtotal').innerText.replace('₹', ''));
    updateSummary(subtotal); // Recalculate total after applying discount
});

// Load initial data when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.box .fa-heart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            let productId = button.closest('.box').id;
            addToWishlist(productId);
        });
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            let productId = button.closest('.box').id;
            addToCart(productId);
        });
    });

    updateWishlistCount();
    loadWishlist();
    updateCartCount();
    loadCart();
    loadOrders();
});







// Add event listener to the "Place Order" button
document.getElementById('placeOrderButton').addEventListener('click', function() {
    // Redirect to the payment page when the button is clicked
    window.location.href = 'payment.html'; // Replace 'payment-page.html' with the actual payment page URL
});





// Update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cartCount; // Update the count in the UI
    }
}

