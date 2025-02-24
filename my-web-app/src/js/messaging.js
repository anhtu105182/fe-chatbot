// This file contains JavaScript for the messaging page, including functionality for sending and receiving messages.

document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messagesContainer');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        sendMessage(messageInput.value);
        messageInput.value = '';
    });

    function sendMessage(message) {
        // Here you would typically send the message to the server via an API call
        // For demonstration, we will just append it to the messages container
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        
        // Simulate receiving a response
        receiveMessage(`Echo: ${message}`);
    }

    function receiveMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
    }
});