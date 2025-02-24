// // home.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Load user-specific data and display it on the home page
//     loadUserData();

//     // Set up event listeners for any interactive elements
//     setupEventListeners();
// });

// function loadUserData() {
//     // Fetch user data from the API and update the UI accordingly
//     fetch('/api/user/data')
//         .then(response => response.json())
//         .then(data => {
//             // Update the UI with user data
//             document.getElementById('user-name').textContent = data.name;
//             document.getElementById('user-email').textContent = data.email;
//             // Additional UI updates can be done here
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//         });
// }

// function setupEventListeners() {
//     // Example: Set up a button click event
//     document.getElementById('logout-button').addEventListener('click', function() {
//         logoutUser();
//     });
// }

// function logoutUser() {
//     // Call the API to log out the user
//     fetch('/api/auth/logout', {
//         method: 'POST',
//         credentials: 'include'
//     })
//     .then(response => {
//         if (response.ok) {
//             // Redirect to login page after successful logout
//             window.location.href = 'login.html';
//         } else {
//             console.error('Logout failed');
//         }
//     })
//     .catch(error => {
//         console.error('Error during logout:', error);
//     });
// }