function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from the input fields
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiryDate = document.getElementById('expiryDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Validation checks
    if (!fullName) {
        alert('Please enter your full name.');
        return false;
    }
    if (!email) {
        alert('Please enter your email.');
        return false;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!address) {
        alert('Please enter your address.');
        return false;
    }
    if (!city) {
        alert('Please enter your city.');
        return false;
    }
    if (!state) {
        alert('Please enter your state.');
        return false;
    }
    if (!zip) {
        alert('Please enter your zip code.');
        return false;
    }
    if (!validateZip(zip)) {
        alert('Please enter a valid zip code (e.g., 12345 or 123 456).');
        return false;
    }
    if (!cardName) {
        alert('Please enter the name on the card.');
        return false;
    }
    if (!cardNumber) {
        alert('Please enter your card number.');
        return false;
    }
    if (!validateCardNumber(cardNumber)) {
        alert('Please enter a valid card number.');
        return false;
    }
    if (!expiryDate) {
        alert('Please enter the expiry date.');
        return false;
    }
    if (!validateExpiryDate(expiryDate)) {
        alert('Please enter a valid expiry date in MM/YY format.');
        return false;
    }
    if (!cvv) {
        alert('Please enter your CVV.');
        return false;
    }
    if (!validateCVV(cvv)) {
        alert('Please enter a valid CVV (3 or 4 digits).');
        return false;
    }

    alert('Form submitted successfully!'); // Show alert for successful form submission
    // Add your form submission logic here

    return true; // Allow form submission if all validations pass
}

// Helper validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateZip(zip) {
    const re = /^\d{5}$|^\d{3}\s\d{3}$/; // Matches '12345' or '123 456'
    return re.test(zip);
}

function validateCardNumber(cardNumber) {
    const re = /^\d{4}-\d{4}-\d{4}-\d{4}$/; // Matches '1111-2222-3333-4444'
    return re.test(cardNumber);
}

function validateExpiryDate(expiryDate) {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/; // Matches 'MM/YY'
    return re.test(expiryDate);
}

function validateCVV(cvv) {
    const re = /^\d{3,4}$/; // Matches '123' or '1234'
    return re.test(cvv);
}