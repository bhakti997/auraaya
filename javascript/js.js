// CONTACT PAGE
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        
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
        setTimeout(function () {
            feedback.textContent = "Thank you, " + name + "! Your Auraaya enquiry has been sent successfully.";
            contactForm.reset(); // Clear the form after success
        }, 1500);
    });
}

// CART / PRODUCTS / PAYMENT

// ADD TO CART (call this from product buttons)
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push({ name: name, price: parseFloat(price) });
    localStorage.setItem('myCart', JSON.stringify(cart));
    showToast(name, price);
}

// TOAST POPUP 
function showToast(name, price) {
    const toast = document.getElementById("toast");
    const title = document.getElementById("toast-title");
    const priceText = document.getElementById("toast-price");

    if (toast && title && priceText) {
        title.innerText = name + " Added!";
        priceText.innerText = "(R " + price + ")";
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
}

// RENDER CART TABLE (runs on Payment Page only)
function renderCartTable() {
    const tableBody = document.getElementById('cart-table-body');
    const totalDisplay = document.getElementById('total-price');

    if (!tableBody) return; // not on the payment page, skip

    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    tableBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>1</td>
            <td>R ${item.price.toLocaleString()}</td>
            <td>R ${item.price.toLocaleString()}</td>
        </tr>`;
        tableBody.innerHTML += row;
        total += item.price;
    });

    if (totalDisplay) {
        totalDisplay.innerText = total.toFixed(2);
    }
}

// RUN ON PAGE LOAD
document.addEventListener('DOMContentLoaded', renderCartTable);

// CHECKOUT FORM SUBMIT 
const checkoutForm = document.getElementById('checkoutForm');

if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // stop the page from refreshing

        const message = document.getElementById('purchaseMessage');
        message.textContent = "Purchase Successful!";

        // Clear the cart
        localStorage.removeItem('myCart');

        // Refresh the cart table so it shows empty
        renderCartTable();

        // reset the shipping form fields
        checkoutForm.reset();
    });
}

