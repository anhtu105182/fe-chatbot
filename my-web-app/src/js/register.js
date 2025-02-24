document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = 'student'; // Định nghĩa role cố định

        if (!validateForm(username, password, confirmPassword)) {
            return;
        }

        registerUser(username, password, role);
    });
});

function validateForm(username, password, confirmPassword) {
    if (!username || !password || !confirmPassword) {
        alert('All fields are required!');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    return true;
}

function registerUser(username, password, role) {
    fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Registration successful!');
            window.location.href = 'login.html'; // Chuyển hướng sau khi đăng ký thành công
        } 
        // else {
        //     alert('Registration failed: ' + data.message);
        // }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
