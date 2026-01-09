// File cấu hình EmailJS
// Đã được cấu hình sẵn

const EMAILJS_CONFIG = {
    // Public Key từ EmailJS Dashboard → Account → General
    PUBLIC_KEY: 'aeNVfuer5Cm_8uaOj',
    
    // Service ID từ EmailJS Dashboard → Email Services
    SERVICE_ID: 'service_h3u1yz7',
    
    // Template ID từ EmailJS Dashboard → Email Templates
    TEMPLATE_ID: 'template_e1qiu58',
    
    // Email của bạn để nhận thông báo
    YOUR_EMAIL: 'thunhi237@gmail.com',
    
    // Tên hiển thị trong email
    YOUR_NAME: 'nhile'
};

// Export để sử dụng trong script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}

