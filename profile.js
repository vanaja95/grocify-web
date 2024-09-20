// Select relevant elements
const profileForm = document.querySelector('.profile-form');
const profilePicUpload = document.getElementById('profile-pic-upload');
const profilePicture = document.querySelector('.profile-picture img');

const changePicBtn = document.getElementById('change-pic-btn');

// Show file input when 'Change Picture' button is clicked
changePicBtn.addEventListener('click', () => {
    profilePicUpload.click(); // Trigger the hidden file input click
});

// Handle the image upload and preview
profilePicUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicture.src = e.target.result; // Update the image src with the new file data
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});


// Form validation and submission
profileForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const address = document.getElementById('address').value.trim();
    const location = document.getElementById('location').value.trim();

    // Basic validation
    if (!name || !email || !phone || !password || !address || !location) {
        alert('Please fill in all fields.');
        return;
    }

    // Save changes (simulate with a success message)
    alert('Profile updated successfully!');

    // Here, you can add your code to send form data to the server if needed
});
