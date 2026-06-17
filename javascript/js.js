// CONTACT PAGE 
// Wait for the form to be submitted
document.getElementById('contactForm').addEventListener('submit', function(event) {
    
    // Stop the page from refreshing when the button is clicked
    event.preventDefault();

    // Get the values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const feedback = document.getElementById('formFeedback');

    // Validation: Check if any field is empty
    if (name === "" || email === "" || message === "") {
        feedback.style.color = "red"; // Set text color to red for errors
        feedback.textContent = "Please fill in all fields.";
        return; // Stop here if there's an error
    }

    // Validation: Check if the email format is correct
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        feedback.style.color = "red";
        feedback.textContent = "Please enter a valid email address.";
        return;
    }

    // If everything is valid:
    feedback.style.color = "#095f25"; // Set success text color (matches your theme)
    feedback.textContent = "Sending your message...";

    // Simulate an AJAX response delay (the "sending" part)
    setTimeout(function() {
        feedback.textContent = "Thank you, " + name + "! Your Auraaya enquiry has been sent successfully.";
        document.getElementById('contactForm').reset(); // Clear the form after success
    }, 1500);
});







