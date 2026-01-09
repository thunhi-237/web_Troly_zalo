# 📧💬 TÍCH HỢP THÔNG BÁO EMAIL & ZALO BOT

## 🎯 TÍNH NĂNG

Website tự động gửi thông báo qua **2 kênh** khi có người đăng ký:

| Kênh | Công nghệ | Trạng thái |
|------|-----------|------------|
| ✉️ Email | EmailJS | ✅ Đã cấu hình |
| 💬 Zalo Bot | n8n + Zalo API | ⏳ Cần cấu hình |

---

## 📦 CẤU TRÚC PROJECT

```
01facebookads/
│
├── 📄 index.html                    # Website chính
├── 📄 script.js                     # Logic xử lý form + notifications
├── 📄 style.css                     # Styling
│
├── ⚙️ email-config.js               # ✅ Cấu hình EmailJS (Đã xong)
├── ⚙️ n8n-config.js                 # ⏳ Cấu hình n8n Webhook (Cần cấu hình)
│
├── 🤖 00ZaloBot.json                # Workflow Zalo Bot gốc (để lấy Chat ID)
├── 🤖 01RegistrationNotification.json  # ⭐ Workflow mới (Import vào n8n)
│
├── 📚 CAU_HINH_THONG_BAO.md         # ⚡ Hướng dẫn nhanh (5 phút)
├── 📚 HUONG_DAN_ZALO_BOT_NOTIFICATION.md  # 📖 Hướng dẫn chi tiết
├── 📚 TEST_WORKFLOW.md              # 🧪 Hướng dẫn test
├── 📚 TICH_HOP_HOAN_THANH.md        # ✅ Tóm tắt tích hợp
└── 📚 README_INTEGRATION.md         # 📋 File này
```

---

## 🚀 BẮT ĐẦU NHANH (5 PHÚT)

### Bước 1: Import Workflow
1. Đăng nhập n8n: https://anhlaptrinhpyan.app.n8n.cloud/
2. Import file: **`01RegistrationNotification.json`**

### Bước 2: Lấy Chat ID
1. Mở workflow **00ZaloBot** → Activate
2. Gửi tin nhắn "Hello" đến Zalo Bot
3. Check Executions → Copy `message.from.id`

### Bước 3: Cập nhật Chat ID
1. Mở workflow **01RegistrationNotification**
2. Node **Chuẩn Bị Dữ Liệu** → Sửa `admin_chat_id`
3. Save → Activate

### Bước 4: Lấy Webhook URL
1. Node **Webhook - Nhận Đăng Ký** → Copy Production URL
2. Mở file **`n8n-config.js`** → Paste vào `WEBHOOK_URL`

### Bước 5: Test
Mở `index.html` → Điền form → Submit → Check Email & Zalo

📖 **Chi tiết:** Xem file `CAU_HINH_THONG_BAO.md`

---

## 📚 TÀI LIỆU

| File | Mô tả | Thời gian đọc |
|------|-------|---------------|
| 📄 **CAU_HINH_THONG_BAO.md** | Hướng dẫn cấu hình nhanh | 5 phút |
| 📖 **HUONG_DAN_ZALO_BOT_NOTIFICATION.md** | Hướng dẫn chi tiết đầy đủ | 15 phút |
| 🧪 **TEST_WORKFLOW.md** | Hướng dẫn test & debug | 10 phút |
| ✅ **TICH_HOP_HOAN_THANH.md** | Tóm tắt kỹ thuật | 10 phút |

---

## 🎨 LƯU ĐỒ HOẠT ĐỘNG

```
┌─────────────────────┐
│   User điền form    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Click "Đăng Ký"    │
└──────────┬──────────┘
           │
           ├──────────────────────┐
           │                      │
           ▼                      ▼
    ┌──────────┐          ┌──────────┐
    │ EmailJS  │          │ n8n      │
    │ Service  │          │ Webhook  │
    └────┬─────┘          └────┬─────┘
         │                     │
         ▼                     ▼
    ┌──────────┐          ┌──────────┐
    │ Gmail    │          │ Zalo API │
    └────┬─────┘          └────┬─────┘
         │                     │
         ▼                     ▼
    📧 Email              💬 Zalo
   Notification          Message
         │                     │
         └──────────┬──────────┘
                    ▼
           ┌─────────────────┐
           │  User redirect  │
           │  Trang thanh toán│
           └─────────────────┘
```

---

## 🔧 CẤU HÌNH

### ✅ Đã cấu hình sẵn:

#### 1. EmailJS (`email-config.js`)
```javascript
PUBLIC_KEY: '9anCXdBPZiZvduRuQ'
SERVICE_ID: 'service_cdywck7'
TEMPLATE_ID: 'template_drxh4sf'
YOUR_EMAIL: 'nhuanlaptrinh@gmail.com'
```

#### 2. Zalo Bot Token (trong workflow)
```
Access Token: 3682309957303154161:toHJdCNZuRLAbgzFAthLBcGJROrUYGJGdRwfGNwipSjhMXQMAXFxzKIearPkfHEE
```

### ⏳ Cần cấu hình:

#### 1. Chat ID (trong workflow)
```javascript
// Node "Chuẩn Bị Dữ Liệu"
admin_chat_id: "YOUR_ZALO_USER_ID"  // ← Cần thay thế
```

#### 2. Webhook URL (`n8n-config.js`)
```javascript
WEBHOOK_URL: 'https://...'  // ← Copy từ n8n
```

---

## 🧪 TEST

### Test nhanh:

```javascript
// Mở Console trong trình duyệt (F12)
// Paste và chạy:

fetch('https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@test.com',
    phone: '0912345678',
    payment_code: 'TDHCV343',
    amount: '1,450,000 VNĐ',
    course_name: 'Test',
    date: new Date().toLocaleString('vi-VN')
  })
})
.then(r => r.json())
.then(d => console.log('✅ Success:', d))
.catch(e => console.error('❌ Error:', e));
```

**Kết quả mong đợi:**
- ✅ Console: `✅ Success: {success: true, ...}`
- ✅ Zalo: Nhận được tin nhắn từ bot

📖 **Chi tiết:** Xem file `TEST_WORKFLOW.md`

---

## 📱 MẪU THÔNG BÁO

### Email:
```
Subject: Đăng ký mới - Khóa Facebook Ads
To: nhuanlaptrinh@gmail.com

[Template từ EmailJS với đầy đủ thông tin]
```

### Zalo Bot:
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

## 🐛 TROUBLESHOOTING

### ❌ Không nhận được Zalo?

**Checklist:**
1. [ ] Workflow đã Activate?
2. [ ] Chat ID đã đúng?
3. [ ] Webhook URL đã đúng?
4. [ ] Check Executions trong n8n?

**Debug:**
```javascript
// Check config
console.log(N8N_CONFIG);

// Test webhook trực tiếp (xem code ở phần TEST)
```

### ❌ Không nhận được Email?

**Checklist:**
1. [ ] EmailJS config đã đúng?
2. [ ] Check spam folder?
3. [ ] Quota còn không? (200 emails/tháng)

---

## 🔒 BẢO MẬT

### ⚠️ QUAN TRỌNG:

1. ❌ **KHÔNG** commit file chứa token lên GitHub public
2. ❌ **KHÔNG** chia sẻ Access Token
3. ✅ Token lưu trong n8n (server-side) là an toàn
4. ✅ Webhook URL có thể public (design của n8n)

### Khuyến nghị:

- Định kỳ rotate token (3-6 tháng)
- Monitor Executions logs trong n8n
- Set up alerts cho failed executions

---

## 📊 MONITORING

### Trong n8n:

**Dashboard:** https://anhlaptrinhpyan.app.n8n.cloud/

1. Vào workflow **01RegistrationNotification**
2. Tab **Executions** → Xem lịch sử
3. Click vào từng execution để xem chi tiết:
   - ✅ Màu xanh = Thành công
   - ❌ Màu đỏ = Thất bại

### Metrics có thể track:

- Số lượng đăng ký
- Tỷ lệ thành công/thất bại
- Thời gian xử lý trung bình
- Errors logs

---

## 🚀 TÍNH NĂNG MỞ RỘNG

### Có thể thêm:

1. **Database Storage**
   - Lưu vào Google Sheets
   - Lưu vào MySQL/PostgreSQL

2. **Multiple Recipients**
   - Gửi đến nhiều quản trị viên
   - Group notification

3. **Auto Reply**
   - Email xác nhận tự động
   - Follow-up emails

4. **Analytics Dashboard**
   - Chart/graph số liệu đăng ký
   - Export CSV

5. **More Channels**
   - SMS (Twilio)
   - Telegram
   - Discord
   - Slack

---

## 💡 TIPS

1. **Disable Zalo khi dev:**
   ```javascript
   // n8n-config.js
   ZALO_NOTIFICATION_ENABLED: false
   ```

2. **Test trước trong n8n:**
   - Dùng "Listen for Test Event"
   - Verify từng node hoạt động đúng

3. **Backup workflow:**
   - Export workflow định kỳ
   - Commit vào Git (private repo)

4. **Monitor thường xuyên:**
   - Ngày đầu: Check mỗi giờ
   - Sau 1 tuần: Check 1 lần/ngày
   - Ổn định: Check 1 lần/tuần

---

## 📞 HỖ TRỢ

**Anh Lập Trình**

- 📧 Email: nhuanlaptrinh@gmail.com
- 📱 Phone: 0914972102
- 🌐 Website: https://anhlaptrinh.vn
- 💼 Company: Công Ty TNHH Anh Lập Trình
- 🏢 Tax Code: 0318822989
- 📍 Address: Lầu 5: Toà Nhà ST. MORITZ, 1014 Phạm Văn Đồng, P, Thủ Đức, TP.HCM

---

## 🎓 NEXT STEPS

1. ✅ **Cấu hình** - Follow `CAU_HINH_THONG_BAO.md`
2. 🧪 **Test** - Follow `TEST_WORKFLOW.md`
3. 📊 **Monitor** - Check n8n Executions
4. 🎨 **Customize** - Tùy chỉnh message/logic
5. 🚀 **Deploy** - Production ready!

---

## 📈 TIMELINE

| Thời gian | Công việc |
|-----------|-----------|
| 5 phút | Import workflow + Lấy Chat ID |
| 2 phút | Cập nhật config |
| 3 phút | Test & verify |
| **10 phút** | **TỔNG** |

---

## ✅ CHECKLIST

### Pre-deployment:
- [ ] Import workflow vào n8n
- [ ] Cấu hình Chat ID
- [ ] Cấu hình Webhook URL
- [ ] Test với data thật
- [ ] Verify email received
- [ ] Verify Zalo message received

### Post-deployment:
- [ ] Monitor first 10 registrations
- [ ] Check error logs
- [ ] Optimize if needed
- [ ] Document custom changes
- [ ] Backup workflow

---

## 🎉 KẾT LUẬN

**Hệ thống đã sẵn sàng để triển khai!**

Chỉ cần 10 phút cấu hình là có thể sử dụng ngay.

**Features:**
- ✅ Dual notification (Email + Zalo)
- ✅ Realtime
- ✅ Reliable
- ✅ Easy to configure
- ✅ Well documented

**Chúc bạn thành công! 🚀**

---

*Last updated: 06/01/2026*
*Version: 1.0.0*

