document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const messagesContainer = document.querySelector(".messages");

    async function sendMessage(message) {
        try {
            const response = await fetch("http://localhost:5000/api/chat/chatgemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            const rawText = data.reply.parts[0].text;
            return formatMessage(rawText);
        } catch (error) {
            console.error("Error sending message:", error);
            return "Error: Unable to fetch response";
        }
    }

    function formatMessage(text) {
        return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*/g, "<br>-");
    }

    function appendMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.innerHTML = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    messageForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = messageInput.value.trim();
        if (!message) return;

        appendMessage(message, "user");
        messageInput.value = "";

        const responseText = await sendMessage(message);
        appendMessage(responseText, "bot");
    });
});
