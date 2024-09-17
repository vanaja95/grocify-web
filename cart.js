

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
   
    
    document.querySelector('.total-price').innerText = `grand Total:₹${total.toFixed(2)}`;
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
function addToCart(productId) {
    let product = document.getElementById(productId);
    if (!product) {
        console.log('Product not found: ' + productId);
        return;
    }

    let title = product.querySelector('h3').innerText;
    let price = product.querySelector('.price').innerText;
    let quantity = parseInt(product.querySelector('.cart-quantity').value) || 1;
    let imgSrc = product.querySelector('img').src;

    let productObj = { title, price, quantity, imgSrc };

    let existingProductIndex = cart.findIndex(item => item.title === productObj.title);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += productObj.quantity;
    } else {
        cart.push(productObj);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
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
});

// when click the buynow botton it will got order page
document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.buttons');
    
    cartButton.addEventListener('click', () => {
        // Get cart items from the cart container
        const cartItems = document.querySelectorAll('.cart-contant .cart-item');
        const cartData = [];
        
        cartItems.forEach(item => {
            const image = item.querySelector('.cart-column.image img').src;
            const name = item.querySelector('.cart-column.item').textContent;
            const price = item.querySelector('.cart-column.price').textContent;
            const quantity = item.querySelector('.cart-column.quantity input').value;
            const total = item.querySelector('.cart-column.tlt').textContent;
            
            cartData.push({ image, name, price, quantity, total });
        });

        // Save cart data to localStorage
        localStorage.setItem('cartData', JSON.stringify(cartData));

        // Redirect to the order page
        window.location.href = 'orders.html';
    });
});



// order js code

document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.getElementById('order-container');

    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    if (cartData.length === 0) {
        orderContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let orderHTML = `
        <div class="order-header">
            <div class="order-column image">Image</div>
            <div class="order-column item">Product</div>
            <div class="order-column price">Price</div>
            <div class="order-column quantity">Quantity</div>
            <div class="order-column total">Total</div>
        </div>
    `;

    cartData.forEach(item => {
        orderHTML += `
            <div class="order-item">
                <div class="order-column image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="order-column item">${item.name}</div>
                <div class="order-column price">${item.price}</div>
                <div class="order-column quantity">${item.quantity}</div>
                <div class="order-column total">${item.total}</div>
            </div>
        `;
    });

    orderContainer.innerHTML = orderHTML;
});





// //profile  js 

// document.getElementById("profile-form").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the form from submitting the default way

//     // Clear all previous error messages
//     clearErrorMessages();

//     // Get form input values
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const phone = document.getElementById("phone").value.trim();
//     const password = document.getElementById("password").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const location = document.getElementById("location").value.trim();

//     let isValid = true; // Flag to check form validity

//     // Validate Name
//     if (!name) {
//         showError("name-error", "Please enter your name.");
//         isValid = false;
//     }

//     // Validate Email
//     if (!email || !validateEmail(email)) {
//         showError("email-error", "Please enter a valid email address.");
//         isValid = false;
//     }

//     // Validate Phone
//     if (!phone || !validatePhone(phone)) {
//         showError("phone-error", "Please enter a valid phone number.");
//         isValid = false;
//     }

//     // Validate Password
//     if (!password) {
//         showError("password-error", "Please enter a password.");
//         isValid = false;
//     }

//     // Validate Address
//     if (!address) {
//         showError("address-error", "Please enter your address.");
//         isValid = false;
//     }

//     // Validate Location
//     if (!location) {
//         showError("location-error", "Please enter your location.");
//         isValid = false;
//     }

//     // If the form is valid, submit the form or display a success message
//     if (isValid) {
//         // Handle form submission logic here
//         // Example: Submit form via fetch API or display a success message
//         alert("Profile updated successfully!");
//     }

//     // Optionally, you can send the form data to the backend using fetch API
//     // Example:
    
//     fetch("http://localhost:9091/api/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name: name,
//             email: email,
//             phone: phone,
//             password: password,
//             address: address,
//             location: location
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Success:", data);
//         // Handle successful update
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//         // Handle errors
//     });

// });

// // Function to show error messages
// function showError(elementId, message) {
//     document.getElementById(elementId).textContent = message;
// }

// // Function to clear all error messages
// function clearErrorMessages() {
//     const errorElements = document.querySelectorAll(".error-message");
//     errorElements.forEach(element => element.textContent = "");
// }

// // Helper function to validate email
// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }

// // Helper function to validate phone number (basic validation)
// function validatePhone(phone) {
//     const re = /^[0-9]{10}$/; // Validates a 10-digit phone number
//     return re.test(phone);
// }


// order js 












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




