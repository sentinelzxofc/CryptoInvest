document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    setupSidebar();
    loadPortfolioData();
    loadTransactionData();
    setupPortfolioChart();
}

function setupSidebar() {
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (toggleSidebar && sidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        document.addEventListener('click', function(event) {
            if (sidebar.classList.contains('active') && 
                !event.target.closest('.dashboard-sidebar') && 
                !event.target.closest('#toggleSidebar')) {
                sidebar.classList.remove('active');
            }
        });
    }
    
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function loadPortfolioData() {
    const portfolioData = generatePortfolioData();
    renderPortfolioTable(portfolioData);
    updatePortfolioSummary(portfolioData);
}

function generatePortfolioData() {
    const assets = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '../img/coins/bitcoin.svg', amount: 0.45, price: 42850.75, change: 2.4 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '../img/coins/ethereum.svg', amount: 3.2, price: 3285.42, change: 5.1 },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', icon: '../img/coins/cardano.svg', amount: 1250, price: 1.24, change: -0.8 },
        { id: 'solana', name: 'Solana', symbol: 'SOL', icon: '../img/coins/solana.svg', amount: 12.5, price: 105.78, change: 8.3 }
    ];
    
    return assets.map(asset => {
        const value = asset.amount * asset.price;
        return {
            ...asset,
            value
        };
    });
}

function renderPortfolioTable(data) {
    const tableBody = document.getElementById('portfolioTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(asset => {
        const row = document.createElement('tr');
        
        const changeClass = asset.change >= 0 ? 'positive' : 'negative';
        const changeIcon = asset.change >= 0 ? 'fa-caret-up' : 'fa-caret-down';
        
        row.innerHTML = `
            <td>
                <div class="asset-info">
                    <div class="asset-icon">
                        <img src="${asset.icon}" alt="${asset.name}">
                    </div>
                    <div class="asset-name-container">
                        <div class="asset-name">${asset.name}</div>
                        <div class="asset-symbol">${asset.symbol}</div>
                    </div>
                </div>
            </td>
            <td class="asset-amount">${asset.amount} ${asset.symbol}</td>
            <td class="asset-value">${formatCurrency(asset.price)}</td>
            <td class="asset-change ${changeClass}">
                <i class="fas ${changeIcon}"></i> ${Math.abs(asset.change).toFixed(2)}%
            </td>
            <td class="asset-value">${formatCurrency(asset.value)}</td>
            <td>
                <div class="asset-actions">
                    <button class="btn btn-sm btn-primary asset-buy-btn" data-coin="${asset.id}">Comprar</button>
                    <button class="btn btn-sm btn-secondary asset-sell-btn" data-coin="${asset.id}">Vender</button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    setupAssetButtons();
}

function updatePortfolioSummary(data) {
    const totalBalance = document.getElementById('totalBalance');
    const totalProfit = document.getElementById('totalProfit');
    const totalAssets = document.getElementById('totalAssets');
    const totalTransactions = document.getElementById('totalTransactions');
    
    if (totalBalance && totalProfit && totalAssets && totalTransactions) {
        const balance = data.reduce((sum, asset) => sum + asset.value, 0);
        const profit = data.reduce((sum, asset) => sum + (asset.value * asset.change / 100), 0);
        const profitPercentage = (profit / (balance - profit)) * 100;
        
        totalBalance.textContent = formatCurrency(balance);
        
        const profitClass = profit >= 0 ? 'positive' : 'negative';
        const profitIcon = profit >= 0 ? 'fa-caret-up' : 'fa-caret-down';
        
        totalProfit.className = `overview-card-change ${profitClass}`;
        totalProfit.innerHTML = `<i class="fas ${profitIcon}"></i> ${formatCurrency(Math.abs(profit))} (${Math.abs(profitPercentage).toFixed(2)}%)`;
        
        totalAssets.textContent = data.length;
        totalTransactions.textContent = '24';
    }
}

function setupAssetButtons() {
    const buyButtons = document.querySelectorAll('.asset-buy-btn');
    const sellButtons = document.querySelectorAll('.asset-sell-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-coin');
            showTradeModal('buy', coinId);
        });
    });
    
    sellButtons.forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-coin');
            showTradeModal('sell', coinId);
        });
    });
}

function showTradeModal(type, coinId) {
    const modal = document.getElementById('tradeModal');
    if (!modal) return;
    
    const portfolioData = generatePortfolioData();
    const coinData = portfolioData.find(coin => coin.id === coinId);
    if (!coinData) return;
    
    const modalTitle = document.getElementById('tradeModalTitle');
    const modalCoinName = document.getElementById('modalCoinName');
    const modalCoinPrice = document.getElementById('modalCoinPrice');
    const modalCoinBalance = document.getElementById('modalCoinBalance');
    const tradeForm = document.getElementById('tradeForm');
    const tradeAmount = document.getElementById('tradeAmount');
    const tradeTotal = document.getElementById('tradeTotal');
    const tradeSubmit = document.getElementById('tradeSubmit');
    
    if (modalTitle) modalTitle.textContent = type === 'buy' ? 'Comprar' : 'Vender';
    if (modalCoinName) modalCoinName.textContent = coinData.name;
    if (modalCoinPrice) modalCoinPrice.textContent = formatCurrency(coinData.price);
    if (modalCoinBalance) modalCoinBalance.textContent = `${coinData.amount} ${coinData.symbol}`;
    if (tradeSubmit) tradeSubmit.textContent = type === 'buy' ? 'Comprar' : 'Vender';
    
    modal.classList.add('active');
    
    const closeModalButtons = modal.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    });
    
    if (tradeForm && tradeAmount && tradeTotal) {
        tradeAmount.value = '';
        tradeTotal.value = '';
        
        tradeAmount.addEventListener('input', function() {
            const amount = parseFloat(this.value) || 0;
            const total = amount * coinData.price;
            tradeTotal.value = formatCurrency(total);
        });
        
        tradeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = parseFloat(tradeAmount.value) || 0;
            
            if (amount <= 0) {
                showNotification('Por favor, insira uma quantidade válida.', 'error');
                return;
            }
            
            if (type === 'sell' && amount > coinData.amount) {
                showNotification(`Você não possui ${amount} ${coinData.symbol} para vender.`, 'error');
                return;
            }
            
            const action = type === 'buy' ? 'compra' : 'venda';
            showNotification(`${action} simulada de ${amount} ${coinData.symbol} realizada com sucesso!`, 'success');
            
            modal.classList.remove('active');
            
            // Simular atualização dos dados
            setTimeout(() => {
                loadPortfolioData();
                loadTransactionData();
            }, 1000);
        });
    }
}

function loadTransactionData() {
    const transactionData = generateTransactionData();
    renderTransactionTable(transactionData);
}

function generateTransactionData() {
    const transactions = [
        { id: 1, type: 'buy', asset: 'Bitcoin', symbol: 'BTC', icon: '../img/coins/bitcoin.svg', amount: 0.25, price: 41250.30, value: 10312.58, date: '2025-06-04', status: 'completed' },
        { id: 2, type: 'buy', asset: 'Ethereum', symbol: 'ETH', icon: '../img/coins/ethereum.svg', amount: 2.0, price: 3125.75, value: 6251.50, date: '2025-06-03', status: 'completed' },
        { id: 3, type: 'sell', asset: 'Solana', symbol: 'SOL', icon: '../img/coins/solana.svg', amount: 5.0, price: 98.45, value: 492.25, date: '2025-06-02', status: 'completed' },
        { id: 4, type: 'buy', asset: 'Cardano', symbol: 'ADA', icon: '../img/coins/cardano.svg', amount: 1000, price: 1.28, value: 1280.00, date: '2025-06-01', status: 'completed' },
        { id: 5, type: 'buy', asset: 'Bitcoin', symbol: 'BTC', icon: '../img/coins/bitcoin.svg', amount: 0.2, price: 42750.25, value: 8550.05, date: '2025-05-30', status: 'completed' },
        { id: 6, type: 'sell', asset: 'Ethereum', symbol: 'ETH', icon: '../img/coins/ethereum.svg', amount: 1.5, price: 3050.80, value: 4576.20, date: '2025-05-28', status: 'completed' }
    ];
    
    return transactions;
}

function renderTransactionTable(data) {
    const tableBody = document.getElementById('transactionsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(transaction => {
        const row = document.createElement('tr');
        
        const typeClass = transaction.type === 'buy' ? 'buy' : 'sell';
        const typeLabel = transaction.type === 'buy' ? 'Compra' : 'Venda';
        
        row.innerHTML = `
            <td>
                <span class="transaction-type ${typeClass}">${typeLabel}</span>
            </td>
            <td>
                <div class="transaction-asset">
                    <div class="transaction-asset-icon">
                        <img src="${transaction.icon}" alt="${transaction.asset}">
                    </div>
                    <span>${transaction.asset}</span>
                </div>
            </td>
            <td class="transaction-amount">${transaction.amount} ${transaction.symbol}</td>
            <td class="transaction-value">${formatCurrency(transaction.price)}</td>
            <td class="transaction-value">${formatCurrency(transaction.value)}</td>
            <td class="transaction-date">${formatDate(transaction.date)}</td>
            <td>
                <span class="transaction-status ${transaction.status}">${capitalizeFirstLetter(transaction.status)}</span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function setupPortfolioChart() {
    const portfolioChart = document.getElementById('portfolioChart');
    if (portfolioChart) {
        drawPortfolioChart(portfolioChart);
    }
    
    setupChartPeriodButtons();
}

function drawPortfolioChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    
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
        const value = (50000 - (i * 10000)).toFixed(0);
        ctx.fillText(`$${value}`, padding - 10, y + 4);
    }
    
    // Linhas verticais e datas
    const today = new Date();
    const dates = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(formatShortDate(date));
    }
    
    for (let i = 0; i <= 6; i++) {
        const x = padding + (chartWidth / 6) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
        
        // Valores do eixo X
        ctx.fillStyle = textColor;
        ctx.font = '12px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.fillText(dates[i], x, height - padding + 20);
    }
    
    // Dados simulados para o gráfico
    const data = generateChartData(100);
    
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
    for (let i = 0; i < data.length; i += 10) {
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
            const portfolioChart = document.getElementById('portfolioChart');
            if (portfolioChart) {
                drawPortfolioChart(portfolioChart);
            }
        });
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatShortDate(date) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Redimensionar gráficos quando a janela for redimensionada
window.addEventListener('resize', debounce(function() {
    const portfolioChart = document.getElementById('portfolioChart');
    if (portfolioChart) {
        drawPortfolioChart(portfolioChart);
    }
}, 250));

