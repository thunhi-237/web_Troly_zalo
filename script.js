// Xử lý form đăng ký
document.addEventListener('DOMContentLoaded', function() {
    // Chỉ chạy code này trên trang có form đăng ký (index.html)
    // Tránh lỗi khi load trên trang thanh toán (thanhtoan1.html)
    const form = document.getElementById('registrationForm');
    
    if (form) {
        console.log('✅ Form đăng ký được tìm thấy, khởi tạo event listener...');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            // Validate
            if (!name || !email || !phone) {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Email không hợp lệ!', 'error');
                return;
            }
            
            // Validate phone
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showNotification('Số điện thoại không hợp lệ!', 'error');
                return;
            }
            
            // Hiển thị thông báo đang xử lý
            showNotification('Đang xử lý đăng ký...', 'info');
            
            // Mã chuyển khoản cố định
            const paymentCode = 'TDHCV343';
            
            // Kiểm tra xem đã cấu hình EmailJS chưa
            const isEmailJSConfigured = typeof EMAILJS_CONFIG !== 'undefined' && 
                                       EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
                                       EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
                                       EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';
            
            // Hàm gửi email
            function sendEmailNotification() {
                // Kiểm tra EmailJS library có được load không
                if (typeof emailjs === 'undefined') {
                    console.error('❌ EmailJS library chưa được load! Kiểm tra lại script tag trong index.html');
                    return Promise.reject(new Error('EmailJS library not loaded'));
                }
                
                if (!isEmailJSConfigured) {
                    console.warn('⚠️ EmailJS chưa được cấu hình. Vui lòng xem file HUONG_DAN_EMAILJS.md');
                    console.warn('Config:', EMAILJS_CONFIG);
                    return Promise.resolve({ success: false, message: 'EmailJS not configured' });
                }
                
                // Kiểm tra config có đầy đủ không
                if (!EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
                    console.error('❌ EmailJS config thiếu thông tin:', {
                        hasPublicKey: !!EMAILJS_CONFIG.PUBLIC_KEY,
                        hasServiceId: !!EMAILJS_CONFIG.SERVICE_ID,
                        hasTemplateId: !!EMAILJS_CONFIG.TEMPLATE_ID
                    });
                    return Promise.reject(new Error('EmailJS config incomplete'));
                }
                
                try {
                    // Khởi tạo EmailJS
                    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
                    console.log('✅ EmailJS initialized with Public Key:', EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 10) + '...');
                    
                    // Chuẩn bị dữ liệu email
                    const emailParams = {
                        to_email: EMAILJS_CONFIG.YOUR_EMAIL,
                        to_name: EMAILJS_CONFIG.YOUR_NAME,
                        from_name: name,
                        from_email: email,
                        phone: phone,
                        payment_code: paymentCode,
                        amount: '1,420,000 VNĐ',
                        course_name: 'Khóa Tự Động Hóa Facebook Ads',
                        date: new Date().toLocaleString('vi-VN')
                    };
                    
                    console.log('📧 Đang gửi email đến:', EMAILJS_CONFIG.YOUR_EMAIL);
                    console.log('📋 Email params:', emailParams);
                    
                    // Gửi email với error handling
                    return emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID, 
                        EMAILJS_CONFIG.TEMPLATE_ID, 
                        emailParams
                    )
                    .then(function(response) {
                        console.log('✅ Email gửi thành công!', response);
                        console.log('📧 Email đã được gửi đến:', EMAILJS_CONFIG.YOUR_EMAIL);
                        return { success: true, response: response };
                    })
                    .catch(function(error) {
                        console.error('❌ Lỗi gửi email:', error);
                        console.error('Chi tiết lỗi:', {
                            status: error.status,
                            text: error.text,
                            message: error.message
                        });
                        
                        // Thông báo lỗi cụ thể
                        let errorMessage = 'Không thể gửi email. ';
                        if (error.status === 400) {
                            errorMessage += 'Lỗi cấu hình (400). Kiểm tra lại Service ID và Template ID.';
                        } else if (error.status === 401) {
                            errorMessage += 'Lỗi xác thực (401). Kiểm tra lại Public Key.';
                        } else if (error.status === 429) {
                            errorMessage += 'Đã hết quota (429). EmailJS miễn phí chỉ 200 emails/tháng.';
                        } else {
                            errorMessage += `Lỗi: ${error.text || error.message}`;
                        }
                        
                        console.error('💡 Gợi ý khắc phục:', errorMessage);
                        return { success: false, error: error, message: errorMessage };
                    });
                } catch (error) {
                    console.error('❌ Lỗi khi khởi tạo EmailJS:', error);
                    return Promise.reject(error);
                }
            }
            
            // Hàm gửi thông báo đến Zalo Bot qua n8n
            function sendZaloNotification() {
                // Kiểm tra xem có bật thông báo Zalo không
                const isZaloEnabled = typeof N8N_CONFIG !== 'undefined' && 
                                     N8N_CONFIG.ZALO_NOTIFICATION_ENABLED === true;
                
                if (!isZaloEnabled) {
                    console.info('Zalo notification is disabled in config');
                    return Promise.resolve({ success: true, message: 'Zalo notification disabled' });
                }
                
                // Lấy webhook URL từ config
                const webhookURL = typeof N8N_CONFIG !== 'undefined' 
                    ? N8N_CONFIG.WEBHOOK_URL 
                    : 'https://anhlaptrinhpyan.app.n8n.cloud/webhook/registration-notification';
                
                // Chuẩn bị dữ liệu gửi đến n8n
                const notificationData = {
                    name: name,
                    email: email,
                    phone: phone,
                    payment_code: paymentCode,
                    amount: '1,450,000 VNĐ',
                    course_name: 'Khóa Tự Động Hóa Facebook Ads',
                    date: new Date().toLocaleString('vi-VN')
                };
                
                // Timeout handler
                const timeout = typeof N8N_CONFIG !== 'undefined' 
                    ? N8N_CONFIG.TIMEOUT 
                    : 10000;
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);
                
                // Gửi request đến n8n webhook
                return fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(notificationData),
                    signal: controller.signal
                })
                .then(response => {
                    clearTimeout(timeoutId);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Zalo notification sent successfully:', data);
                    return data;
                })
                .catch(error => {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        console.warn('Zalo notification timeout');
                    } else {
                        console.warn('Zalo notification failed:', error);
                    }
                    // Không throw error để không ảnh hưởng đến flow chính
                    return { success: false, error: error.message };
                });
            }
            
            // Gửi cả email và Zalo notification song song
            Promise.allSettled([
                sendEmailNotification(),
                sendZaloNotification()
            ])
                .then(function(results) {
                    const [emailResult, zaloResult] = results;
                    
                    // Xử lý kết quả email
                    if (emailResult.status === 'fulfilled') {
                        if (emailResult.value && emailResult.value.success) {
                            console.log('✅ Email gửi thành công:', emailResult.value);
                        } else {
                            console.warn('⚠️ Email không gửi được:', emailResult.value);
                            if (emailResult.value && emailResult.value.message) {
                                console.warn('Lý do:', emailResult.value.message);
                            }
                        }
                    } else {
                        console.error('❌ Email gửi thất bại:', emailResult.reason);
                    }
                    
                    // Xử lý kết quả Zalo
                    if (zaloResult.status === 'fulfilled') {
                        if (zaloResult.value && zaloResult.value.success !== false) {
                            console.log('✅ Zalo notification gửi thành công:', zaloResult.value);
                        } else {
                            console.warn('⚠️ Zalo notification không gửi được:', zaloResult.value);
                        }
                    } else {
                        console.error('❌ Zalo notification thất bại:', zaloResult.reason);
                    }
                    
                    // Hiển thị thông báo phù hợp
                    const emailSuccess = emailResult.status === 'fulfilled' && 
                                       emailResult.value && 
                                       emailResult.value.success === true;
                    const zaloSuccess = zaloResult.status === 'fulfilled' && 
                                      zaloResult.value && 
                                      zaloResult.value.success !== false;
                    
                    if (emailSuccess && zaloSuccess) {
                        showNotification('Đăng ký thành công! Email và Zalo đã được gửi.', 'success');
                    } else if (emailSuccess) {
                        showNotification('Đăng ký thành công! Email đã được gửi. (Zalo có thể chưa gửi được)', 'success');
                    } else if (zaloSuccess) {
                        showNotification('Đăng ký thành công! Zalo đã được gửi. (Email có thể chưa gửi được)', 'info');
                    } else {
                        showNotification('Đăng ký thành công! (Email và Zalo có thể chưa gửi được - vui lòng kiểm tra console)', 'info');
                    }
                    
                    // Chuyển đến trang thanh toán sau khi gửi thành công
                    setTimeout(() => {
                        const params = new URLSearchParams({
                            name: name,
                            email: email,
                            phone: phone,
                            code: paymentCode
                        });
                        window.location.href = 'thanhtoan.html?' + params.toString();
                    }, 1500);
                });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.benefit-card, .content-item, .audience-item, .bonus-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Set color based on type
    let bgColor = '#27ae60'; // success
    if (type === 'error') bgColor = '#e74c3c';
    if (type === 'info') bgColor = '#3498db';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 16px;
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Format phone number on input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            e.target.value = value;
        });
    }
});

// Add floating CTA button
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.createElement('a');
    floatingBtn.href = '#register';
    floatingBtn.className = 'floating-cta';
    floatingBtn.textContent = 'ĐĂNG KÝ NGAY';
    floatingBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #27ae60;
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0 5px 20px rgba(39, 174, 96, 0.4);
        z-index: 999;
        transition: all 0.3s;
        animation: pulseScale 1.5s ease-in-out infinite;
    `;
    
    floatingBtn.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.15)';
        this.style.boxShadow = '0 8px 25px rgba(39, 174, 96, 0.6)';
    });
    
    floatingBtn.addEventListener('mouseleave', function() {
        this.style.animation = 'pulseScale 1.5s ease-in-out infinite';
        this.style.boxShadow = '0 5px 20px rgba(39, 174, 96, 0.4)';
    });
    
    document.body.appendChild(floatingBtn);
    
    // Add pulse and scale animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulseScale {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 5px 20px rgba(39, 174, 96, 0.4);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 8px 30px rgba(39, 174, 96, 0.8);
            }
        }
    `;
    document.head.appendChild(pulseStyle);
    
    // Button luôn hiển thị, không ẩn khi scroll
    floatingBtn.style.opacity = '1';
    floatingBtn.style.transform = 'translateY(0)';
});

// Auto Mobile View Detection
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const mobileMode = urlParams.get('mobile') === '1';
    
    // Kiểm tra kích thước màn hình
    const isMobileSize = window.innerWidth <= 768;
    
    if (mobileMode || isMobileSize) {
        // Thêm class mobile vào body và html
        document.body.classList.add('force-mobile-view');
        document.documentElement.classList.add('force-mobile-view');
        
        // Force viewport mobile
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.setAttribute('content', 'width=375, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        
        // Force body width
        document.body.style.maxWidth = '100vw';
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.maxWidth = '100vw';
        document.documentElement.style.overflowX = 'hidden';
        
        // Thêm style để force mobile layout
        const mobileStyle = document.createElement('style');
        mobileStyle.id = 'force-mobile-style';
        mobileStyle.textContent = `
            body.force-mobile-view {
                max-width: 100vw !important;
                overflow-x: hidden !important;
            }
            html.force-mobile-view {
                max-width: 100vw !important;
                overflow-x: hidden !important;
            }
            body.force-mobile-view .container {
                max-width: 100% !important;
                width: 100% !important;
            }
        `;
        document.head.appendChild(mobileStyle);
        
        console.log('📱 Mobile view activated!', {
            mobileMode: mobileMode,
            isMobileSize: isMobileSize,
            windowWidth: window.innerWidth
        });
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Đóng menu khi click vào link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Đóng menu khi click ra ngoài
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Đóng menu khi resize window (nếu mở trên desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
