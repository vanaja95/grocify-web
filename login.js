
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











// Initialize mock database and state
const users = [];
let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || null;
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];




// Show forms based on actions
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
}

function showForgotPassword() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.remove('hidden');
}

// Register user
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (users.find(user => user.email === email)) {
        alert("User already exists. Please login.");
        return;
    }

    users.push({ fullName, email, password });
    alert("Registration successful. You can now log in.");
    showLogin();
});

// Login user
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
       alert("Invalid email or password.");
        return;
    }
    
    loggedInUser = user;
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    alert(`Welcome back, ${user.fullName}!`);
    document.getElementById('login-section').classList.add('hidden');
   
});

// Add to cart function
function addToCart(productId) {
    if (!loggedInUser) {
        document.getElementById('login-section').classList.remove('hidden');
        alert("Please log in to add items to the cart.");
        return;
    }

    const product = document.getElementById(productId);
    if (!product) {
        console.error('Product not found: ' + productId);
        return;
    }

    const title = product.querySelector('h3').innerText;
    const price = product.querySelector('.price').innerText;
    const imgSrc = product.querySelector('img').src;
    const quantity = parseInt(product.querySelector('.cart-quantity').value) || 1;

    const existingproductId = cart.findIndex(item => item.title === title);
    if (existingproductId !== -1) {
        cart[existingproductId].quantity += quantity;
    } else {
        cart.push({ title, price, imgSrc, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert("Item added to cart successfully!");
}

// Add to wishlist function
function addToWishlist(productId) {
    if (!loggedInUser) {
        document.getElementById('login-section').classList.remove('hidden');
        alert("Please log in to add items to the wishlist.");
        return;
    }

    const product = document.getElementById(productId);
    if (!product) {
        console.error('Product not found: ' + productId);
        return;
    }

    const title = product.querySelector('h3').innerText;
    const price = product.querySelector('.price').innerText;
    const imgSrc = product.querySelector('img').src;

    if (!wishlist.some(item => item.title === title)) {
        wishlist.push({ title, price, imgSrc });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        alert("Item added to wishlist successfully!");
    } else {
        alert("This item is already in your wishlist.");
    }
}

// Load wishlist items
function loadWishlist() {
    const wishlistContainer = document.querySelector('.wishlist-items');
    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = wishlist.length === 0 ? '<p>Your wishlist is empty.</p>' : '';

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
                <div class="cart-column tlt">
                    <button class="add-to-cart-button" data-index="${index}">Add to Cart</button>
                </div>
            </div>`;
    });

    attachWishlistEventListeners();
}

// Attach event listeners for wishlist items
function attachWishlistEventListeners() {
    document.querySelectorAll('.wishlist-remove').forEach(button => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            loadWishlist();
        });
    });

    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
            const item = wishlist[index];
            if (item) {
                addToCartFromWishlist(index);
            }
        });
    });
}

// Add to cart from wishlist
function addToCartFromWishlist(index) {
    const item = wishlist[index];
    const existingproductId = cart.findIndex(cartItem => cartItem.title === item.title);
    if (existingproductId !== -1) {
        cart[existingproductId].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    let cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.innerText = cartCount > 0 ? cartCount : ''; // Set to 0 if cart is empty
    } else {
        console.error("Cart count element not found");
    }
    localStorage.setItem('cartCount', cartCount);
  
}


// Retrieve cart and wishlist counts from localStorage
function loadCountsFromStorage() {
    const storedCartCount = localStorage.getItem('cartCount');
    const storedWishlistCount = localStorage.getItem('wishlistCount');
    
    let cartCountElement = document.getElementById('cart-count');
    let wishlistCountElement = document.getElementById('wishlist-count');

    if (cartCountElement) {
        cartCountElement.innerText = storedCartCount && storedCartCount > 0 ? storedCartCount : '';
    }
    
    if (wishlistCountElement) {
        wishlistCountElement.innerText = storedWishlistCount && storedWishlistCount > 0 ? storedWishlistCount : '';
    }
}



// Update wishlist count
function updateWishlistCount() {
    const wishlistCount = wishlist.length;
    document.getElementById('wishlist-count').innerText = wishlistCount;
}

// Load and display cart items
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

// Attach event listeners for cart items
function attachCartEventListeners() {
    document.querySelectorAll('.cart-remove').forEach(button => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        });
    });

    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', function (event) {
            const index = event.target.getAttribute('data-index');
            const newQuantity = parseInt(event.target.value);
            cart[index].quantity = newQuantity > 0 ? newQuantity : 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        });
    });
}

// Update total price
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('₹', '')) * item.quantity, 0);
    document.querySelector('.total-price').innerText = `Grand Total: ₹${total.toFixed(2)}`;
}

// Event listeners for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.box .fa-heart').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productId = button.closest('.box').id;
            addToWishlist(productId);
        });
    });

    document.querySelectorAll('.box .btn').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productId = button.closest('.box').id;
            addToCart(productId);
        });
    });
     loadCountsFromStorage();
    updateWishlistCount();
    loadWishlist();
    updateCartCount();
    loadCart();
   
});










// Function to toggle the login section visibility
document.getElementById('login-button').onclick = function() {
    const loginSection = document.getElementById('login-section');
    const profileIcon = document.getElementById('profile-icon');

    if (loginSection.classList.contains('hidden')) {
        loginSection.classList.remove('hidden');  // Show login section
    } else {
        loginSection.classList.add('hidden');  // Hide login section
        profileIcon.classList.add('hidden');  // Hide profile icon
    }
};

// Function to check login state and update button visibility
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('login-button').classList.add('hidden');
        document.getElementById('logout-button').classList.remove('hidden');
        document.getElementById('profile-icon').classList.remove('hidden');  // Show profile icon
    } else {
        document.getElementById('logout-button').classList.add('hidden');
        document.getElementById('login-button').classList.remove('hidden');
        document.getElementById('profile-icon').classList.add('hidden');  // Hide profile icon
    }
}

// Function to simulate login
function simulateLogin() {
    localStorage.setItem('isLoggedIn', 'true');  // Set login state to true
    checkLoginState();  // Update button visibility after login
    hideLoginForm();  // Hide the login form after login
    //alert('You have logged in successfully!');
}

// Function to handle logout
function handleLogout() {
    localStorage.setItem('isLoggedIn', 'false');  // Set login state to false
    checkLoginState();  // Update button visibility after logout
    alert('You have logged out successfully!');
}

// Function to handle add to cart using sessionStorage
// function addToCart(productId) {
//     if (!isLoggedIn()) {
//         alert('Please login to add items to the cart.');
//         showLoginForm();  // Show login form if not logged in
//         return;  // Prevent adding the item to the cart if not logged in
//     }

//     // Use sessionStorage instead of localStorage
//     let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
//     cart.push(productId);  // Add product index or ID to the cart
//     sessionStorage.setItem('cart', JSON.stringify(cart));  // Save the cart to session storage

//     alert('Item added to cart!');
//     updateCartCount();  // Update the cart count after adding
// }

// // Function to update cart count using sessionStorage
// function updateCartCount() {
//     let cartCountElement = document.getElementById('cart-count');
//     let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

//     if (cart.length > 0) {
//         cartCountElement.innerText = cart.length;  // Show the number of items in the cart
//     } else {
//         cartCountElement.innerText = '';  // Hide cart count if no items
//     }
// }
// // Function to handle add to wishlist
// function addToWishlist(productId) {
//     if (!isLoggedIn()) {
//         alert('Please login to add items to the wishlist.');
//         showLoginForm();  // Show login form if not logged in
//         return;
//     }

//     // Simulate adding an item to the wishlist
//     let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     wishlist.push(productId);  // Add product index or ID to the wishlist
//     // localStorage.setItem('wishlist', JSON.stringify(wishlist));

//     alert('Item added to wishlist!');
// }

// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Function to show the login form
function showLoginForm() {
    const loginSection = document.getElementById('login-section');
    loginSection.classList.remove('hidden');  // Show login form
}

// Function to hide the login form after logging in
function hideLoginForm() {
    const loginSection = document.getElementById('login-section');
    loginSection.classList.add('hidden');  // Hide login form
}

// Function to update the UI (show/hide login, logout, profile icons)
function updateUI() {
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const profileIcon = document.getElementById('profile-icon');

    if (isLoggedIn()) {
        loginButton.classList.add('hidden');  // Hide login button
        logoutButton.classList.remove('hidden');  // Show logout button
        profileIcon.classList.remove('hidden');  // Show profile icon
        hideLoginForm();  // Hide login form if logged in
        updateCartCount();  // Update cart count when logged in
    } else {
        logoutButton.classList.add('hidden');  // Hide logout button
        loginButton.classList.remove('hidden');  // Show login button
        profileIcon.classList.add('hidden');  // Hide profile icon
    }
}

// Attach event listeners to cart and wishlist buttons
document.querySelectorAll('.add-to-cart').forEach((button, productId) => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        addToCart(productId);  // Use the index or unique product ID
    });
});

document.querySelectorAll('.add-to-wishlist').forEach((button, productId) => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        addToWishlist(productId);  // Use the index or unique product ID
    });
});

// Attach event listeners for login and logout buttons
document.getElementById('login-button').addEventListener('click', function (event) {
    event.preventDefault();  // Prevent default button behavior
    showLoginForm();  // Show login form
});

document.getElementById('logout-button').addEventListener('click', function (event) {
    event.preventDefault();  // Prevent default button behavior
    handleLogout();  // Handle logout functionality
});

// Attach event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form submission from reloading the page
    simulateLogin();  // Simulate login process
});

// Initial check for login state on page load
window.onload = updateUI;









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

