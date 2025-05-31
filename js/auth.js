document.addEventListener('DOMContentLoaded', function() {
    console.log('视频网站 auth.js loaded');

    // Login Form Logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = loginForm.username.value.trim();
            const password = loginForm.password.value.trim();
            const messageElem = document.getElementById('loginMessage');

            if (!username || !password) {
                messageElem.textContent = '用户名和密码不能为空!';
                messageElem.style.color = 'red';
                return;
            }

            // Mock login: In a real app, this would be an API call.
            if (username === 'testuser' && password === 'password123') {
                messageElem.textContent = '登录成功! 跳转中...';
                messageElem.style.color = 'green';
                localStorage.setItem('mockUserToken', 'fakeToken12345'); // Simulate session token
                localStorage.setItem('username', username);
                setTimeout(() => {
                    window.location.href = '../index.html'; // Or profile page: 'profile.html'
                }, 1500);
            } else {
                messageElem.textContent = '用户名或密码错误!';
                messageElem.style.color = 'red';
            }
        });
    }

    // Registration Form Logic
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = registerForm.username.value.trim();
            const email = registerForm.email.value.trim();
            const password = registerForm.password.value.trim();
            const confirmPassword = registerForm.confirmPassword.value.trim();
            const messageElem = document.getElementById('registerMessage');

            if (!username || !email || !password || !confirmPassword) {
                messageElem.textContent = '所有字段均为必填项!';
                messageElem.style.color = 'red';
                return;
            }

            if (password !== confirmPassword) {
                messageElem.textContent = '两次输入的密码不匹配!';
                messageElem.style.color = 'red';
                return;
            }

            // Basic email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                messageElem.textContent = '请输入有效的邮箱地址!';
                messageElem.style.color = 'red';
                return;
            }

            // Mock registration
            console.log('注册信息:', { username, email, password });
            messageElem.textContent = '注册成功! 请登录.';
            messageElem.style.color = 'green';
            // In a real app, you might store user data or redirect to login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});
