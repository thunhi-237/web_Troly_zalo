# 🔍 HƯỚNG DẪN DEBUG EMAIL KHÔNG NHẬN ĐƯỢC

## ✅ Đã cải thiện code với logging chi tiết

Code đã được cập nhật với:
- ✅ Error handling chi tiết
- ✅ Console logging để debug
- ✅ Thông báo lỗi cụ thể
- ✅ Kiểm tra từng bước gửi email

---

## 🔍 CÁCH KIỂM TRA

### Bước 1: Mở Console trình duyệt
1. Mở website: `http://localhost:8000/index.html`
2. Nhấn `F12` hoặc `Cmd+Option+I` (Mac) để mở Developer Tools
3. Chuyển sang tab **Console**

### Bước 2: Test form đăng ký
1. Điền form đăng ký với thông tin test
2. Click "Đăng Ký Ngay"
3. Xem console để kiểm tra logs

---

## 📋 CÁC LOG BẠN SẼ THẤY

### ✅ Nếu thành công:
```
✅ EmailJS initialized with Public Key: aeNVfuer5C...
📧 Đang gửi email đến: thunhi237@gmail.com
📋 Email params: {...}
✅ Email gửi thành công! {status: 200, text: "OK"}
📧 Email đã được gửi đến: thunhi237@gmail.com
```

### ❌ Nếu có lỗi, bạn sẽ thấy:

#### Lỗi 1: EmailJS library chưa load
```
❌ EmailJS library chưa được load! Kiểm tra lại script tag trong index.html
```
**Giải pháp:** Kiểm tra internet connection, EmailJS CDN có thể bị chặn

#### Lỗi 2: Config thiếu thông tin
```
❌ EmailJS config thiếu thông tin: {hasPublicKey: false, ...}
```
**Giải pháp:** Kiểm tra file `email-config.js`

#### Lỗi 3: Lỗi 400 - Cấu hình sai
```
❌ Lỗi gửi email: {status: 400, text: "Bad Request"}
Lỗi cấu hình (400). Kiểm tra lại Service ID và Template ID.
```
**Giải pháp:** 
- Vào EmailJS Dashboard: https://dashboard.emailjs.com/
- Kiểm tra Service ID và Template ID có đúng không

#### Lỗi 4: Lỗi 401 - Public Key sai
```
❌ Lỗi gửi email: {status: 401, text: "Unauthorized"}
Lỗi xác thực (401). Kiểm tra lại Public Key.
```
**Giải pháp:**
- Vào EmailJS Dashboard → Account → General
- Copy Public Key mới vào `email-config.js`

#### Lỗi 5: Lỗi 429 - Hết quota
```
❌ Lỗi gửi email: {status: 429, text: "Too Many Requests"}
Đã hết quota (429). EmailJS miễn phí chỉ 200 emails/tháng.
```
**Giải pháp:**
- Đợi đến tháng sau
- Hoặc nâng cấp EmailJS plan

---

## 🔧 KIỂM TRA CẤU HÌNH

### 1. Kiểm tra email-config.js
```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'aeNVfuer5Cm_8uaOj',  // ✅ Phải có
    SERVICE_ID: 'service_h3u1yz7',     // ✅ Phải có
    TEMPLATE_ID: 'template_e1qiu58',   // ✅ Phải có
    YOUR_EMAIL: 'thunhi237@gmail.com',  // ✅ Email nhận thông báo
    YOUR_NAME: 'nhile'                 // ✅ Tên hiển thị
};
```

### 2. Kiểm tra EmailJS Dashboard
🔗 https://dashboard.emailjs.com/

**Kiểm tra:**
- ✅ Public Key (Account → General)
- ✅ Service ID (Email Services)
- ✅ Template ID (Email Templates)
- ✅ Email quota còn không? (200 emails/tháng miễn phí)

### 3. Kiểm tra Email Template
Trong EmailJS Dashboard → Email Templates → `template_e1qiu58`

**Template phải có các biến:**
- `{{to_email}}` hoặc `{{to_name}}`
- `{{from_name}}`
- `{{from_email}}`
- `{{phone}}`
- `{{payment_code}}`
- `{{amount}}`
- `{{course_name}}`
- `{{date}}`

---

## 📧 KIỂM TRA EMAIL NHẬN

### Email nhận thông báo: `thunhi237@gmail.com`

**Kiểm tra:**
1. ✅ Hộp thư đến (Inbox)
2. ✅ Thư mục Spam/Junk
3. ✅ Thư mục Promotions (nếu dùng Gmail)
4. ✅ Kiểm tra filter email

---

## 🧪 TEST THỦ CÔNG

Mở Console và chạy lệnh này để test:

```javascript
// Kiểm tra config
console.log('Config:', EMAILJS_CONFIG);

// Kiểm tra EmailJS library
console.log('EmailJS loaded:', typeof emailjs !== 'undefined');

// Test gửi email
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
            to_email: EMAILJS_CONFIG.YOUR_EMAIL,
            to_name: EMAILJS_CONFIG.YOUR_NAME,
            from_name: 'Test User',
            from_email: 'test@example.com',
            phone: '0912345678',
            payment_code: 'TEST123',
            amount: '1,450,000 VNĐ',
            course_name: 'Test Course',
            date: new Date().toLocaleString('vi-VN')
        }
    )
    .then(response => console.log('✅ Test email sent:', response))
    .catch(error => console.error('❌ Test email failed:', error));
}
```

---

## 🆘 CÁC VẤN ĐỀ THƯỜNG GẶP

### Vấn đề 1: Email vào Spam
**Giải pháp:**
- Kiểm tra thư mục Spam
- Thêm `thunhi237@gmail.com` vào danh sách liên hệ
- Kiểm tra EmailJS domain reputation

### Vấn đề 2: EmailJS quota hết
**Giải pháp:**
- Vào EmailJS Dashboard kiểm tra quota
- Đợi đến tháng sau (reset mỗi tháng)
- Nâng cấp plan nếu cần

### Vấn đề 3: Template không khớp
**Giải pháp:**
- Kiểm tra tên biến trong template phải khớp với code
- Test template trong EmailJS Dashboard

### Vấn đề 4: CORS hoặc Network error
**Giải pháp:**
- Kiểm tra internet connection
- Kiểm tra firewall không chặn EmailJS
- Thử trên trình duyệt khác

---

## 📞 HỖ TRỢ

Nếu vẫn không giải quyết được:
1. Copy toàn bộ log từ Console
2. Chụp màn hình EmailJS Dashboard
3. Gửi thông tin để được hỗ trợ

---

**Cập nhật:** Code đã được cải thiện với logging chi tiết để dễ debug hơn! 🎉

