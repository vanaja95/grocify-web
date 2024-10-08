

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



// cart and wishlist js code



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




document.querySelector('.btn').addEventListener('click', function() {
    // Clear wishlist items from the cart array
    wishlist = [];

    // Clear wishlist items from the page
    document.querySelector('.wishlist-content').innerHTML = '<p>Your wishlist is empty.</p>';

    // Clear cart items from local storage
    localStorage.removeItem('wishlist'); // Use the correct key, which is 'wishlist'
   
    // Optionally, show a message to the user that the cart is cleared
    alert('Your wishlist has been cleared!');
});





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
// Function to update cart count
function updateCartCount() {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total number of items in the cart
    let cartCount = cart.reduce((total, item) => {
        let quantity = parseInt(item.quantity) || 0; // Ensure quantity is valid
        return total + quantity;
    }, 0);

    // Update the cart count element
    let cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    } else {
        console.error("Cart count element not found");
    }
}




// Load and display cart items on the cart page
// Load and display cart items on the cart page
function loadCart() {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartContainer = document.querySelector('.cart-contant');
    if (!cartContainer) {
        console.error("Cart container not found");
        return;
    }

    // Clear previous cart content
    cartContainer.innerHTML = '';

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Loop through cart items and render them
        cart.forEach((item, index) => {
            // Validate price, quantity, and imgSrc
            let price = item.price && typeof item.price === 'string' ? item.price : '₹0';
            let quantity = parseInt(item.quantity) || 1; // Default to 1 if invalid
            let imgSrc = item.imgSrc ? item.imgSrc : 'default-image-url.jpg'; // Use a default image if imgSrc is missing

            // Convert price to a number for calculations
            let numericPrice = parseFloat(price.replace('₹', ''));
            if (isNaN(numericPrice)) {
                numericPrice = 0; // Fallback to 0 if price is invalid
            }

            // Render cart item HTML
            cartContainer.innerHTML += `
              <div class="cart-box">
                    <div class="cart-remove" data-index="${index}"><i class="fa fa-trash"></i></div>
                    <div><img src="${imgSrc}" alt="${item.title}" class="product-img"></div>
                    <div class="cart-product-title">${item.title}</div>
                    <div class="cart-price">${price}</div>
                    <div>
                        <input type="number" value="${quantity}" class="cart-quantity" data-index="${index}">
                    </div>
                    <div class="cart-total">₹${(numericPrice * quantity).toFixed(2)}</div>
                </div>
            `;
        });
    }

    updateTotal();
    attachCartEventListeners();
}


// Debugging Step: Load cart and print it to the console
console.log("Cart loaded from localStorage:", JSON.parse(localStorage.getItem('cart')));


// Function to update total price
// Function to update total price
function updateTotal() {
    let total = cart.reduce((sum, item) => {
        // Validate and parse the price
        let price = item.price && typeof item.price === 'string' ? item.price : '₹0';
        let numericPrice = parseFloat(price.replace('₹', ''));

        if (isNaN(numericPrice)) {
            numericPrice = 0; // Fallback to 0 if price is invalid
        }

        return sum + (numericPrice * item.quantity);
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
    document.querySelector('.buy-now-button').addEventListener('click', transferToOrderPage);
}
// Function to transfer items to the order page
function transferToOrderPage() {
    // Transfer items from the cart to the order array
    orders = [...cart];
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    alert('Items have been transferred to your orders.');
    window.location.href = 'orders.html'; // Redirect to the order page
}

// Function to load orders on the order page
function loadOrders() {
    let orderContainer = document.querySelector('.order-table tbody');
    if (!orderContainer) return;

    orderContainer.innerHTML = '';

    if (orders.length === 0) {
        orderContainer.innerHTML = '<tr><td colspan="4">No orders placed yet.</td></tr>';
    } else {
        let subtotal = 0;
        orders.forEach((item) => {
            const itemPrice = parseFloat(item.price.replace('₹', ''));
            const itemTotal = itemPrice * item.quantity;
            subtotal += itemTotal;

            orderContainer.innerHTML += `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price}</td>
                    <td>₹${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });

        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        document.querySelector('.order-summary-item:nth-child(1) span:nth-child(2)').innerText = `₹${subtotal.toFixed(2)}`;
        document.querySelector('.order-summary-item:nth-child(2) span:nth-child(2)').innerText = `₹${tax.toFixed(2)}`;
        document.querySelector('.order-summary-item:nth-child(3) span:nth-child(2)').innerText = `₹${total.toFixed(2)}`;
    }
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

document.querySelector('.btn').addEventListener('click', function() {
    // Clear cart items from the cart array
    cart = [];

    // Clear cart items from the page
    document.querySelector('.cart-contant').innerHTML = '<p>Your cart is empty.</p>';

    // Clear cart items from local storage
    localStorage.removeItem('cart'); // Use the correct key, which is 'cart'

    // Reset the total, GST, and grand total prices
    document.querySelector('.total-price').textContent = '₹0';
   
    // Optionally, show a message to the user that the cart is cleared
    alert('Your cart has been cleared!');
});
// Add to cart from product page
// Function to add an item to the cart
function addToCart(productId) {
    let product = document.getElementById(productId);
    if (!product) {
        console.error('Product not found: ' + productId);
        return;
    }

    // Retrieve item details
    let title = product.querySelector('h3').innerText;
    let price = product.querySelector('.price').innerText;
    let imgSrc = product.querySelector('img') ? product.querySelector('img').src : ''; // Ensure imgSrc is not undefined
    let quantityInput = product.querySelector('.cart-quantity');
    let quantity = parseInt(quantityInput?.value) || 1; // Default to 1 if no quantity input found

    // Validate the quantity value
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 1; // Default to 1 if invalid
    }

    let productObj = { title, price, imgSrc, quantity };

    // Load the existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    let existingProductIndex = cart.findIndex(item => item.title === productObj.title);
    if (existingProductIndex !== -1) {
        // If it exists, update the quantity
        cart[existingProductIndex].quantity += productObj.quantity;
    } else {
        // If it doesn't exist, add it to the cart
        cart.push(productObj);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Debug: Check if the cart is being saved correctly
    console.log('Cart after adding product:', JSON.parse(localStorage.getItem('cart')));

    // Update cart count and show notification
    updateCartCount();
    showNotification();
}




// Event listeners for "Add to Wishlist" and "Add to Cart" buttons
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





// login section js code
document.addEventListener('DOMContentLoaded', function() {
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'false';  // Simulating login state, initially false

    // Get elements for login section and cart/wishlist buttons
    const loginSection = document.getElementById('login-section');
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    // Function to show the login form
    function showLoginForm() {
        loginSection.classList.remove('hidden');  // Show login section
        window.scrollTo(0, 0);  // Scroll to the top of the page to focus on the login
    }

    // Function to hide the login form after login
    function hideLoginForm() {
        loginSection.classList.add('hidden');  // Hide login section
        isLoggedIn = true;  // Simulate that the user is logged in
    }

    // Function to toggle between login and register form
    function showLogin() {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.add('hidden');
        document.getElementById('formTitle').innerText = 'Login';
    }

    function showRegister() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('forgotPasswordForm').classList.add('hidden');
        document.getElementById('formTitle').innerText = 'Register';
    }

    function showForgotPassword() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.remove('hidden');
        document.getElementById('formTitle').innerText = 'Forgot Password';
    }

    function setupCartButtons() {
        cartButtons.forEach(button => {
            // Ensure this function is added only once
            button.removeEventListener('click', handleAddToCart); // Remove any previous listeners
            button.addEventListener('click', handleAddToCart);
        });
    }

    // Attach click events to Add to Cart buttons
    cartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            let productId = button.closest('.box').id;
            if (!isLoggedIn) {
                showLoginForm();  // Show login form if not logged in
            } else {
                addToCart(productId);  // Call the existing addToCart function
                alert('Item added to cart');
            }
        });
    });

    // Attach click events to Wishlist buttons
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            let productId = button.closest('.box').id;
            if (!isLoggedIn) {
                showLoginForm();  // Show login form if not logged in
            } else {
                addToWishlist(productId);  // Call the existing addToWishlist function
                
            }
        });
    });

    // Handle login form submission (simulated)
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        hideLoginForm();  // Simulate successful login
        alert('Login successful! Now you can add items to the cart and wishlist.');
    });

    // Handle registration form submission (simulated)
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Registration successful! Please login now.');
        showLogin();  // Show login form after successful registration
    });

    // Handle forgot password form submission (simulated)
    document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Password reset link sent to your email!');
        showLogin();  // Show login form after successful password reset
    });

    // Expose the showRegister and showLogin functions globally to the onclick handlers in HTML
    window.showRegister = showRegister;
    window.showLogin = showLogin;
    window.showForgotPassword = showForgotPassword;

    if (isLoggedIn) {
        loginSection.classList.add('hidden');
    }
    setupCartButtons();
});





































// // account js code signin and signup


// const container = document.getElementById('container');
// const registerBtn = document.getElementById('register');
// const loginBtn = document.getElementById('login');
// const forgotPasswordLink = document.getElementById('forgot-password-link');
// const backToSignInLink = document.getElementById('back-to-sign-in');

// // Handle Register button click
// registerBtn.addEventListener('click', () => {
//     container.classList.add("active");
// });

// // Handle Login button click
// loginBtn.addEventListener('click', () => {
//     container.classList.remove("active");
// });

// // Handle Forgot Password link click
// forgotPasswordLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.querySelector('.form-container.sign-in').style.display = 'none';
//     document.querySelector('.form-container.sign-up').style.display = 'none';
//     document.querySelector('.form-container.forgot-password').style.display = 'block';
// });

// // Handle Back to Sign In link click
// backToSignInLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.querySelector('.form-container.forgot-password').style.display = 'none';
//     document.querySelector('.form-container.sign-in').style.display = 'block';
// });


// // Select the scroll up icon element
// const scrollUpIcon = document.getElementById('scrollup-icon');

// // Function to show or hide the scroll up icon
// window.onscroll = function() {
//   if (window.scrollY > 300) { // Show icon after scrolling down 300px
//     scrollUpIcon.classList.add('show');
//   } else {
//     scrollUpIcon.classList.remove('show');
//   }
// };

// // Function to scroll to the top when the icon is clicked
// scrollUpIcon.addEventListener('click', function(e) {
//   e.preventDefault(); // Prevent default anchor behavior
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth' // Smooth scroll to the top
//   });
// });





//contact section javascript start


// document.getElementById('contact-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission
    
//     const form = event.target;
//     const formData = new FormData(form); // Collect form data
    
//     // Add debugging statement
//     console.log("Form is being submitted...");

//     fetch(form.action, {
//         method: form.method,
//         body: formData,
//         headers: {
//             'Accept': 'application/json'
//         }
//     }).then(response => response.json()).then(result => {
//         console.log("Response received:", result); // Debugging: Log the result
//         if (result.success) {
//             document.getElementById('result').textContent = "Thank you! Your message has been sent successfully.";
//             form.reset(); // Reset the form after successful submission
//         } else {
//             document.getElementById('result').textContent = "Oops! Something went wrong. Please try again.";
//         }
//     }).catch(error => {
//         console.log("Error occurred:", error); // Debugging: Log the error
//         document.getElementById('result').textContent = "Oops! There was an error submitting the form.";
//     });
// });






// footer subscrib js code


const scriptURL = 'https://script.google.com/macros/s/AKfycbz3GFwtttBmYhevhNFAc4lqoWvBcsOH0wf7l5zaPp8mtYxvK4ie7ZvalleEgD1yL7_t/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response =>{
        msg.innerHTML = "Thank You For Subscribing!"
        setTimeout(function(){
                msg.innerHTML = ""
        },5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

//email id link

document.getElementById("emailLink").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default mailto action for now

    // Perform any additional actions here (e.g., tracking, form validation, etc.)
    console.log("Email link clicked!");

    // After the additional actions, trigger the mailto link
    window.location.href = "mailto:info@example.com";
});
 

// location link

document.getElementById("locationLink").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default action for now

    // Perform any additional actions here (e.g., logging, analytics, etc.)
    console.log("Location link clicked!");

    // After additional actions, open the Google Maps location
    window.open("https://www.google.com/maps/place/Bangalore,+Karnataka,+India", "_blank");
});



//payment section

