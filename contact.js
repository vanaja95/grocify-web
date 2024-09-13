
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const form = event.target;
        const formData = new FormData(form); // Collect form data
        
        // Add debugging statement
        console.log("Form is being submitted...");

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json()).then(result => {
            console.log("Response received:", result); // Debugging: Log the result
            if (result.success) {
                document.getElementById('result').textContent = "Thank you! Your message has been sent successfully.";
                form.reset(); // Reset the form after successful submission
            } else {
                document.getElementById('result').textContent = "Oops! Something went wrong. Please try again.";
            }
        }).catch(error => {
            console.log("Error occurred:", error); // Debugging: Log the error
            document.getElementById('result').textContent = "Oops! There was an error submitting the form.";
        });
    });

