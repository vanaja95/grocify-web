//profile  js 

document.getElementById("profile-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Clear all previous error messages
    clearErrorMessages();

    // Get form input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const address = document.getElementById("address").value.trim();
    const location = document.getElementById("location").value.trim();

    let isValid = true; // Flag to check form validity

    // Validate Name
    if (!name) {
        showError("name-error", "Please enter your name.");
        isValid = false;
    }

    // Validate Email
    if (!email || !validateEmail(email)) {
        showError("email-error", "Please enter a valid email address.");
        isValid = false;
    }

    // Validate Phone
    if (!phone || !validatePhone(phone)) {
        showError("phone-error", "Please enter a valid phone number.");
        isValid = false;
    }

    // Validate Password
    if (!password) {
        showError("password-error", "Please enter a password.");
        isValid = false;
    }

    // Validate Address
    if (!address) {
        showError("address-error", "Please enter your address.");
        isValid = false;
    }

    // Validate Location
    if (!location) {
        showError("location-error", "Please enter your location.");
        isValid = false;
    }

    // If the form is valid, submit the form or display a success message
    if (isValid) {
        // Handle form submission logic here
        // Example: Submit form via fetch API or display a success message
        alert("Profile updated successfully!");
    }

    // Optionally, you can send the form data to the backend using fetch API
    // Example:
    
    fetch("http://localhost:9091/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            password: password,
            address: address,
            location: location
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        // Handle successful update
    })
    .catch((error) => {
        console.error("Error:", error);
        // Handle errors
    });

});

// Function to show error messages
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Function to clear all error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(element => element.textContent = "");
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper function to validate phone number (basic validation)
function validatePhone(phone) {
    const re = /^[0-9]{10}$/; // Validates a 10-digit phone number
    return re.test(phone);
}

