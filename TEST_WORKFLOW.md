# 🧪 TEST WORKFLOW N8N - HƯỚNG DẪN NHANH

## 🎯 MỤC ĐÍCH

Test workflow **01RegistrationNotification** để đảm bảo:
1. ✅ Nhận được data từ website
2. ✅ Format message đúng
3. ✅ Gửi được tin nhắn Zalo

---

## 📋 CHUẨN BỊ

### Cần có:
- ✅ Đã import workflow vào n8n
- ✅ Đã cấu hình Chat ID
- ✅ Workflow đang ở trạng thái **Active** (màu xanh)

---

## 🚀 CÁCH 1: TEST TRỰC TIẾP TRONG N8N

### Bước 1: Chuẩn bị test data

Mở workflow **01RegistrationNotification** trong n8n

### Bước 2: Test từng node

#### Node 1: Webhook - Nhận Đăng Ký
1. Click vào node **Webhook - Nhận Đăng Ký**
2. Click button **Listen for Test Event** (nút tai nghe)
3. Trạng thái chuyển sang "Waiting for test event..."

#### Gửi test request
Mở Terminal hoặc Postman, gửi request:

**Cách A: Dùng curl (Windows PowerShell)**
```powershell
$body = @{
    name = "Nguyễn Văn Test"
    email = "test@example.com"
    phone = "0912345678"
    payment_code = "TDHCV343"
    amount = "1,450,000 VNĐ"
    course_name = "Khóa Tự Động Hóa Facebook Ads"
    date = "06/01/2026, 10:30:45"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Cách B: Dùng curl (Linux/Mac)**
```bash
curl -X POST https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn Test",
    "email": "test@example.com",
    "phone": "0912345678",
    "payment_code": "TDHCV343",
    "amount": "1,450,000 VNĐ",
    "course_name": "Khóa Tự Động Hóa Facebook Ads",
    "date": "06/01/2026, 10:30:45"
  }'
```

**Cách C: Dùng Postman**
1. Method: **POST**
2. URL: `https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification`
3. Headers:
   ```
   Content-Type: application/json
   ```
4. Body (raw JSON):
   ```json
   {
     "name": "Nguyễn Văn Test",
     "email": "test@example.com",
     "phone": "0912345678",
     "payment_code": "TDHCV343",
     "amount": "1,450,000 VNĐ",
     "course_name": "Khóa Tự Động Hóa Facebook Ads",
     "date": "06/01/2026, 10:30:45"
   }
   ```
5. Click **Send**

### Bước 3: Kiểm tra kết quả

Quay lại n8n:

✅ **Node Webhook** sẽ hiển thị:
```json
{
  "body": {
    "name": "Nguyễn Văn Test",
    "email": "test@example.com",
    "phone": "0912345678",
    ...
  }
}
```

✅ **Node Chuẩn Bị Dữ Liệu** sẽ có:
```json
{
  "access_token": "3682309957303154161:...",
  "admin_chat_id": "YOUR_CHAT_ID",
  "message": "🎉 ĐĂNG KÝ MỚI - Khóa Facebook Ads\n\n👤 Họ và tên: Nguyễn Văn Test\n..."
}
```

✅ **Node Gửi Đến Zalo Bot** sẽ có:
```json
{
  "ok": true,
  "message_id": "..."
}
```

✅ **Zalo của bạn** sẽ nhận được tin nhắn từ bot.

---

## 🚀 CÁCH 2: TEST TỪ WEBSITE

### Bước 1: Mở website
```bash
# Mở index.html trong trình duyệt
start index.html
```

### Bước 2: Mở DevTools
Nhấn **F12** → Tab **Console**

### Bước 3: Điền form và submit
1. Cuộn xuống form đăng ký
2. Điền thông tin test:
   - Họ và tên: `Test User`
   - Email: `test@gmail.com`
   - Số điện thoại: `0912345678`
3. Click **Đăng Ký Ngay**

### Bước 4: Kiểm tra Console
Sẽ thấy logs:
```
Email sent successfully! 200 OK
Zalo notification sent successfully: {success: true, ...}
```

### Bước 5: Kiểm tra kết quả
- ✅ Email: Check hộp thư `nhuanlaptrinh@gmail.com`
- ✅ Zalo: Check tin nhắn từ bot

---

## 🐛 GỠ LỖI

### Lỗi 1: 404 Not Found
**Nguyên nhân:** Webhook URL sai hoặc workflow chưa activate

**Giải pháp:**
1. Check URL trong `n8n-config.js`
2. Đảm bảo workflow đã **Active** (màu xanh)
3. Copy lại Production URL từ n8n

---

### Lỗi 2: 400 Bad Request
**Nguyên nhân:** Data gửi lên không đúng format

**Giải pháp:**
1. Check JSON syntax
2. Đảm bảo Content-Type: application/json
3. Check tất cả field có đủ không

---

### Lỗi 3: Zalo API Error
**Nguyên nhân:** Chat ID hoặc Access Token không đúng

**Giải pháp:**
1. Verify Chat ID trong node **Chuẩn Bị Dữ Liệu**
2. Check Access Token còn hạn không
3. Test gửi tin nhắn trực tiếp qua Zalo API

**Test Zalo API:**
```bash
curl -X POST "https://bot-api.zaloplatforms.com/bot3682309957303154161:toHJdCNZuRLAbgzFAthLBcGJROrUYGJGdRwfGNwipSjhMXQMAXFxzKIearPkfHEE/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "YOUR_CHAT_ID",
    "text": "Test message from n8n"
  }'
```

Nếu nhận được `{"ok": true}` → Token và Chat ID đúng.

---

### Lỗi 4: CORS Error (trên browser)
**Nguyên nhân:** n8n webhook có CORS restrictions

**Giải pháp:**
n8n webhook mặc định cho phép CORS, nếu vẫn lỗi:
1. Check URL có đúng không
2. Thử test bằng Postman (bypass CORS)
3. Contact n8n support

---

## 📊 CHECK LOGS

### Trong n8n:
1. Mở workflow **01RegistrationNotification**
2. Click tab **Executions**
3. Xem list các lần chạy:
   - ✅ Màu xanh: Thành công
   - ❌ Màu đỏ: Thất bại
4. Click vào từng execution để xem chi tiết

### Trong Browser Console:
```javascript
// Check config
console.log(N8N_CONFIG);

// Check EmailJS config
console.log(EMAILJS_CONFIG);

// Manual test Zalo notification
fetch('https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test',
    email: 'test@test.com',
    phone: '0912345678',
    payment_code: 'TEST123',
    amount: '1,450,000 VNĐ',
    course_name: 'Test Course',
    date: new Date().toLocaleString('vi-VN')
  })
})
.then(r => r.json())
.then(d => console.log('Success:', d))
.catch(e => console.error('Error:', e));
```

---

## ✅ CHECKLIST TEST

Trước khi deploy:

- [ ] Test workflow trong n8n (manual execute)
- [ ] Test gửi request qua curl/Postman
- [ ] Test từ website (form submit)
- [ ] Verify nhận được email
- [ ] Verify nhận được Zalo message
- [ ] Test với data có ký tự đặc biệt
- [ ] Test với phone number khác format
- [ ] Test với email có dấu tiếng Việt
- [ ] Test error handling (sai URL, timeout, etc)
- [ ] Check Executions logs trong n8n

---

## 🎯 TEST CASES

### Test Case 1: Happy Path ✅
**Input:** Form đầy đủ, hợp lệ
**Expected:** Email ✅ + Zalo ✅

---

### Test Case 2: Special Characters ✅
**Input:** 
```
name: "Nguyễn Văn Ạ @ #"
email: "user+test@gmail.com"
phone: "0912-345-678"
```
**Expected:** Format đúng, gửi thành công

---

### Test Case 3: Long Text ✅
**Input:**
```
name: "Nguyễn Thị Bảo Châu Mai Anh Phương Thảo Linh Chi" (60+ chars)
```
**Expected:** Không bị cắt, hiển thị đầy đủ

---

### Test Case 4: Network Timeout ⏱️
**Simulate:** Tắt internet, submit form
**Expected:** Timeout sau 10s, show notification

---

### Test Case 5: n8n Down ❌
**Simulate:** Sai webhook URL
**Expected:** Email vẫn gửi, user vẫn redirect

---

## 📈 PERFORMANCE TEST

Test với nhiều request liên tiếp:

```javascript
// Test 10 requests liên tiếp
for(let i = 0; i < 10; i++) {
  fetch('https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: `Test User ${i}`,
      email: `test${i}@test.com`,
      phone: `091234567${i}`,
      payment_code: 'TDHCV343',
      amount: '1,450,000 VNĐ',
      course_name: 'Khóa Tự Động Hóa Facebook Ads',
      date: new Date().toLocaleString('vi-VN')
    })
  })
  .then(r => r.json())
  .then(d => console.log(`Request ${i}:`, d));
}
```

**Expected:** Tất cả request thành công (có thể chậm do rate limit)

---

## 🎉 KẾT QUẢ MONG ĐỢI

Sau khi test thành công:

1. ✅ Form submit hoạt động
2. ✅ Email gửi đến `nhuanlaptrinh@gmail.com`
3. ✅ Zalo message gửi đến bot của bạn
4. ✅ User redirect đến trang thanh toán
5. ✅ Executions log trong n8n hiển thị success
6. ✅ Console không có error

---

**Chúc bạn test thành công! 🚀**

