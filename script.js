document.addEventListener('DOMContentLoaded', () => {

    // 1. QUẢN LÝ DỮ LIỆU TÀI KHOẢN BẰNG JSON LOCALSTORAGE & ADMIN
    function initUserDatabase() {
        if (!localStorage.getItem('users_data')) {
            const defaultAccounts = [
                {
                    username: "ps48917",
                    password: "19112007",
                    fullname: "Trần Hoàng Nam",
                    email: "nt5487758@gmail.com",
                    phone: "0903773410",
                    role: "admin",
                    createdAt: new Date().toLocaleString('vi-VN')
                }
            ];
            // Lưu mảng thành chuỗi JSON
            localStorage.setItem('users_data', JSON.stringify(defaultAccounts, null, 2));
        }
    }
    initUserDatabase();

    // Xử lý Form Đăng Ký (Thêm tài khoản mới vào JSON LocalStorage)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullname = document.getElementById('regFullname');
            const email = document.getElementById('regEmail');
            const username = document.getElementById('regUsername');
            const phone = document.getElementById('regPhone');
            const pass = document.getElementById('regPassword');
            const confirmPass = document.getElementById('regConfirmPassword');
            const terms = document.getElementById('regTerms');
            let isValid = true;

            if (!fullname.value.trim()) { setError(fullname, 'Vui lòng nhập họ tên'); isValid = false; } else clearError(fullname);
            if (!validateEmail(email.value)) { setError(email, 'Email không hợp lệ'); isValid = false; } else clearError(email);
            if (!username.value.trim() || username.value.length < 4) { setError(username, 'Tên đăng nhập tối thiểu 4 ký tự'); isValid = false; } else clearError(username);
            if (!pass.value || pass.value.length < 6) { setError(pass, 'Mật khẩu phải từ 6 ký tự'); isValid = false; } else clearError(pass);
            if (confirmPass.value !== pass.value) { setError(confirmPass, 'Mật khẩu xác nhận không khớp'); isValid = false; } else clearError(confirmPass);
            if (terms && !terms.checked) { showToast('Bạn chưa đồng ý với Điều khoản dịch vụ!'); isValid = false; }

            if (isValid) {
                let usersList = JSON.parse(localStorage.getItem('users_data')) || [];

                // Kiểm tra trùng lặp
                const isDuplicate = usersList.some(u => 
                    u.username.toLowerCase() === username.value.trim().toLowerCase() || 
                    u.email.toLowerCase() === email.value.trim().toLowerCase()
                );

                if (isDuplicate) {
                    setError(username, 'Tên đăng nhập hoặc Email đã tồn tại!');
                    showToast('Tên đăng nhập hoặc Email đã tồn tại!');
                    return;
                }

                // Đối tượng người dùng mới
                const newUser = {
                    username: username.value.trim(),
                    password: pass.value,
                    fullname: fullname.value.trim(),
                    email: email.value.trim(),
                    phone: phone ? phone.value.trim() : '',
                    role: "user",
                    createdAt: new Date().toLocaleString('vi-VN')
                };

                // Lưu dữ liệu nối tiếp vào JSON LocalStorage
                usersList.push(newUser);
                localStorage.setItem('users_data', JSON.stringify(usersList, null, 2));

                showToast('Đăng ký thành công! Dữ liệu đã lưu vào JSON local.');
                setTimeout(() => window.location.href = 'login.html', 1500);
            }
        });
    }

    // Xử lý Form Đăng Nhập (Đọc và đối chiếu từ JSON LocalStorage)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('loginUsername');
            const passwordInput = document.getElementById('loginPassword');
            let isValid = true;

            if (!usernameInput.value.trim()) { setError(usernameInput, 'Vui lòng nhập Tên đăng nhập hoặc Email'); isValid = false; } else clearError(usernameInput);
            if (!passwordInput.value) { setError(passwordInput, 'Vui lòng nhập Mật khẩu'); isValid = false; } else clearError(passwordInput);

            if (isValid) {
                const inputVal = usernameInput.value.trim().toLowerCase();
                const passVal = passwordInput.value;

                const usersList = JSON.parse(localStorage.getItem('users_data')) || [];

                // Quét tìm người dùng phù hợp trong mảng JSON
                const matchedUser = usersList.find(u => 
                    (u.username.toLowerCase() === inputVal || u.email.toLowerCase() === inputVal) && 
                    u.password === passVal
                );

                if (matchedUser) {
                    localStorage.setItem('currentUser', JSON.stringify(matchedUser));

                    if (matchedUser.role === 'admin') {
                        showToast(`Xin chào Admin ${matchedUser.fullname}! Đăng nhập thành công.`);
                    } else {
                        showToast(`Đăng nhập thành công! Chào mừng ${matchedUser.fullname}.`);
                    }

                    setTimeout(() => window.location.href = 'index.html', 1500);
                } else {
                    setError(passwordInput, 'Tài khoản hoặc mật khẩu không chính xác!');
                    showToast('Sai Tên đăng nhập hoặc Mật khẩu!');
                }
            }
        });
    }

    // 2. PARTICLE BACKGROUND CANVAS
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 45;
        let mouse = { x: null, y: null, radius: 100 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    this.x -= dx / 12;
                    this.y -= dy / 12;
                }
            }

            draw() {
                ctx.fillStyle = '#94a3b8';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 - dist / 1100})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        animateParticles();
    }

    // 3. SLIDESHOW
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('dotsContainer');
    const timerBar = document.getElementById('timerBar');

    if (slides.length > 0 && prevBtn && nextBtn && dotsContainer && timerBar) {
        let currentSlide = 0;
        let slideInterval = null;
        const slideDuration = 5000;

        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlides() {
            slides.forEach((s, idx) => {
                s.classList.toggle('active', idx === currentSlide);
                if (dots[idx]) dots[idx].classList.toggle('active', idx === currentSlide);
            });
            resetTimerBar();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        function resetTimerBar() {
            timerBar.style.transition = 'none';
            timerBar.style.width = '0%';
            setTimeout(() => {
                timerBar.style.transition = `width ${slideDuration}ms linear`;
                timerBar.style.width = '100%';
            }, 50);
        }

        function startAutoSlide() {
            stopAutoSlide();
            resetTimerBar();
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        function stopAutoSlide() {
            if (slideInterval) clearInterval(slideInterval);
        }

        nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
        prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

        startAutoSlide();
    }

    // 4. COUNTER & SEARCH & LIGHTBOX
    const counters = document.querySelectorAll('.counter');
    let animatedCounters = false;

    if (counters.length > 0) {
        window.addEventListener('scroll', () => {
            const statsSection = document.querySelector('.stats-section');
            if (!statsSection) return;
            const pos = statsSection.getBoundingClientRect().top;
            if (pos < window.innerHeight && !animatedCounters) {
                animatedCounters = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const speed = target / 80;
                    const updateCount = () => {
                        count += speed;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 25);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }

    // Search Filter Table
    const searchInput = document.getElementById('tableSearchInput');
    const tableRows = document.querySelectorAll('#hardwareTable tbody tr');

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            tableRows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(term) ? '' : 'none';
            });
        });
    }

    // Gallery Filter & Lightbox
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const src = e.target.getAttribute('data-src');
            const caption = e.target.getAttribute('data-caption');
            if (lightboxImg) lightboxImg.src = src;
            if (lightboxCaption) lightboxCaption.innerText = caption;
            if (lightboxModal) lightboxModal.classList.add('active');
        });
    });

    if (lightboxClose && lightboxModal) {
        lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('active'));
    }

    // 5. OTHER UTILITIES (Booking, FAQ, Password, Chat, Theme)
    // Booking Form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const zone = document.getElementById('zoneSelect');

            if (name && !name.value.trim()) { setError(name, 'Vui lòng nhập họ tên'); isValid = false; } else if (name) clearError(name);
            if (email && !validateEmail(email.value)) { setError(email, 'Email không hợp lệ'); isValid = false; } else if (email) clearError(email);
            if (phone && !phone.value.match(/^[0-9]{10,11}$/)) { setError(phone, 'SĐT phải gồm 10-11 số'); isValid = false; } else if (phone) clearError(phone);
            if (zone && !zone.value) { setError(zone, 'Vui lòng chọn khu vực'); isValid = false; } else if (zone) clearError(zone);

            if (isValid) {
                showToast('🎉 Đặt chỗ thành công! FPOLY sẽ liên hệ sớm nhất.');
                bookingForm.reset();
            }
        });
    }

    // FAQ Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Toggle Password
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', () => {
            const input = icon.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Helper functions
    function setError(input, message) {
        const parent = input.parentElement;
        const err = parent.querySelector('.error-msg');
        if (err) err.innerText = message;
        input.style.borderColor = '#ef4444';
    }

    function clearError(input) {
        const parent = input.parentElement;
        const err = parent.querySelector('.error-msg');
        if (err) err.innerText = '';
        input.style.borderColor = '#10b981';
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showToast(message) {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:#2563eb"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => toast.remove(), 4000);
    }

    // Chat Widget
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatBody = document.getElementById('chatBody');

    if (chatToggle && chatWindow && chatClose) {
        chatToggle.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
        chatClose.addEventListener('click', () => chatWindow.classList.add('hidden'));

        function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            appendMessage(text, 'user');
            chatInput.value = '';

            setTimeout(() => {
                let botReply = 'Cảm ơn bạn đã liên hệ! Bộ phận CSKH sẽ phản hồi bạn trong giây lát.';
                if (text.toLowerCase().includes('giá')) {
                    botReply = 'Bảng giá niêm yết từ 12.000đ/h đến 50.000đ/h tùy khu vực máy.';
                } else if (text.toLowerCase().includes('máy') || text.toLowerCase().includes('cấu hình')) {
                    botReply = 'Máy trang bị CPU Intel Gen 14th, GPU RTX 4070 Super và Màn hình 240Hz.';
                }
                appendMessage(botReply, 'bot');
            }, 800);
        }

        if (chatSendBtn && chatInput) {
            chatSendBtn.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
        }
    }

    function appendMessage(msg, sender) {
        if (!chatBody) return;
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}`;
        div.innerHTML = `<p>${msg}</p>`;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Theme & Navigation
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.classList.add('active');
            else backToTop.classList.remove('active');
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});

// Hamf xuất file JSON
function exportUsersJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('users_data'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "users_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}