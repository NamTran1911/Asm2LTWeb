# FPOLY STUDIO - Cyber Game & Esports Lounge Web Application

## Giới thiệu
Dự án website dành cho mô hình Cyber Game cao cấp (FPOLY STUDIO), được phát triển trong khuôn khổ môn học **Xây dựng trang web** tại **Trường Cao đẳng FPT Polytechnic**. 

Ứng dụng cung cấp giao diện giới thiệu dịch vụ, bảng giá cấu hình máy, hệ thống thư viện hình ảnh, tính năng đặt máy trước, tích hợp chatbot tư vấn và quản lý tài khoản hội viên lưu trữ trực tiếp trên LocalStorage.

---

## Thông tin sinh viên
- **Họ và tên**: Trần Hoàng Nam
- **Mã sinh viên**: PS48917
- **Đơn vị**: Trường Cao đẳng FPT Polytechnic

---

## Công nghệ sử dụng
- **Frontend**: HTML5, CSS3 (Flexbox, CSS Grid, Custom Properties, Media Queries)
- **Scripting**: JavaScript (ES6+)
- **Canvas API**: Render hiệu ứng hạt (Particle Canvas Background)
- **Data Persistence**: LocalStorage API (Mock Database dưới dạng JSON)
- **Libraries**: FontAwesome v6.4.0 (Icons), Google Fonts (Plus Jakarta Sans)

---

## Cấu trúc thư mục dự án

```text
.
├── index.html          # Trang chủ (Slide, Thống kê, Bảng giá, Thư viện ảnh, FAQ, Chatbot)
├── about.html          # Trang giới thiệu giá trị & dịch vụ
├── contact.html        # Trang liên hệ & Đặt máy trước
├── login.html          # Trang đăng nhập tài khoản hội viên / Admin
├── register.html       # Trang đăng ký tài khoản hội viên
├── style.css           # File stylesheet tổng hợp (Biến CSS, Reset, Theme, Components)
├── script.js           # File xử lý logic JS (Xử lý DOM, Canvas, LocalStorage, Validation)
├── logo.ico            # Favicon & Logo dự án
└── images/             # Thư mục tài nguyên hình ảnh
    ├── gaming room.webp
    ├── gaming room 2.webp
    └── gaming room 3.webp
```

---

## Tính năng chính

### 1. Giao diện & Trải nghiệm người dùng (UI/UX)
- **Chế độ Sáng / Tối (Dark / Light Theme)**: Chuyển đổi linh hoạt thông qua thuộc tính `data-theme` trên thẻ `<html>` và lưu trạng thái.
- **Particle Canvas**: Hiệu ứng các hạt tương tác với con trỏ chuột được vẽ bằng HTML5 Canvas 2D Context.
- **Responsive Web Design**: Tối ưu hiển thị cho các kích thước màn hình Mobile, Tablet và Desktop.

### 2. Trang chủ & Luồng dịch vụ
- **Hero Slider**: Trình chiếu ảnh tự động có thanh đếm thời gian (Timer Bar), hỗ trợ chuyển slide thủ công và tương tác mượt mà.
- **Counter Animation**: Số liệu thống kê tăng dần tự động khi cuộn màn hình tới section tương ứng.
- **Bảng cấu hình & Tìm kiếm thời gian thực**: Tìm kiếm cấu hình máy (CPU, VGA, RAM, Đơn giá) bằng thuật toán lọc text trực tiếp trên DOM.
- **Thư viện ảnh với Filter & Lightbox**: Phân loại danh mục hình ảnh (Khu vực máy, Giải đấu, F&B) và xem ảnh phóng to full screen qua Lightbox Modal.
- **Accordion FAQ**: Hệ thống câu hỏi thường gặp đóng/mở linh hoạt.
- **Chatbot Widget**: Cửa sổ trò chuyện tự động phản hồi theo từ khóa liên quan đến giá dịch vụ và cấu hình máy.

### 3. Đặt chỗ & Liên hệ
- **Form đặt máy trước**: Kiểm tra ràng buộc dữ liệu đầu vào (Validation) như Họ tên, Email, Số điện thoại và Khu vực máy. Hiển thị thông báo Toast Notification khi thành công.

### 4. Hệ thống Xác thực & Quản lý Tài khoản (Auth System)
- **Cơ sở dữ liệu LocalStorage**: Dữ liệu tài khoản được khởi tạo và quản lý dưới dạng mảng JSON lưu trong `localStorage` với key `users_data`.
- **Đăng ký tài khoản**: Kiểm tra trùng lặp `username` và `email`, mã hóa dữ liệu vào JSON local.
- **Đăng nhập hệ thống**: Đối chiếu thông tin đăng nhập với dữ liệu lưu trữ, phân quyền `user` và `admin`.
- **Hỗ trợ hàm Export JSON**: Hàm `exportUsersJSON()` sẵn sàng cho việc trích xuất danh sách tài khoản ra file `.json`.

---

## Tài khoản thử nghiệm

Dự án tự động khởi tạo tài khoản Admin mặc định vào `localStorage` ở lần tải trang đầu tiên:

- **Username**: `ps48917`
- **Password**: `19112007`
- **Role**: `admin`
- **Tên hiển thị**: Trần Hoàng Nam

---

## Hướng dẫn cài đặt & Chạy ứng dụng

1. **Tải về hoặc Clone thư mục dự án**:
   ```bash
   git clone <repository-url>
   ```
2. **Mở dự án**:
   - Mở trực tiếp file `index.html` trên các trình duyệt web hiện đại (Chrome, Edge, Firefox, Safari).
   - Hoặc chạy qua môi trường máy chủ tĩnh như **Live Server** trên Visual Studio Code.

---

## Đánh giá mức độ đáp ứng yêu cầu (Assignment Requirement Compliance)

- **Y1 (Cơ bản HTML/CSS)**: Cấu trúc HTML5 chuẩn SEO/Semantics, định dạng văn bản, danh sách, bảng biểu, liên kết, form mẫu đầy đủ.
- **Y2 (CSS Nâng cao)**: Áp dụng CSS Variables, Box Model, Transition, Transform, Keyframes Animation.
- **Y3 (Bố cục & Triển khai)**: Tổ chức layout bằng CSS Grid và Flexbox thống nhất toàn hệ thống.
- **Y4 (Tích hợp & Responsive)**: Tích hợp Slideshow, Lightbox, Canvas API, Interactive Form Validation, Theme Switcher, Chatbot, tìm kiếm dữ liệu và tương thích responsive trên mọi thiết bị.
