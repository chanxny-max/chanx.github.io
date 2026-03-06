window.addEventListener("DOMContentLoaded", function() {
    const pfp = localStorage.getItem("profileImage");
    const username = localStorage.getItem("accountUsername");
    const email = localStorage.getItem("accountEmail");
    const bio = localStorage.getItem("bio");
    const about = localStorage.getItem("about");

    if (pfp && document.getElementById("profileImage")) {
        document.getElementById("profileImage").src = pfp;
    }

    if (username && document.getElementById("displayUsername")) {
        document.getElementById("displayUsername").textContent = username;
    }

    if (email && document.getElementById("displayEmail")) {
        document.getElementById("displayEmail").textContent = email;
    }

    if (bio && document.getElementById("displayBio")) {
        document.getElementById("displayBio").textContent = bio;
    }

    if (about && document.getElementById("displayAbout")) {
        document.getElementById("displayAbout").textContent = about;
    }
});