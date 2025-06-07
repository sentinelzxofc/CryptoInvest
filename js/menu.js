document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
});

function initializeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navButtons = document.querySelector('.nav-buttons');
    const header = document.querySelector('.header');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            toggleMenu();
        });
    }
    
    document.addEventListener('click', function(event) {
        if (navList && navList.classList.contains('active') && 
            !event.target.closest('.nav') && 
            !event.target.closest('.hamburger')) {
            closeMenu();
        }
    });
    
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            
            if (scrollTop > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    function toggleMenu() {
        navList.classList.toggle('active');
        
        if (navButtons) {
            navButtons.classList.toggle('active');
        }
        
        const spans = hamburger.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    }
    
    function closeMenu() {
        navList.classList.remove('active');
        if (navButtons) {
            navButtons.classList.remove('active');
        }
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        document.body.style.overflow = '';
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    closeMenu();
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, href);
                }
            } else if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
                if (href.startsWith('./pages/') || href.startsWith('/pages/')) {
                    closeMenu();
                }
            }
        });
    });
    
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (currentPath.endsWith(href) || 
            (currentPath.endsWith('/') && href === 'index.html') || 
            (currentPath.endsWith('index.html') && href === './index.html')) {
            link.classList.add('active');
        } else if (href.startsWith('#') && currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
            const sections = document.querySelectorAll('section[id]');
            
            if (sections.length) {
                window.addEventListener('scroll', () => {
                    let current = '';
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.clientHeight;
                        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                            current = section.getAttribute('id');
                        }
                    });
                    
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                        if (navLink.getAttribute('href') === `#${current}`) {
                            navLink.classList.add('active');
                        }
                    });
                });
            }
        }
    });
}

