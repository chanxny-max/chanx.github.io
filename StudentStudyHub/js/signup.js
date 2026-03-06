// Modal and TOS elements
const modal = document.getElementById('termsModal');
const link = document.getElementById('tosLink');
const termsBox = document.querySelector('.terms-text');
const tosRadio = document.getElementById('tos');
const signupBtn = document.getElementById('signupButton');

// Track if user has scrolled to bottom
let hasScrolledToBottom = false;

// Open modal when clicking TOS link
link.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
});

function closeTerms() {
    modal.style.display = 'none';
    // Only check the radio button if user has scrolled to bottom
    if (hasScrolledToBottom) {
        tosRadio.checked = true;
        tosRadio.setCustomValidity(""); // Clear any previous validation error
    }
}

// Makes closeTerms globally
window.closeTerms = closeTerms;

// Enable the radio when user scrolls to bottom
termsBox.addEventListener('scroll', function() {
    const atBottom = 
        termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 5;
    
    if (atBottom) {
        hasScrolledToBottom = true;
        tosRadio.disabled = false;
    }
});

// Validation function
function validateForm() {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Reset custom validity
    username.setCustomValidity("");
    email.setCustomValidity("");
    password.setCustomValidity("");

    // Username: letters and numbers only
    let textPattern = /^[a-zA-Z0-9]+$/;
    if (!username.value.trim()) {
        username.setCustomValidity("Username is required.");
        return username;
    } else if (!textPattern.test(username.value.trim())) {
        username.setCustomValidity("Username can only contain letters and numbers.");
        return username;
    }

    // Email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        email.setCustomValidity("Email is required.");
        return email;
    } else if (!emailPattern.test(email.value.trim())) {
        email.setCustomValidity("Please enter a valid email address.");
        return email;
    }

    // Password validation
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!password.value.trim()) {
        password.setCustomValidity("Password is required.");
        return password;
    } else if (!passwordPattern.test(password.value.trim())) {
        password.setCustomValidity("Password must be at least 8 characters long and contain letters, numbers, and special characters.");
        return password;
    }

    // Check TOS agreement
    if (!hasScrolledToBottom || !tosRadio.checked) {
        return "tos"; // Return a special string to handle TOS separately
    }

    return null; // No errors
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const invalidField = validateForm();
    
    if (invalidField === "tos") {
        // Open the modal instead of trying to show validation on disabled radio
        alert("You must read and agree to the Terms of Service before signing up.");
        modal.style.display = 'flex';
    } else if (invalidField) {
        invalidField.reportValidity();
    } else {
        // Get the username and call loginUser from userstate.js
        const username = document.getElementById("username").value.trim();
        loginUser(username);
    }
}

// Attach to forms
const form1 = document.getElementById("lsForm");
if (form1) {
    form1.addEventListener("submit", handleFormSubmit);
}