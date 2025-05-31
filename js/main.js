document.addEventListener('DOMContentLoaded', function() {
    console.log('Main JavaScript loaded.');

    // --- Login Form Validation ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');

            if (!emailInput.value.trim() || !passwordInput.value.trim()) {
                alert('Please fill in all fields for login.');
                return;
            }
            // Basic validation passed
            alert('Login form submitted (mock behavior)!');
            // window.location.href = 'index.html'; // Optional redirect
        });
    }

    // --- Registration Form Validation ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const usernameInput = document.getElementById('register-username');
            const emailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');
            const confirmPasswordInput = document.getElementById('register-confirm-password');

            if (!usernameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim() || !confirmPasswordInput.value.trim()) {
                alert('Please fill in all fields for registration.');
                return;
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                alert('Passwords do not match.');
                return;
            }
            // Basic validation passed
            alert('Registration form submitted (mock behavior)!');
            // window.location.href = 'login.html'; // Optional redirect
        });
    }

    // --- Header Search Form Placeholder ---
    // Note: The subtask description mentions `search-form-header` and `search-input-header`
    // The HTML files were updated in previous steps to use these IDs in the header.
    const headerSearchForm = document.getElementById('search-form-header');
    if (headerSearchForm) {
        headerSearchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = document.getElementById('search-input-header');
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert("Search for '" + searchTerm + "' submitted (functionality not yet implemented).");
                // In a future step, this might redirect:
                // window.location.href = `search-results.html?query=${encodeURIComponent(searchTerm)}`;
            } else {
                alert("Please enter a search term.");
            }
        });
    }

    // Example of keeping the smooth scroll from the original file if desired,
    // or it can be removed if not part of this specific subtask's scope.
    // For now, focusing on the subtask's direct requirements.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            try {
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.warn('Smooth scroll target not found:', this.getAttribute('href'));
                }
            } catch (error) {
                console.error('Error during smooth scroll:', error);
            }
        });
    });

});

// The global showUserMessage function can be kept if it's intended for broader use,
// or removed if alerts are sufficient for this subtask.
// For now, keeping it as it doesn't conflict.
function showUserMessage(message, type = 'info') { // type can be 'info', 'success', 'error'
    // A more robust implementation would create/use a dedicated message element in the DOM
    // rather than relying on a pre-existing one which might not be on all pages.
    // For this exercise, console.log and alerts are the primary feedback.
    console.log(`User Message (${type}): ${message}`);
    // Example: alert(`${type.toUpperCase()}: ${message}`);
}
