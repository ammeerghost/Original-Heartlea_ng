document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages
        clearErrors();

        // Validate the form
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate name
        if (name === '') {
            isValid = false;
            showError('nameError', 'Name is required.');
        }
            // Validate email
            if (email === '') {
                isValid = false;
                showError('emailError', 'Email is required.');
            } else if (!validateEmail(email)) {
                isValid = false;
                showError('emailError', 'Please enter a valid email address.');
            }
    
            // Validate message
            if (message === '') {
                isValid = false;
                showError('messageError', 'Message cannot be empty.');
            }
    
            if (isValid) {
                document.getElementById('response').innerText = 'Thank you for your message!';
                contactForm.reset(); // Reset the form after submission
            }
        });
        function showError(id, message) {
            const errorElement = document.getElementById(id);
            errorElement.innerText = message;
            errorElement.style.display = 'block'; // Show error message
        }
    
        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.innerText = '';
                error.style.display = 'none'; // Hide error message
            });
        }
    
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
            return re.test(email);
        }
    });