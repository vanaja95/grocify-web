
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
        },3000)
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

