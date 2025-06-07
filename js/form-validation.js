document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
});

function initializeFormValidation() {
    setupLoginForm();
    setupRegisterForm();
    setupContactForm();
    setupPasswordToggles();
    setupPasswordStrength();
}

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            let isValid = true;
            
            // Validar email
            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido.');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validar senha
            if (password.value.trim() === '') {
                showError(password, 'Por favor, insira sua senha.');
                isValid = false;
            } else {
                clearError(password);
            }
            
            if (isValid) {
                simulateLogin(email.value);
            }
        });
    }
}

function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName');
            const email = document.getElementById('registerEmail');
            const password = document.getElementById('registerPassword');
            const confirmPassword = document.getElementById('registerConfirmPassword');
            const terms = document.getElementById('registerTerms');
            let isValid = true;
            
            // Validar nome
            if (name.value.trim() === '') {
                showError(name, 'Por favor, insira seu nome completo.');
                isValid = false;
            } else {
                clearError(name);
            }
            
            // Validar email
            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido.');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validar senha
            if (password.value.trim() === '') {
                showError(password, 'Por favor, insira uma senha.');
                isValid = false;
            } else if (password.value.length < 8) {
                showError(password, 'A senha deve ter pelo menos 8 caracteres.');
                isValid = false;
            } else {
                clearError(password);
            }
            
            // Validar confirmação de senha
            if (confirmPassword.value.trim() === '') {
                showError(confirmPassword, 'Por favor, confirme sua senha.');
                isValid = false;
            } else if (confirmPassword.value !== password.value) {
                showError(confirmPassword, 'As senhas não coincidem.');
                isValid = false;
            } else {
                clearError(confirmPassword);
            }
            
            // Validar termos
            if (terms && !terms.checked) {
                showError(terms, 'Você deve aceitar os termos e condições.');
                isValid = false;
            } else if (terms) {
                clearError(terms);
            }
            
            if (isValid) {
                simulateRegistration(name.value, email.value);
            }
        });
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName');
            const email = document.getElementById('contactEmail');
            const subject = document.getElementById('contactSubject');
            const message = document.getElementById('contactMessage');
            let isValid = true;
            
            // Validar nome
            if (name.value.trim() === '') {
                showError(name, 'Por favor, insira seu nome.');
                isValid = false;
            } else {
                clearError(name);
            }
            
            // Validar email
            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido.');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validar assunto
            if (subject.value.trim() === '') {
                showError(subject, 'Por favor, insira um assunto.');
                isValid = false;
            } else {
                clearError(subject);
            }
            
            // Validar mensagem
            if (message.value.trim() === '') {
                showError(message, 'Por favor, insira sua mensagem.');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                simulateContactSubmission(name.value, email.value, subject.value);
            }
        });
    }
}

function setupPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle-btn');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

function setupPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    const strengthBar = document.querySelector('.password-strength-bar-inner');
    const strengthText = document.querySelector('.password-strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updatePasswordStrength(strength, strengthBar, strengthText);
        });
    }
}

function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let strength = 0;
    
    // Comprimento
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexidade
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 4);
}

function updatePasswordStrength(strength, strengthBar, strengthText) {
    const strengthClass = [
        '',
        'password-strength-weak',
        'password-strength-medium',
        'password-strength-good',
        'password-strength-strong'
    ][strength];
    
    const strengthLabels = [
        'Insira uma senha',
        'Fraca',
        'Média',
        'Boa',
        'Forte'
    ];
    
    // Remover classes anteriores
    strengthBar.parentElement.className = 'password-strength-bar';
    
    // Adicionar nova classe
    if (strengthClass) {
        strengthBar.parentElement.classList.add(strengthClass);
    }
    
    // Atualizar texto
    strengthText.textContent = strengthLabels[strength];
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error') || document.createElement('div');
    
    input.classList.add('error');
    
    if (!formGroup.querySelector('.form-error')) {
        errorElement.className = 'form-error';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    input.classList.remove('error');
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function simulateLogin(email) {
    showNotification(`Login simulado realizado com sucesso para ${email}!`, 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function simulateRegistration(name, email) {
    showNotification(`Cadastro simulado realizado com sucesso para ${name}!`, 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function simulateContactSubmission(name, email, subject) {
    showNotification(`Mensagem enviada com sucesso! Entraremos em contato em breve.`, 'success');
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
}

