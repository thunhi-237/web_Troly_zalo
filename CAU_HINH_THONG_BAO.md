# ⚡ CẤU HÌNH THÔNG BÁO NHANH

## 📌 TỔNG QUAN

Khi có người đăng ký, hệ thống tự động gửi thông báo qua:
- ✉️ **Email** (EmailJS)
- 💬 **Zalo Bot** (n8n + Zalo API)

---

## 🚀 CÁC BƯỚC CẤU HÌNH

### BƯỚC 1️⃣: Cấu hình Email (Đã xong ✅)

File: `email-config.js`
```javascript
YOUR_EMAIL: 'nhuanlaptrinh@gmail.com'  // ✅ Đã cấu hình
```

---

### BƯỚC 2️⃣: Import Workflow vào n8n

1. Đăng nhập n8n: https://anhlaptrinhpyan.app.n8n.cloud/
2. Tạo workflow mới → Import from File
3. Chọn file: **`01RegistrationNotification.json`**
4. Click **Import**

---

### BƯỚC 3️⃣: Lấy Chat ID Zalo của bạn

**Cách nhanh nhất:**

1. Mở workflow **00ZaloBot** trong n8n
2. Click **Activate** workflow
3. Mở Zalo trên điện thoại → Tìm bot của bạn
4. Gửi tin nhắn: `Hello`
5. Quay lại n8n → Click node **Webhook** → Tab **Executions**
6. Xem trong data nhận được, tìm `message.from.id`
7. Copy số đó (Chat ID)

---

### BƯỚC 4️⃣: Cập nhật Chat ID vào Workflow

1. Mở workflow **01RegistrationNotification**
2. Click node **Chuẩn Bị Dữ Liệu**
3. Tìm biến `admin_chat_id`
4. Thay `YOUR_ZALO_USER_ID` = Chat ID vừa copy
5. Click **Save**

---

### BƯỚC 5️⃣: Lấy Webhook URL

1. Trong workflow **01RegistrationNotification**
2. Click node **Webhook - Nhận Đăng Ký**
3. Copy **Production URL**
   ```
   Ví dụ: https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification
   ```
4. Click **Activate** workflow (chuyển sang màu xanh)

---

### BƯỚC 6️⃣: Cập nhật Webhook URL vào Website

Mở file: **`n8n-config.js`**

```javascript
const N8N_CONFIG = {
    // Paste Production URL vào đây
    WEBHOOK_URL: 'https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification',
    
    ZALO_NOTIFICATION_ENABLED: true,  // true = bật, false = tắt
};
```

Lưu file.

---

## ✅ KIỂM TRA

1. Mở `index.html` trong trình duyệt
2. Điền form đăng ký với thông tin test
3. Click **Đăng Ký Ngay**
4. Kiểm tra:
   - ✉️ Email: `nhuanlaptrinh@gmail.com`
   - 💬 Zalo: Tin nhắn từ bot

**Tin nhắn Zalo sẽ có dạng:**
```
🎉 ĐĂNG KÝ MỚI - Khóa Facebook Ads

👤 Họ và tên: Nguyễn Văn A
📧 Email: test@example.com
📱 Số điện thoại: 0912345678
💰 Học phí: 1,450,000 VNĐ
🔑 Mã thanh toán: TDHCV343
⏰ Thời gian: 06/01/2026, 10:30:45
```

---

## 🐛 GỠ LỖI

**Không nhận được Zalo?**

1. ✅ Workflow đã **Activate** chưa?
2. ✅ Chat ID có đúng không?
3. ✅ Webhook URL có đúng không?
4. ✅ Check Executions trong n8n xem có lỗi không?

**Vẫn không được?**

Tạm thời tắt Zalo notification:
```javascript
// File: n8n-config.js
ZALO_NOTIFICATION_ENABLED: false
```

Email vẫn hoạt động bình thường.

---

## 📚 TÀI LIỆU CHI TIẾT

Xem file: **`HUONG_DAN_ZALO_BOT_NOTIFICATION.md`** để biết thêm chi tiết.

---

## 📞 HỖ TRỢ

- 📧 Email: nhuanlaptrinh@gmail.com
- 📱 Phone: 0914972102

---

**Chúc bạn thành công! 🚀**

