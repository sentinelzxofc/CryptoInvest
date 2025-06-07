document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
});

function initializeSmoothScroll() {
    // Selecionar todos os links que apontam para âncoras
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Adicionar evento de clique a cada link
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Obter o valor do atributo href
            const href = this.getAttribute('href');
            
            // Verificar se o href é uma âncora válida (não apenas "#")
            if (href !== '#') {
                e.preventDefault();
                
                // Obter o elemento alvo
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calcular a posição de rolagem considerando o header fixo
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    // Rolar suavemente até o elemento
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar a URL com o hash
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Verificar se há um hash na URL ao carregar a página
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        
        if (targetElement) {
            // Aguardar um momento para garantir que a página esteja totalmente carregada
            setTimeout(() => {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Adicionar funcionalidade de "Voltar ao topo"
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Mostrar/ocultar botão com base na posição de rolagem
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Adicionar evento de clique para rolar até o topo
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Adicionar animação de scroll para seções
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    if (sections.length > 0) {
        // Função para verificar se um elemento está visível na viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
            );
        }
        
        // Função para animar elementos visíveis
        function animateVisibleSections() {
            sections.forEach(section => {
                if (isElementInViewport(section) && !section.classList.contains('animated')) {
                    section.classList.add('animated');
                }
            });
        }
        
        // Verificar elementos visíveis ao carregar a página
        animateVisibleSections();
        
        // Verificar elementos visíveis ao rolar a página
        window.addEventListener('scroll', animateVisibleSections);
    }
}

