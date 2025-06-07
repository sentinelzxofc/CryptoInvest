document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
});

function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            updateThemeToggleIcon(currentTheme === 'dark');
        } else if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeToggleIcon(true);
        }
        
        themeToggle.addEventListener('click', function() {
            let theme = 'light';
            
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                theme = 'dark';
            }
            
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            updateThemeToggleIcon(theme === 'dark');
        });
    }
    
    applyThemeStyles();
}

function updateThemeToggleIcon(isDarkMode) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (isDarkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                themeToggle.setAttribute('title', 'Mudar para tema claro');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                themeToggle.setAttribute('title', 'Mudar para tema escuro');
            }
        }
    }
}

function applyThemeStyles() {
    const darkThemeStyles = `
        :root[data-theme="dark"] {
            --bg-primary: var(--color-gray-900);
            --bg-secondary: var(--color-gray-800);
            --bg-tertiary: var(--color-gray-700);
            --text-primary: var(--color-gray-100);
            --text-secondary: var(--color-gray-300);
            --text-tertiary: var(--color-gray-500);
            --border-color: var(--color-gray-700);
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = darkThemeStyles;
    document.head.appendChild(styleElement);
}

