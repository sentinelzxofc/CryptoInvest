document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    const marketChart = document.getElementById('marketChart');
    if (marketChart) {
        drawMarketChart(marketChart);
    }
    
    setupChartPeriodButtons();
}

function drawMarketChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight - 50;
    
    canvas.width = width;
    canvas.height = height;
    
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
    
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Desenhar grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Linhas horizontais
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Valores do eixo Y
        ctx.fillStyle = textColor;
        ctx.font = '12px var(--font-mono)';
        ctx.textAlign = 'right';
        const value = (2.0 - (i * 0.4)).toFixed(1);
        ctx.fillText(`$${value}T`, padding - 10, y + 4);
    }
    
    // Linhas verticais e datas
    const dates = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    for (let i = 0; i <= 6; i++) {
        const x = padding + (chartWidth / 6) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
        
        // Valores do eixo X
        if (i < dates.length) {
            ctx.fillStyle = textColor;
            ctx.font = '12px var(--font-mono)';
            ctx.textAlign = 'center';
            ctx.fillText(dates[i * 2], x, height - padding + 20);
        }
    }
    
    // Dados simulados para o gráfico
    const data = generateChartData(50);
    
    // Desenhar linha do gráfico
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - (data[0] * chartHeight));
    
    for (let i = 1; i < data.length; i++) {
        const x = padding + (i / (data.length - 1)) * chartWidth;
        const y = height - padding - (data[i] * chartHeight);
        ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Preencher área abaixo da linha
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Adicionar pontos de dados
    for (let i = 0; i < data.length; i += 5) {
        const x = padding + (i / (data.length - 1)) * chartWidth;
        const y = height - padding - (data[i] * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function generateChartData(points) {
    const data = [];
    let value = 0.5 + Math.random() * 0.2;
    
    for (let i = 0; i < points; i++) {
        // Adicionar alguma variação aleatória
        value += (Math.random() - 0.5) * 0.05;
        
        // Garantir que o valor esteja entre 0.3 e 0.8
        value = Math.max(0.3, Math.min(0.8, value));
        
        data.push(value);
    }
    
    return data;
}

function setupChartPeriodButtons() {
    const periodButtons = document.querySelectorAll('.chart-period-btn');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Redesenhar o gráfico com novos dados
            const marketChart = document.getElementById('marketChart');
            if (marketChart) {
                drawMarketChart(marketChart);
            }
        });
    });
}

// Redimensionar gráficos quando a janela for redimensionada
window.addEventListener('resize', debounce(function() {
    const marketChart = document.getElementById('marketChart');
    if (marketChart) {
        drawMarketChart(marketChart);
    }
}, 250));

// Função debounce para limitar a frequência de chamadas
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

