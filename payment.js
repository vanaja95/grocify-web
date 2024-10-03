
    document.querySelector("form").addEventListener("submit", function (e) {
        // Prevent form submission
        e.preventDefault();

        // Get form values
        const fullName = document.querySelector('input[placeholder="enter your name"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const address = document.querySelector('input[placeholder="street - locality"]').value;
        const city = document.querySelector('input[placeholder="Bangalore"]').value;
        const state = document.querySelector('input[placeholder="Karnataka"]').value;
        const zipCode = document.querySelector('input[placeholder="123 456"]').value;
        const cardName = document.querySelector('input[placeholder="card name"]').value;
        const cardNumber = document.querySelector('input[placeholder="1111-2222-3333-4444"]').value;
        const expiryDate = document.querySelector('#expiryDate').value;
        const cvv = document.querySelector('input[placeholder="1234"]').value;

        // Regular expressions for validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        const cvvPattern = /^\d{3,4}$/;
        const zipCodePattern = /^\d{3}\s?\d{3}$/;
        const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;  // Matches MM/YY format

        // Form validation logic
        if (fullName === "" || email === "" || address === "" || city === "" || state === "" || zipCode === "" || cardName === "" || cardNumber === "" || expiryDate === "" || cvv === "") {
            alert("Please fill in all the fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!cardNumberPattern.test(cardNumber)) {
            alert("Please enter a valid card number in the format: 1111-2222-3333-4444.");
            return;
        }

        if (!expiryPattern.test(expiryDate)) {
            alert("Please enter a valid expiry date in MM/YY format.");
            return;
        }

        if (!cvvPattern.test(cvv)) {
            alert("Please enter a valid 3 or 4 digit CVV.");
            return;
        }

        if (!zipCodePattern.test(zipCode)) {
            alert("Please enter a valid zip code in the format: 123 456.");
            return;
        }

        // If validation passes, proceed with form submission
        alert("Form submitted successfully!");
        this.submit(); // You can proceed with form submission here if needed
    });

