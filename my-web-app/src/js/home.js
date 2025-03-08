document.getElementById("startChat").addEventListener("click", async function(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Bạn cần đăng nhập trước khi trò chuyện!");
        return;
    }
    try {
        const response = await fetch("http://localhost:5000/api/chat/create-chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ dept_id: 1 })
        });
        const data = await response.json();
        if (data.message === "Đã có cuộc trò chuyện") {
            // window.location.href = `message.html?chat_id=${data.chat_id}`;
            window.location.href = "messaging.html";
        } else {
            alert("Cuộc trò chuyện mới đã được tạo!");
            window.location.href = "messaging.html";
        }
    } catch (error) {
        console.error("Lỗi khi kết nối API:", error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
});