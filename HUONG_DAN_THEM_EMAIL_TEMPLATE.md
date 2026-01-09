# 📧 HƯỚNG DẪN THÊM EMAIL TEMPLATE VÀO EMAILJS

## 📋 CÁC TRƯỜNG DỮ LIỆU

Template này sử dụng các biến sau (từ form đăng ký):

| Biến EmailJS | Mô tả | Ví dụ |
|--------------|-------|-------|
| `{{to_name}}` | Tên người nhận | nhile |
| `{{to_email}}` | Email người nhận | thunhi237@gmail.com |
| `{{from_name}}` | Tên người đăng ký | Nguyễn Văn A |
| `{{from_email}}` | Email người đăng ký | user@example.com |
| `{{phone}}` | Số điện thoại | 0912345678 |
| `{{payment_code}}` | Mã chuyển khoản | TDHCV343 |
| `{{amount}}` | Học phí | 1,450,000 VNĐ |
| `{{course_name}}` | Tên khóa học | Khóa Tự Động Hóa Facebook Ads |
| `{{date}}` | Thời gian đăng ký | 06/01/2026, 10:30:45 |

---

## 🚀 CÁCH THÊM TEMPLATE VÀO EMAILJS

### Bước 1: Đăng nhập EmailJS Dashboard
🔗 https://dashboard.emailjs.com/

### Bước 2: Vào Email Templates
1. Click vào menu **"Email Templates"** ở sidebar bên trái
2. Click nút **"Create New Template"** (màu xanh)

### Bước 3: Cấu hình Template

#### 3.1. Thông tin cơ bản:
- **Template Name:** `Đăng Ký Khóa Học - Thông Báo`
- **Subject:** `🎉 Đăng Ký Thành Công - {{course_name}}`

#### 3.2. Copy nội dung HTML:
1. Mở file `email-template.html` trong project
2. Copy **TOÀN BỘ** nội dung từ `<table role="presentation"...` đến `</table>` (không copy thẻ `<html>`, `<head>`, `<body>`)
3. Paste vào ô **Content** trong EmailJS (chọn tab **HTML**)

**Lưu ý:** EmailJS chỉ cần phần body, không cần thẻ `<html>`, `<head>`, `<body>`

#### 3.3. Kiểm tra các biến:
Đảm bảo tất cả các biến sau có trong template:
- `{{to_name}}`
- `{{to_email}}`
- `{{from_name}}`
- `{{from_email}}`
- `{{phone}}`
- `{{payment_code}}`
- `{{amount}}`
- `{{course_name}}`
- `{{date}}`

### Bước 4: Cấu hình Email Service
1. Vào **Email Services** trong sidebar
2. Chọn service bạn đang dùng (hoặc tạo mới)
3. Đảm bảo service đã được kết nối với email của bạn

### Bước 5: Lấy Template ID
1. Sau khi tạo template, bạn sẽ thấy **Template ID** (ví dụ: `template_xxxxx`)
2. Copy Template ID này
3. Cập nhật vào file `email-config.js`:
   ```javascript
   TEMPLATE_ID: 'template_xxxxx', // Thay bằng Template ID mới
   ```

### Bước 6: Test Template
1. Trong EmailJS Dashboard, click nút **"Test"** trên template
2. Điền các giá trị test:
   - `to_name`: Test User
   - `to_email`: thunhi237@gmail.com
   - `from_name`: Nguyễn Văn A
   - `from_email`: test@example.com
   - `phone`: 0912345678
   - `payment_code`: TDHCV343
   - `amount`: 1,450,000 VNĐ
   - `course_name`: Khóa Tự Động Hóa Facebook Ads
   - `date`: 06/01/2026, 10:30:45
3. Click **"Send Test Email"**
4. Kiểm tra email nhận được

---

## 📝 NỘI DUNG HTML CẦN COPY

**Chỉ copy phần này (từ dòng này đến hết):**

```html
<table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
        <td align="center" style="padding: 40px 20px;">
            <!-- Main Container -->
            <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-collapse: collapse;">
                
                <!-- Header -->
                <tr>
                    <td style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                            🎉 ĐĂNG KÝ THÀNH CÔNG
                        </h1>
                        <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                            Cảm ơn bạn đã đăng ký khóa học!
                        </p>
                    </td>
                </tr>
                
                <!-- Content -->
                <tr>
                    <td style="padding: 40px 30px;">
                        
                        <!-- Greeting -->
                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333; line-height: 1.6;">
                            Xin chào <strong>{{to_name}}</strong>,
                        </p>
                        
                        <p style="margin: 0 0 25px 0; font-size: 16px; color: #333333; line-height: 1.6;">
                            Chúng tôi đã nhận được đăng ký của bạn cho khóa học. Dưới đây là thông tin chi tiết:
                        </p>
                        
                        <!-- Information Box -->
                        <table role="presentation" style="width: 100%; background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 25px 0; border-collapse: collapse;">
                            <tr>
                                <td>
                                    <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #27ae60; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">
                                        📋 THÔNG TIN ĐĂNG KÝ
                                    </h2>
                                    
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding: 12px 0; font-size: 15px; color: #555555; width: 40%;">
                                                <strong>Họ và tên:</strong>
                                            </td>
                                            <td style="padding: 12px 0; font-size: 15px; color: #333333; font-weight: 600;">
                                                {{from_name}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; font-size: 15px; color: #555555;">
                                                <strong>Email:</strong>
                                            </td>
                                            <td style="padding: 12px 0; font-size: 15px; color: #333333; font-weight: 600;">
                                                {{from_email}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; font-size: 15px; color: #555555;">
                                                <strong>Số điện thoại:</strong>
                                            </td>
                                            <td style="padding: 12px 0; font-size: 15px; color: #333333; font-weight: 600;">
                                                {{phone}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; font-size: 15px; color: #555555;">
                                                <strong>Khóa học:</strong>
                                            </td>
                                            <td style="padding: 12px 0; font-size: 15px; color: #333333; font-weight: 600;">
                                                {{course_name}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; font-size: 15px; color: #555555;">
                                                <strong>Học phí:</strong>
                                            </td>
                                            <td style="padding: 12px 0; font-size: 18px; color: #e74c3c; font-weight: bold;">
                                                {{amount}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; font-size: 15px; color: #555555;">
                                                <strong>Mã chuyển khoản:</strong>
                                            </td>
                                            <td style="padding: 12px 0; font-size: 18px; color: #3498db; font-weight: bold; letter-spacing: 2px;">
                                                {{payment_code}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; font-size: 15px; color: #555555;">
                                                <strong>Thời gian đăng ký:</strong>
                                            </td>
                                            <td style="padding: 12px 0; font-size: 15px; color: #333333; font-weight: 600;">
                                                {{date}}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Payment Instructions -->
                        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 5px;">
                            <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #856404;">
                                💳 HƯỚNG DẪN THANH TOÁN
                            </h3>
                            <p style="margin: 0 0 10px 0; font-size: 15px; color: #856404; line-height: 1.6;">
                                <strong>Bước 1:</strong> Chuyển khoản số tiền <strong style="color: #e74c3c;">{{amount}}</strong> đến tài khoản của chúng tôi.
                            </p>
                            <p style="margin: 0 0 10px 0; font-size: 15px; color: #856404; line-height: 1.6;">
                                <strong>Bước 2:</strong> Nhập nội dung chuyển khoản: <strong style="color: #3498db;">{{payment_code}}</strong>
                            </p>
                            <p style="margin: 0; font-size: 15px; color: #856404; line-height: 1.6;">
                                <strong>Bước 3:</strong> Sau khi thanh toán thành công, chúng tôi sẽ gửi thông tin truy cập khóa học đến email của bạn trong vòng 24 giờ.
                            </p>
                        </div>
                        
                        <!-- Important Note -->
                        <div style="background-color: #d1ecf1; border-left: 4px solid #3498db; padding: 20px; margin: 25px 0; border-radius: 5px;">
                            <p style="margin: 0; font-size: 15px; color: #0c5460; line-height: 1.6;">
                                <strong>📌 Lưu ý quan trọng:</strong> Vui lòng giữ lại mã chuyển khoản <strong>{{payment_code}}</strong> để đối chiếu khi cần thiết. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.
                            </p>
                        </div>
                        
                        <!-- Contact Info -->
                        <table role="presentation" style="width: 100%; background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0; border-collapse: collapse;">
                            <tr>
                                <td>
                                    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #333333;">
                                        📞 THÔNG TIN LIÊN HỆ
                                    </h3>
                                    <p style="margin: 5px 0; font-size: 14px; color: #555555;">
                                        <strong>Công Ty TNHH Anh Lập Trình</strong>
                                    </p>
                                    <p style="margin: 5px 0; font-size: 14px; color: #555555;">
                                        📧 Email: contact@anhlaptrinh.com
                                    </p>
                                    <p style="margin: 5px 0; font-size: 14px; color: #555555;">
                                        📱 Điện thoại: 0914972102
                                    </p>
                                    <p style="margin: 5px 0; font-size: 14px; color: #555555;">
                                        🏢 Địa chỉ: Lầu 5, Tòa Nhà ST. MORITZ, 1014 Phạm Văn Đồng, P, Thủ Đức, TP.HCM
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Footer Message -->
                        <p style="margin: 30px 0 0 0; font-size: 15px; color: #333333; line-height: 1.6; text-align: center;">
                            Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi!<br>
                            Chúc bạn học tập hiệu quả! 🚀
                        </p>
                        
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td style="background-color: #2c3e50; padding: 30px; text-align: center; border-radius: 0 0 10px 10px;">
                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #ecf0f1;">
                            <strong>Anh Lập Trình</strong>
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #95a5a6;">
                            Tự Động Hóa Cuộc Sống Với AI<br>
                            © 2024. All rights reserved.
                        </p>
                    </td>
                </tr>
                
            </table>
        </td>
    </tr>
</table>
```

---

## ✅ CHECKLIST SAU KHI THÊM TEMPLATE

- [ ] Template đã được tạo trong EmailJS Dashboard
- [ ] Tất cả các biến `{{...}}` đã được thêm vào template
- [ ] Template ID đã được cập nhật vào `email-config.js`
- [ ] Đã test gửi email thành công
- [ ] Email hiển thị đẹp trên desktop và mobile
- [ ] Tất cả thông tin hiển thị đúng

---

## 🎨 TÍNH NĂNG TEMPLATE

✅ **Responsive Design** - Hiển thị đẹp trên mọi thiết bị  
✅ **Professional Layout** - Giao diện chuyên nghiệp, dễ đọc  
✅ **Color Coding** - Màu sắc phân biệt rõ ràng  
✅ **Complete Information** - Đầy đủ thông tin đăng ký  
✅ **Payment Instructions** - Hướng dẫn thanh toán rõ ràng  
✅ **Contact Info** - Thông tin liên hệ đầy đủ  

---

## 🆘 XỬ LÝ SỰ CỐ

### Template không hiển thị đúng?
- Kiểm tra lại HTML có lỗi syntax không
- Đảm bảo copy đúng phần HTML (không có thẻ `<html>`, `<head>`, `<body>`)
- Test lại trong EmailJS Dashboard

### Biến không hiển thị giá trị?
- Kiểm tra tên biến có đúng không (phải khớp chính xác)
- Đảm bảo biến được gửi từ `script.js`
- Kiểm tra console log để xem dữ liệu gửi đi

### Email vào Spam?
- Kiểm tra thư mục Spam
- Thêm email vào danh sách liên hệ
- Kiểm tra EmailJS domain reputation

---

**Chúc bạn thành công! 🎉**

