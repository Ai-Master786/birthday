document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const loginBtn = document.querySelector('.login-btn');
    const inputs = document.querySelectorAll('.input-group input');
    const loginBox = document.querySelector('.login-box');

    // Add ripple effect to login button
    loginBtn.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        loginBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // Add focus effects to input fields
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = inputs[0].value;
        const password = inputs[1].value;

        // Check credentials immediately
        if (username === 'chachi-hbd@1404.anu' && password === 'Whatever') {
            // Success case
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Welcome Back!';
            loginBtn.style.background = 'linear-gradient(45deg, #23d5ab, #23a6d5)';
            
            // Set login state and redirect
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            
            setTimeout(() => {
                window.location.replace('dashboard.html');
            }, 1000);
        } else {
            // Error case - show simple message
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                background: #ff6b6b;
                color: white;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 15px;
                text-align: center;
                font-weight: bold;
            `;
            errorDiv.textContent = 'Invalid username or password!';
            
            // Remove any existing error message
            const existingError = loginForm.querySelector('div[style*="background: #ff6b6b"]');
            if (existingError) {
                existingError.remove();
            }
            
            // Add error message at the top of the form
            loginForm.insertBefore(errorDiv, loginForm.firstChild);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                errorDiv.remove();
                inputs[0].value = '';
                inputs[1].value = '';
            }, 2000);
        }
    });

    // Add typing animation to inputs
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value) {
                input.style.borderColor = '#e73c7e';
                input.style.boxShadow = '0 0 15px rgba(231, 60, 126, 0.2)';
            } else {
                input.style.borderColor = '#ddd';
                input.style.boxShadow = 'none';
            }
        });
    });

    // Add hover effect to the login box
    loginBox.addEventListener('mousemove', (e) => {
        const rect = loginBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        loginBox.style.setProperty('--x', `${x}px`);
        loginBox.style.setProperty('--y', `${y}px`);
    });

    // Add checkbox animation
    const checkbox = loginForm.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkbox.parentElement.style.color = '#e73c7e';
            checkbox.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                checkbox.parentElement.style.transform = 'scale(1)';
            }, 200);
        } else {
            checkbox.parentElement.style.color = '#666';
        }
    });
}); 