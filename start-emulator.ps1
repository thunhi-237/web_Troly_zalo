# Script khởi động Device Emulator
# Chạy ứng dụng với giao diện mô phỏng nhiều thiết bị

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Device Emulator - Facebook Ads App" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Python
$pythonCheck = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCheck) {
    Write-Host "❌ Python không được tìm thấy!" -ForegroundColor Red
    Write-Host "Vui lòng cài đặt Python từ https://www.python.org/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Nhấn Enter để thoát"
    exit 1
}

Write-Host "✅ Python đã được tìm thấy" -ForegroundColor Green
Write-Host ""

# Kiểm tra port 8000
$portInUse = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠️  Port 8000 đang được sử dụng" -ForegroundColor Yellow
    Write-Host "Đang dừng process cũ..." -ForegroundColor Yellow
    
    try {
        $process = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | 
                   Select-Object -ExpandProperty OwningProcess -ErrorAction SilentlyContinue
        if ($process) {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
        }
    } catch {
        Write-Host "Không thể dừng process cũ, vui lòng thử lại" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🚀 Đang khởi động HTTP Server trên port 8000..." -ForegroundColor Cyan
Write-Host ""

# Khởi động server trong background
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    python -m http.server 8000
}

# Đợi server khởi động
Start-Sleep -Seconds 2

# Kiểm tra server đã chạy chưa
$serverRunning = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
if (-not $serverRunning) {
    Write-Host "❌ Không thể khởi động server!" -ForegroundColor Red
    Stop-Job $serverJob
    Remove-Job $serverJob
    Read-Host "Nhấn Enter để thoát"
    exit 1
}

Write-Host "✅ Server đã khởi động thành công!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Đang mở Device Emulator..." -ForegroundColor Cyan
Write-Host ""

# URL của emulator
$emulatorUrl = "http://localhost:8000/device-emulator.html"

# Tìm Chrome
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

$chromePath = $null
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromePath = $path
        break
    }
}

if ($chromePath) {
    # Mở Chrome với emulator
    Start-Process $chromePath -ArgumentList $emulatorUrl, "--new-window"
    Write-Host "✅ Đã mở Chrome với Device Emulator" -ForegroundColor Green
} else {
    # Mở bằng default browser
    Start-Process $emulatorUrl
    Write-Host "✅ Đã mở Device Emulator trong trình duyệt mặc định" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Hướng Dẫn Sử Dụng:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Chọn thiết bị:" -ForegroundColor White
Write-Host "   - Desktop: Xem giao diện desktop" -ForegroundColor Gray
Write-Host "   - iPhone 14 Pro Max: Mô phỏng iPhone lớn" -ForegroundColor Gray
Write-Host "   - iPhone 12 Pro: Mô phỏng iPhone tiêu chuẩn" -ForegroundColor Gray
Write-Host "   - iPhone SE: Mô phỏng iPhone nhỏ" -ForegroundColor Gray
Write-Host "   - Samsung Note: Mô phỏng Samsung lớn" -ForegroundColor Gray
Write-Host "   - Samsung S21: Mô phỏng Samsung tiêu chuẩn" -ForegroundColor Gray
Write-Host ""
Write-Host "⌨️  Phím tắt:" -ForegroundColor White
Write-Host "   - Ctrl+R: Làm mới trang" -ForegroundColor Gray
Write-Host "   - F11: Toàn màn hình" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Xem hướng dẫn chi tiết:" -ForegroundColor White
Write-Host "   File: HUONG_DAN_CHAY_UNG_DUNG.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🛑 Để dừng server:" -ForegroundColor White
Write-Host "   Nhấn Ctrl+C trong cửa sổ này" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Hiển thị log server
Write-Host "📊 Server Logs (Nhấn Ctrl+C để dừng):" -ForegroundColor Yellow
Write-Host ""

# Đợi và hiển thị output
try {
    Receive-Job $serverJob -Wait
} catch {
    Write-Host ""
    Write-Host "⚠️  Server đã dừng" -ForegroundColor Yellow
} finally {
    Stop-Job $serverJob -ErrorAction SilentlyContinue
    Remove-Job $serverJob -ErrorAction SilentlyContinue
    Write-Host ""
    Write-Host "✅ Đã dừng server" -ForegroundColor Green
}

