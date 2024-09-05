
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





const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToSignInLink = document.getElementById('back-to-sign-in');

// Handle Register button click
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

// Handle Login button click
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Handle Forgot Password link click
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.form-container.sign-in').style.display = 'none';
    document.querySelector('.form-container.sign-up').style.display = 'none';
    document.querySelector('.form-container.forgot-password').style.display = 'block';
});

// Handle Back to Sign In link click
backToSignInLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.form-container.forgot-password').style.display = 'none';
    document.querySelector('.form-container.sign-in').style.display = 'block';
});



//Connect the Sign-Up Form to the Backend



// Handle Sign Up Form Submission
document.getElementById("signUpForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("signUpName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    fetch("http://localhost:9091/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        if (response.ok) {
            alert("Registration successful!");
            window.location.href = "signin.html"; // Redirect to the login page
        } else {
            alert("Registration failed!");
        }
    })
    .catch(error => console.error("Error:", error));
});

// Handle Sign In Form Submission
document.getElementById("signInForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    fetch("http://localhost:9091/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to the home page
        } else {
            alert("Login failed!");
        }
    })
    .catch(error => console.error("Error:", error));
});