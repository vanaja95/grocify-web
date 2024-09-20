// Initialize wishlist and cart
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

    // Get the quantity from the wishlist item
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

    // Find the corresponding cart item element and update its price
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
}

// Function to show notification after adding to cart
function showNotification() {
    alert("Your product has been added to the cart!");

    var notification = document.getElementById("cart-notification");
    if (notification) {
        notification.className = "notification show";

        setTimeout(() => {
            notification.className = notification.className.replace("show", "");
        }, 3000);
    }
}

// Function to handle "Buy Now" button click
function buyNow() {
    // Save the current cart items to local storage under the key 'orderItems'
    localStorage.setItem('orderItems', JSON.stringify(cart));
    
    // Clear the cart and update local storage
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Optionally navigate to the order page
    window.location.href = 'orders.html'; // Adjust the path as necessary
}

// Attach the buy now button event listener
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.box .fa-cart-plus').forEach(button => {
        button.addEventListener('click', () => {
            let productId = button.getAttribute('data-product-id');
            addToCart(productId);
        });
    });

    document.querySelectorAll('.buy-now-button').forEach(button => {
        button.addEventListener('click', buyNow);
    });

    // Load wishlist and cart on page load
    loadWishlist();
    loadCart();
});






// Function to load and display order items
function loadOrder() {
    let orderContainer = document.querySelector('.order-items');
    if (!orderContainer) return;

    let orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    if (orderItems.length === 0) {
        orderContainer.innerHTML = '<p>Your order is empty.</p>';
    } else {
        orderContainer.innerHTML = '';

        orderItems.forEach((item, index) => {
            orderContainer.innerHTML += `
                <div class="order-box">
                    <div class="order-column image">
                        <img src="${item.imgSrc}" alt="${item.title}" class="product-img">
                    </div>
                    <div class="order-column item">${item.title}</div>
                    <div class="order-column price">${item.price}</div>
                    <div class="order-column quantity">${item.quantity}</div>
                    <div class="order-column total">₹${(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</div>
                </div>
            `;
        });

        updateOrderTotal(orderItems);
    }
}

// Function to update the total price
function updateOrderTotal(items) {
    let total = items.reduce((sum, item) => {
        let price = parseFloat(item.price.replace('₹', ''));
        return sum + (price * item.quantity);
    }, 0);

    document.querySelector('.order-total').innerText = `Total: ₹${total.toFixed(2)}`;
}

// Function to finalize the order
function finalizeOrder() {
    // Implement your order finalization logic here

    // Clear the order items from local storage
    localStorage.removeItem('orderItems');

    // Show a confirmation message or redirect the user
    alert('Thank you for your order!');
    window.location.href = 'index.html'; // Redirect to the home page or another page
}

// Attach event listener to the finalize order button
document.addEventListener('DOMContentLoaded', () => {
    loadOrder();

    let finalizeButton = document.querySelector('.finalize-order-button');
    if (finalizeButton) {
        finalizeButton.addEventListener('click', finalizeOrder);
    }
});
