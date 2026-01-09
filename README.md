# Website Facebook Ads - Hướng Dẫn Chạy

## ⚡ Cách Chạy Nhanh (Khuyến Nghị) - Device Emulator

**🎯 Cách tốt nhất:** Sử dụng Device Emulator để xem giao diện trên nhiều thiết bị:

```powershell
.\start-emulator.ps1
```

Script này sẽ:
1. ✅ Tự động khởi động HTTP server tại port 8000
2. ✅ Mở Device Emulator với giao diện mô phỏng
3. ✅ Cho phép chọn nhiều thiết bị: Desktop, iPhone, Samsung

**Tính năng Device Emulator:**
- 📱 **Desktop View**: Xem giao diện desktop đầy đủ
- 🍎 **iPhone 14 Pro Max**: Mô phỏng iPhone lớn nhất
- 🍎 **iPhone 12 Pro**: Mô phỏng iPhone tiêu chuẩn
- 🍎 **iPhone SE**: Mô phỏng iPhone nhỏ
- 🤖 **Samsung Galaxy Note**: Mô phỏng Samsung lớn
- 🤖 **Samsung Galaxy S21**: Mô phỏng Samsung tiêu chuẩn

**Phím tắt trong Emulator:**
- `Ctrl+R`: Làm mới trang
- `F11`: Chế độ toàn màn hình
- Click nút thiết bị: Chuyển đổi giữa các thiết bị

---

## 📖 Các Cách Khác

### Chạy Thủ Công

**Bước 1:** Khởi động server
```powershell
python -m http.server 8000
```

**Bước 2:** Mở browser
- **Device Emulator (Khuyến nghị):** `http://localhost:8000/device-emulator.html`
- Desktop: `http://localhost:8000/index.html`
- Mobile: `http://localhost:8000/index.html?mobile=1`

**Bước 3:** 
- Nếu dùng Emulator: Chọn thiết bị từ menu
- Nếu dùng trực tiếp: Bật mobile emulation (F12 -> Ctrl+Shift+M)

---

## 📁 Các Script Có Sẵn

| Script | Mô Tả |
|--------|-------|
| `start-emulator.ps1` | ⭐ **Khuyến nghị** - Device Emulator với nhiều thiết bị |
| `start-website.ps1` | Tự động khởi động server và mở mobile view |
| `open-mobile-devtools.ps1` | Mở mobile view với DevTools |
| `open-mobile-simple.ps1` | Mở mobile view với cửa sổ nhỏ |
| `open-both-views.ps1` | Mở cả desktop và mobile |

---

## 📚 Hướng Dẫn Chi Tiết

**📖 Xem file hướng dẫn đầy đủ:** [`HUONG_DAN_CHAY_UNG_DUNG.md`](HUONG_DAN_CHAY_UNG_DUNG.md)

File này bao gồm:
- ✅ Hướng dẫn từng bước chi tiết
- ✅ Giải thích các tính năng Device Emulator
- ✅ Xử lý sự cố (Troubleshooting)
- ✅ Mẹo sử dụng hiệu quả
- ✅ Checklist trước khi chạy

---

## 🛑 Dừng Server

Nhấn `Ctrl + C` trong terminal đang chạy server.

---

## 🎓 Cụ Thể Là Chương Trình Sẽ Hướng Dẫn Bạn Học Gì?

*(Phần này sẽ được bổ sung chi tiết về nội dung khóa học)*

---

## 🔐 Những Nền Tảng Bạn Sẽ Kết Nối Và Bảo Mật?

### 🤖 N8n - Mã Nguồn Mở Miễn Phí
**N8n** là nền tảng automation mã nguồn mở hoàn toàn **MIỄN PHÍ**. Khi đăng ký, các bạn sẽ nhận được:
- ✅ Các workflow có sẵn để ứng dụng ngay vào công việc
- ✅ Phương pháp học: **"Cứ ứng dụng vào công việc đi, vướng thì gỡ"**
- ✅ Học qua thực hành thực tế, không lý thuyết suông

### 📘 API Facebook - Chính Thống 100%
**API của Facebook** được cung cấp trực tiếp từ Facebook:
- ✅ **Chính thống của Facebook** cung cấp - không phải tool lạ
- ✅ **Không đi theo con đường tà đạo** - An toàn tuyệt đối
- ✅ Có hướng dẫn chi tiết cách lấy API
- ✅ Facebook cung cấp **HOÀN TOÀN MIỄN PHÍ**
- 💡 Mọi người yên tâm sử dụng nhé!

### 💬 Zalo Bot - Tài Khoản Cá Nhân
**Zalo Bot** được tạo từ chính tài khoản Zalo của bạn:
- ✅ Tạo từ **tài khoản Zalo cá nhân** của bạn
- ✅ Được **Zalo chính thống** cung cấp
- ✅ **100% MIỄN PHÍ**
- ✅ Bạn hoàn toàn kiểm soát

### 🛡️ Bảo Mật Tuyệt Đối
**Tất cả những gì bạn thiết lập đều thuộc về bạn:**
- ✅ Tài khoản **N8n** của bạn
- ✅ Tài khoản **Facebook Ads** của bạn
- ✅ Tài khoản **Zalo** của bạn
- ✅ Chúng tôi chỉ là bên **hướng dẫn**
- ✅ **Không có bên trung gian nào** - kể cả chúng tôi

### 🎯 Tóm Lại
Khi bạn tham gia chương trình, bạn sẽ:
- 🏆 **Sở hữu hoàn toàn** ứng dụng automation
- 🔒 **Bảo mật tuyệt đối** - tất cả là tài khoản của bạn
- ✅ Sử dụng các ứng dụng **chính thống** từ Facebook, Zalo, N8n
- 🚫 **Không qua bất kỳ nền tảng trung gian nào** - thậm chí cả chúng tôi
- 😊 **Hoàn toàn yên tâm** về an toàn tài khoản quảng cáo

---

**Happy Coding! 🚀**

