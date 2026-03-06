function openModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function logout() {
    closeModal();
    if (typeof logoutUser === 'function') {
        logoutUser();
    }
}