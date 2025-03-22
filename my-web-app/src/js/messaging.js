document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const messagesContainer = document.querySelector(".messages");
    const token = localStorage.getItem("token");
    let chatId = null;

    async function fetchChatList() {
        if (!token) {
            alert("Bạn cần đăng nhập trước khi xem danh sách cuộc trò chuyện!");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/chat/list", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            if (data.chats && data.chats.length > 0) {
                chatId = data.chats[0].chat_id; // Lấy chat_id đầu tiên
                fetchMessages(chatId);
            } else {
                alert("Không có cuộc trò chuyện nào.");
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách cuộc trò chuyện:", error);
        }
    }

    async function fetchMessages(chatId) {
        if (!token) {
            alert("Bạn cần đăng nhập trước khi xem tin nhắn!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/chat/messages/${chatId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            if (data.messages) {
                messagesContainer.innerHTML = ""; // Xóa tin nhắn cũ
                data.messages.forEach(msg => {
                    appendMessage(formatMessage(msg.content), msg.sender_id === 1 ? "bot" : "user");
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tin nhắn:", error);
        }
    }

    async function sendMessage(chatId, message) {
        if (!token) {
            alert("Bạn cần đăng nhập trước khi trò chuyện!");
            return;
        }

        console.log("Thêm hiệu ứng typing...");
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "bot", "typing-indicator");
        typingIndicator.innerHTML = "ChatBot đang trả lời <span></span><span></span><span></span>";
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            console.log("Gửi tin nhắn đến API...");
            const response = await fetch("http://localhost:5000/api/chat/chatgemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chat_id: chatId, message })
            });

            const data = await response.json();

            typingIndicator.remove(); // Xóa hiệu ứng khi có phản hồi
            return formatMessage(data.reply || "Không nhận được phản hồi từ bot.");
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
            typingIndicator.remove(); // Xóa hiệu ứng nếu có lỗi
            return "Lỗi: Không thể kết nối đến máy chủ.";
        }
    }

    function appendMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.innerHTML = text;  // Sử dụng innerHTML để giữ định dạng
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    messageForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!chatId) {
            alert("Không có cuộc trò chuyện nào được chọn!");
            return;
        }

        const message = messageInput.value.trim();
        if (!message) return;

        appendMessage(formatMessage(message), "user");
        messageInput.value = "";

        const responseText = await sendMessage(chatId, message);
        appendMessage(responseText, "bot");
    });

    function formatMessage(text) {
        return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*/g, "<br>-");
    }

    fetchChatList();
});
