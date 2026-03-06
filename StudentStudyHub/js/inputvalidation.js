// Create account
function validateForm(username, email, password) {
    let isValid = true;
    let errors = [];

    // Username: letters and numbers only
    let textPattern = /^[a-zA-Z0-9]+$/;
    if (!textPattern.test(username)) {
        isValid = false;
        errors.push("Username can only contain letters and numbers.");
    }

    // Email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        errors.push("Please enter a valid email address.");
    }

    // Password: at least 8 characters, letters, numbers and special characters
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordPattern.test(password)) {
        isValid = false;
        errors.push("Password must be at least 8 characters long and contain letters, numbers and special characters.");
    }

    return { isValid, errors };
}

// Login user function - calls function from userstate.js
function handleLogin(username) {
    // Set localStorage state for authentication
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    
    // Update navigation if the function exists
    if (typeof updateNavigation === 'function') {
        updateNavigation();
    }
    
    // Redirect to homepage
    console.log(`User ${username} logged in successfully`);
    window.location.href = "home.html";
}

// Login form handler
document.getElementById('lsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    let errors = [];
    
    // Username validation: letters and numbers only
    let textPattern = /^[a-zA-Z0-9]+$/;
    if (!username) {
        errors.push("Username is required.");
    } else if (!textPattern.test(username)) {
        errors.push("Username can only contain letters and numbers.");
    }
    
    // Password validation: at least 8 chars with letters, numbers, special chars
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!password) {
        errors.push("Password is required.");
    } else if (!passwordPattern.test(password)) {
        errors.push("Password must be at least 8 characters long and contain letters, numbers, and special characters.");
    }
    
    // Show errors or proceed with login
    if (errors.length > 0) {
        errors.forEach(error => alert(error));
    } else {
        handleLogin(username);
    }
});