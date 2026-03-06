document.getElementById("resetpwForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Let validation run first

    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Correct formatting

    if (emailPattern.test(email)) {
        message.style.display = "block";
        message.textContent = "If this email exists, a password reset link has been sent. Please check your inbox or junk mail.";
    } else {
        message.style.display = "block";
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
    }
});