// Toggle between forms
function showLogin() {
    document.getElementById('formTitle').innerText = 'Login';
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
}

function showRegister() {
    document.getElementById('formTitle').innerText = 'Register';
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
}

function showForgotPassword() {
    document.getElementById('formTitle').innerText = 'Forgot Password';
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.remove('hidden');
}

// Simulating a user login state (true if logged in, false otherwise)
let isLoggedIn = false;

// Get elements for login section and cart/wishlist buttons
const loginSection = document.getElementById('login-section');
const cartButtons = document.querySelectorAll('.add-to-cart-btn');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

// Function to show the login form
function showLoginForm() {
    loginSection.classList.remove('hidden');  // Show login section
    window.scrollTo(0, 0);  // Scroll to the top of the page
}

// Function to hide the login form after login
function hideLoginForm() {
    loginSection.classList.add('hidden');  // Hide login section
    isLoggedIn = true;  // After login, set logged in state to true
}

// Attach click events to Add to Cart buttons
cartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isLoggedIn) {
            showLoginForm();  // Show login form if not logged in
        } else {
            // Add to cart logic here if logged in
            alert('Item added to cart');
        }
    });
});

// Attach click events to Wishlist buttons
wishlistButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isLoggedIn) {
            showLoginForm();  // Show login form if not logged in
        } else {
            // Add to wishlist logic here if logged in
            alert('Item added to wishlist');
        }
    });
});

// Handle login form submission (simulated)
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    hideLoginForm();  // Simulate successful login
    alert('Login successful! Now you can add items to the cart and wishlist.');
});
