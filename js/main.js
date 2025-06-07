document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupScrollAnimations();
    setupScrollSpy();
    initializeTheme();
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            if (navButtons) {
                navButtons.classList.toggle('active');
            }
            
            const spans = hamburger.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    document.addEventListener('click', function(event) {
        if (navList && navList.classList.contains('active') && 
            !event.target.closest('.nav') && 
            !event.target.closest('.hamburger')) {
            navList.classList.remove('active');
            if (navButtons) {
                navButtons.classList.remove('active');
            }
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

function setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    handleScrollAnimation();
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
}

function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme) {
            document.body.classList.toggle('dark-theme', currentTheme === 'dark');
            updateThemeToggle(currentTheme === 'dark');
        } else if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            updateThemeToggle(true);
        }
        
        themeToggle.addEventListener('click', function() {
            const isDarkMode = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            updateThemeToggle(isDarkMode);
        });
    }
}

function updateThemeToggle(isDarkMode) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (isDarkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

function formatCurrency(value, currency = 'USD', maximumFractionDigits = 2) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: maximumFractionDigits
    }).format(value);
}

function formatPercentage(value, maximumFractionDigits = 2) {
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: maximumFractionDigits
    }).format(value / 100);
    
    return value >= 0 ? `+${formattedValue}` : formattedValue;
}

function formatNumber(value, maximumFractionDigits = 2) {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: maximumFractionDigits
    }).format(value);
}

function formatCompactNumber(value) {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(value);
}

function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

