# 🔍 HƯỚNG DẪN DEBUG TRANG THANH TOÁN

## ✅ Đã cải thiện code với error handling

Code đã được cập nhật với:
- ✅ Wrap script trong `DOMContentLoaded` để đảm bảo DOM đã load xong
- ✅ Console logging chi tiết để debug
- ✅ Error handling với try-catch
- ✅ Kiểm tra từng element trước khi sử dụng

---

## 🔍 CÁCH KIỂM TRA LỖI

### Bước 1: Mở Console trình duyệt
1. Mở trang thanh toán: `http://localhost:8000/thanhtoan1.html?name=Test&email=test@test.com&phone=0912345678`
2. Nhấn `F12` hoặc `Cmd+Option+I` (Mac) để mở Developer Tools
3. Chuyển sang tab **Console**

### Bước 2: Xem logs

**✅ Nếu thành công, bạn sẽ thấy:**
```
✅ Trang thanh toán đã load xong
📋 Thông tin từ URL: {name: "Test", email: "test@test.com", phone: "0912345678"}
✅ QR Code image element found
✅ Số tiền đã được cập nhật
✅ Thông tin đăng ký đã được hiển thị
```

**⚠️ Nếu có cảnh báo:**
```
⚠️ QR Code element không tìm thấy (id="qrcode")
⚠️ Payment amount element không tìm thấy (id="payment-amount-bottom")
⚠️ Registration info element không tìm thấy (id="registration-info-bottom")
```

**❌ Nếu có lỗi:**
```
❌ Lỗi khi xử lý trang thanh toán: [Error message]
Stack trace: [Chi tiết lỗi]
```

---

## 🐛 CÁC LỖI THƯỜNG GẶP

### Lỗi 1: Element không tìm thấy
**Triệu chứng:**
- Console hiển thị: `⚠️ [Element] không tìm thấy`
- Thông tin không hiển thị trên trang

**Giải pháp:**
1. Kiểm tra HTML có element với id đúng không
2. Kiểm tra element có trong DOM không (F12 → Elements tab)
3. Đảm bảo script chạy sau khi DOM load xong (đã fix)

### Lỗi 2: URL parameters không đọc được
**Triệu chứng:**
- Console hiển thị: `ℹ️ Không có thông tin name từ URL parameters`
- Thông tin đăng ký không hiển thị

**Giải pháp:**
1. Kiểm tra URL có đúng format không: `?name=...&email=...&phone=...`
2. Kiểm tra redirect từ `script.js` có đúng không
3. Test với URL thủ công: `thanhtoan1.html?name=Test&email=test@test.com&phone=0912345678`

### Lỗi 3: QR Code không hiển thị
**Triệu chứng:**
- QR Code không load được
- Console hiển thị: `⚠️ Không thể tải QR Code image`

**Giải pháp:**
1. Kiểm tra file `logo mb.jpg` có tồn tại không
2. Kiểm tra đường dẫn: `src="logo%20mb.jpg"` (có space được encode thành %20)
3. Thử đổi tên file thành `logo-mb.jpg` và cập nhật HTML

### Lỗi 4: Script conflict
**Triệu chứng:**
- Console có nhiều lỗi JavaScript
- Trang không hoạt động đúng

**Giải pháp:**
1. Kiểm tra `script.js` có conflict với script trong `thanhtoan1.html` không
2. Đảm bảo các function không bị override
3. Kiểm tra có duplicate event listeners không

---

## 🧪 TEST THỦ CÔNG

### Test 1: Kiểm tra URL parameters
Mở Console và chạy:
```javascript
const urlParams = new URLSearchParams(window.location.search);
console.log('Name:', urlParams.get('name'));
console.log('Email:', urlParams.get('email'));
console.log('Phone:', urlParams.get('phone'));
```

### Test 2: Kiểm tra elements
Mở Console và chạy:
```javascript
console.log('QR Code:', document.getElementById('qrcode'));
console.log('Amount:', document.getElementById('payment-amount-bottom'));
console.log('Registration Info:', document.getElementById('registration-info-bottom'));
```

### Test 3: Test redirect từ form
1. Điền form đăng ký trên `index.html`
2. Submit form
3. Kiểm tra URL sau khi redirect có đúng không
4. Kiểm tra Console có lỗi không

---

## 📋 CHECKLIST DEBUG

Trước khi báo lỗi, hãy kiểm tra:

- [ ] Console có lỗi JavaScript không?
- [ ] URL parameters có đúng format không?
- [ ] Các element có tồn tại trong DOM không?
- [ ] QR Code image có load được không?
- [ ] Script có chạy sau khi DOM load xong không?
- [ ] Có conflict giữa các script không?

---

## 🔧 CÁC ELEMENT CẦN KIỂM TRA

### 1. QR Code Image
- **ID:** `qrcode`
- **Location:** Trong phần thông tin chuyển khoản
- **File:** `logo mb.jpg` hoặc `logo%20mb.jpg`

### 2. Payment Amount
- **ID:** `payment-amount-bottom`
- **Location:** Phần thông tin thanh toán
- **Default value:** `1,420,000 VNĐ`

### 3. Registration Info
- **ID:** `registration-info-bottom`
- **Location:** Dưới cùng của payment container
- **Display:** `display: none` (sẽ được set thành `block` khi có thông tin)

---

## 📞 HỖ TRỢ

Nếu vẫn không giải quyết được:
1. Copy toàn bộ log từ Console
2. Chụp màn hình trang thanh toán
3. Gửi URL đầy đủ (bao gồm parameters)
4. Mô tả chi tiết lỗi gặp phải

---

**Cập nhật:** Code đã được cải thiện với error handling và logging chi tiết! 🎉

