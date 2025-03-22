document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    // Kiểm tra nếu không có token
    if (!token) {
        alert("Bạn cần đăng nhập để truy cập trang này!");
        window.location.href = "login.html";
        return;
    }

    // Kiểm tra token hết hạn (giả sử token là JWT)
    const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Giải mã payload của JWT
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)

    if (tokenPayload.exp < currentTime) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("token"); // Xóa token hết hạn
        window.location.href = "login.html";
        return;
    }
});
document.getElementById("startChat").addEventListener("click", async function(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Bạn cần đăng nhập trước khi trò chuyện!");
        window.location.href = "login.html";
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