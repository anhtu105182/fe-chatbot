// src/js/login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        if (validateForm(username, password)) {
            loginUser(username, password);
        } else {
            alert('Please fill in all fields correctly.');
        }
    });
});

function validateForm(username, password) {
    const newLocal = username && password;
    return newLocal;
}

async function loginUser(username, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Log in failed');
        }

        const data = await response.json();
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        // Handle successful login (e.g., redirect to home page)
        window.location.href = '/src/home.html';
    } catch (error) {
        alert(error.message);
    }
}