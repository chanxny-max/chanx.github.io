// Check login state and update navigation
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');

    if (loggedInMenu && loggedOutMenu) {
        if (isLoggedIn) {
            loggedInMenu.style.display = 'block';
            loggedOutMenu.style.display = 'none';
        } else {
            loggedInMenu.style.display = 'none';
            loggedOutMenu.style.display = 'block';
        }
    }
}

// Call this when user logs in (on login page)
function loginUser(username) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    updateNavigation();
    // Redirect to homepage
    window.location.href = 'home.html';
}

// Call this when user logs out
function logoutUser() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username');
    updateNavigation();
    // Redirect to homepage
    window.location.href = 'home.html';
}

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Get current username
function getCurrentUser() {
    return localStorage.getItem('username');
}

// Handle protected links - redirect to login if not logged in
function setupProtectedLinks() {
    const protectedLinks = document.querySelectorAll('.protected-link');
    
    protectedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isUserLoggedIn()) {
                // User is logged in, go to the intended destination
                const destination = this.getAttribute('data-href');
                if (destination) {
                    window.location.href = destination;
                }
            } else {
                // User is not logged in, redirect to login page
                window.location.href = 'login.html';
            }
        });
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    setupProtectedLinks();
});