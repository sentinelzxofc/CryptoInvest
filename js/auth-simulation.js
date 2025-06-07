document.addEventListener('DOMContentLoaded', function() {
    initializeAuthSimulation();
});

function initializeAuthSimulation() {
    checkAuthStatus();
    setupLogoutButtons();
    setupBuyButtons();
}

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('cryptoInvest_isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('cryptoInvest_userData') || '{}');
    
    updateAuthUI(isLoggedIn, userData);
    
    if (isLoggedIn && isOnDashboardPage()) {
        loadUserPortfolio(userData);
        loadUserTransactions(userData);
    }
}

function updateAuthUI(isLoggedIn, userData) {
    const authButtons = document.querySelectorAll('.auth-buttons');
    const userMenus = document.querySelectorAll('.user-menu');
    const userNames = document.querySelectorAll('.user-name');
    
    if (isLoggedIn) {
        // Mostrar menu do usuário e ocultar botões de autenticação
        authButtons.forEach(el => el.style.display = 'none');
        userMenus.forEach(el => el.style.display = 'flex');
        userNames.forEach(el => el.textContent = userData.name || 'Usuário');
        
        // Atualizar saldo na interface
        const balanceElements = document.querySelectorAll('.user-balance');
        balanceElements.forEach(el => {
            el.textContent = formatCurrency(userData.balance || 0);
        });
    } else {
        // Mostrar botões de autenticação e ocultar menu do usuário
        authButtons.forEach(el => el.style.display = 'flex');
        userMenus.forEach(el => el.style.display = 'none');
    }
}

function setupLogoutButtons() {
    const logoutButtons = document.querySelectorAll('.logout-button');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
}

function login(email, name = 'Usuário') {
    // Criar dados simulados do usuário
    const userData = {
        email: email,
        name: name || email.split('@')[0],
        balance: 10000, // Saldo inicial de R$ 10.000,00
        portfolio: generateInitialPortfolio(),
        transactions: generateInitialTransactions()
    };
    
    // Salvar no localStorage
    localStorage.setItem('cryptoInvest_isLoggedIn', 'true');
    localStorage.setItem('cryptoInvest_userData', JSON.stringify(userData));
    
    return userData;
}

function logout() {
    // Limpar dados de autenticação
    localStorage.removeItem('cryptoInvest_isLoggedIn');
    localStorage.removeItem('cryptoInvest_userData');
    
    // Redirecionar para a página inicial
    window.location.href = '../index.html';
}

function generateInitialPortfolio() {
    return [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', amount: 0.05, price: 42850.75, value: 2142.54 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', amount: 1.2, price: 3285.42, value: 3942.50 },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', amount: 1000, price: 1.24, value: 1240.00 }
    ];
}

function generateInitialTransactions() {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    return [
        { id: 1, type: 'buy', coinId: 'bitcoin', coinName: 'Bitcoin', coinSymbol: 'BTC', amount: 0.05, price: 42850.75, total: 2142.54, date: now.toISOString() },
        { id: 2, type: 'buy', coinId: 'ethereum', coinName: 'Ethereum', coinSymbol: 'ETH', amount: 1.2, price: 3285.42, total: 3942.50, date: yesterday.toISOString() },
        { id: 3, type: 'buy', coinId: 'cardano', coinName: 'Cardano', coinSymbol: 'ADA', amount: 1000, price: 1.24, total: 1240.00, date: lastWeek.toISOString() },
        { id: 4, type: 'deposit', amount: 10000, date: lastWeek.toISOString() }
    ];
}

function loadUserPortfolio(userData) {
    const portfolioContainer = document.getElementById('userPortfolio');
    if (!portfolioContainer) return;
    
    if (!userData.portfolio || userData.portfolio.length === 0) {
        portfolioContainer.innerHTML = `
            <div class="empty-portfolio">
                <i class="fas fa-coins"></i>
                <p>Você ainda não possui criptomoedas em seu portfólio.</p>
                <a href="market.html" class="btn btn-primary">Explorar Mercado</a>
            </div>
        `;
        return;
    }
    
    let portfolioHTML = '';
    let totalValue = 0;
    
    userData.portfolio.forEach(asset => {
        const currentPrice = getUpdatedPrice(asset.id, asset.price);
        const currentValue = asset.amount * currentPrice;
        const priceChange = ((currentPrice - asset.price) / asset.price) * 100;
        const changeClass = priceChange >= 0 ? 'positive' : 'negative';
        const changeIcon = priceChange >= 0 ? 'fa-caret-up' : 'fa-caret-down';
        
        totalValue += currentValue;
        
        portfolioHTML += `
            <div class="portfolio-item">
                <div class="portfolio-coin-info">
                    <div class="portfolio-coin-icon">
                        <img src="../img/coins/${asset.id}.svg" alt="${asset.name}">
                    </div>
                    <div class="portfolio-coin-name">
                        <h4>${asset.name}</h4>
                        <span>${asset.symbol}</span>
                    </div>
                </div>
                <div class="portfolio-coin-amount">
                    <div class="amount-value">${asset.amount.toLocaleString('pt-BR')}</div>
                    <div class="amount-label">${asset.symbol}</div>
                </div>
                <div class="portfolio-coin-price">
                    <div class="price-value">${formatCurrency(currentPrice)}</div>
                    <div class="price-change ${changeClass}">
                        <i class="fas ${changeIcon}"></i> ${Math.abs(priceChange).toFixed(2)}%
                    </div>
                </div>
                <div class="portfolio-coin-value">
                    <div class="value-amount">${formatCurrency(currentValue)}</div>
                </div>
                <div class="portfolio-coin-actions">
                    <button class="btn btn-sm btn-primary coin-buy-btn" data-coin="${asset.id}">Comprar</button>
                    <button class="btn btn-sm btn-outline coin-sell-btn" data-coin="${asset.id}">Vender</button>
                </div>
            </div>
        `;
    });
    
    const portfolioHeader = `
        <div class="portfolio-header">
            <h3>Seu Portfólio</h3>
            <div class="portfolio-total">
                <span>Valor Total:</span>
                <strong>${formatCurrency(totalValue)}</strong>
            </div>
        </div>
    `;
    
    portfolioContainer.innerHTML = portfolioHeader + portfolioHTML;
    
    // Configurar botões de compra e venda
    setupPortfolioButtons();
}

function loadUserTransactions(userData) {
    const transactionsContainer = document.getElementById('userTransactions');
    if (!transactionsContainer) return;
    
    if (!userData.transactions || userData.transactions.length === 0) {
        transactionsContainer.innerHTML = `
            <div class="empty-transactions">
                <i class="fas fa-exchange-alt"></i>
                <p>Você ainda não realizou nenhuma transação.</p>
            </div>
        `;
        return;
    }
    
    let transactionsHTML = '';
    
    // Ordenar transações por data (mais recentes primeiro)
    const sortedTransactions = [...userData.transactions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    sortedTransactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        if (transaction.type === 'buy' || transaction.type === 'sell') {
            const typeClass = transaction.type === 'buy' ? 'transaction-buy' : 'transaction-sell';
            const typeIcon = transaction.type === 'buy' ? 'fa-arrow-down' : 'fa-arrow-up';
            const typeLabel = transaction.type === 'buy' ? 'Compra' : 'Venda';
            
            transactionsHTML += `
                <div class="transaction-item ${typeClass}">
                    <div class="transaction-icon">
                        <i class="fas ${typeIcon}"></i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-title">
                            ${typeLabel} de ${transaction.coinName} (${transaction.coinSymbol})
                        </div>
                        <div class="transaction-info">
                            <span class="transaction-amount">${transaction.amount} ${transaction.coinSymbol}</span>
                            <span class="transaction-price">Preço: ${formatCurrency(transaction.price)}</span>
                        </div>
                    </div>
                    <div class="transaction-data">
                        <div class="transaction-total">${formatCurrency(transaction.total)}</div>
                        <div class="transaction-date">${formattedDate}</div>
                    </div>
                </div>
            `;
        } else if (transaction.type === 'deposit' || transaction.type === 'withdrawal') {
            const typeClass = transaction.type === 'deposit' ? 'transaction-deposit' : 'transaction-withdrawal';
            const typeIcon = transaction.type === 'deposit' ? 'fa-wallet' : 'fa-money-bill-wave';
            const typeLabel = transaction.type === 'deposit' ? 'Depósito' : 'Saque';
            
            transactionsHTML += `
                <div class="transaction-item ${typeClass}">
                    <div class="transaction-icon">
                        <i class="fas ${typeIcon}"></i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-title">${typeLabel}</div>
                        <div class="transaction-info">
                            <span class="transaction-method">Via PIX</span>
                        </div>
                    </div>
                    <div class="transaction-data">
                        <div class="transaction-total">${formatCurrency(transaction.amount)}</div>
                        <div class="transaction-date">${formattedDate}</div>
                    </div>
                </div>
            `;
        }
    });
    
    const transactionsHeader = `
        <div class="transactions-header">
            <h3>Histórico de Transações</h3>
        </div>
    `;
    
    transactionsContainer.innerHTML = transactionsHeader + transactionsHTML;
}

function setupPortfolioButtons() {
    const buyButtons = document.querySelectorAll('.portfolio-coin-actions .coin-buy-btn');
    const sellButtons = document.querySelectorAll('.portfolio-coin-actions .coin-sell-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-coin');
            showBuyModal(coinId);
        });
    });
    
    sellButtons.forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-coin');
            showSellModal(coinId);
        });
    });
}

function setupBuyButtons() {
    const buyButtons = document.querySelectorAll('.coin-buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-coin');
            
            // Verificar se o usuário está logado
            const isLoggedIn = localStorage.getItem('cryptoInvest_isLoggedIn') === 'true';
            
            if (!isLoggedIn) {
                showLoginRequiredModal();
                return;
            }
            
            showBuyModal(coinId);
        });
    });
}

function showBuyModal(coinId) {
    const modal = document.getElementById('buyModal');
    if (!modal) return;
    
    const coinData = getCoinById(coinId);
    if (!coinData) return;
    
    const modalCoinName = document.getElementById('modalCoinName');
    const modalCoinPrice = document.getElementById('modalCoinPrice');
    const buyForm = document.getElementById('buyForm');
    const buyAmount = document.getElementById('buyAmount');
    const buyTotal = document.getElementById('buyTotal');
    
    if (modalCoinName) modalCoinName.textContent = coinData.name;
    if (modalCoinPrice) modalCoinPrice.textContent = formatCurrency(coinData.price);
    
    modal.classList.add('active');
    
    const closeModalButtons = modal.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    });
    
    if (buyForm && buyAmount && buyTotal) {
        buyAmount.value = '';
        buyTotal.value = '';
        
        buyAmount.addEventListener('input', function() {
            const amount = parseFloat(this.value) || 0;
            const total = amount * coinData.price;
            buyTotal.value = formatCurrency(total);
        });
        
        buyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = parseFloat(buyAmount.value) || 0;
            
            if (amount <= 0) {
                showNotification('Por favor, insira uma quantidade válida.', 'error');
                return;
            }
            
            processBuyTransaction(coinData, amount);
            modal.classList.remove('active');
        });
    }
}

function showSellModal(coinId) {
    const modal = document.getElementById('sellModal');
    if (!modal) return;
    
    const userData = JSON.parse(localStorage.getItem('cryptoInvest_userData') || '{}');
    const portfolioItem = userData.portfolio.find(item => item.id === coinId);
    
    if (!portfolioItem) {
        showNotification('Erro ao carregar dados da moeda.', 'error');
        return;
    }
    
    const modalCoinName = document.getElementById('sellModalCoinName');
    const modalCoinPrice = document.getElementById('sellModalCoinPrice');
    const modalAvailableAmount = document.getElementById('sellModalAvailable');
    const sellForm = document.getElementById('sellForm');
    const sellAmount = document.getElementById('sellAmount');
    const sellTotal = document.getElementById('sellTotal');
    
    if (modalCoinName) modalCoinName.textContent = portfolioItem.name;
    if (modalCoinPrice) modalCoinPrice.textContent = formatCurrency(getUpdatedPrice(coinId, portfolioItem.price));
    if (modalAvailableAmount) modalAvailableAmount.textContent = `${portfolioItem.amount} ${portfolioItem.symbol}`;
    
    modal.classList.add('active');
    
    const closeModalButtons = modal.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    });
    
    if (sellForm && sellAmount && sellTotal) {
        sellAmount.value = '';
        sellTotal.value = '';
        sellAmount.max = portfolioItem.amount;
        
        sellAmount.addEventListener('input', function() {
            const amount = parseFloat(this.value) || 0;
            
            if (amount > portfolioItem.amount) {
                this.value = portfolioItem.amount;
                amount = portfolioItem.amount;
            }
            
            const price = getUpdatedPrice(coinId, portfolioItem.price);
            const total = amount * price;
            sellTotal.value = formatCurrency(total);
        });
        
        sellForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = parseFloat(sellAmount.value) || 0;
            
            if (amount <= 0) {
                showNotification('Por favor, insira uma quantidade válida.', 'error');
                return;
            }
            
            if (amount > portfolioItem.amount) {
                showNotification(`Você possui apenas ${portfolioItem.amount} ${portfolioItem.symbol}.`, 'error');
                return;
            }
            
            processSellTransaction(portfolioItem, amount);
            modal.classList.remove('active');
        });
    }
}

function showLoginRequiredModal() {
    const modal = document.getElementById('loginRequiredModal');
    if (!modal) return;
    
    modal.classList.add('active');
    
    const closeModalButtons = modal.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    });
    
    const loginButton = modal.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    const registerButton = modal.querySelector('.register-button');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            window.location.href = 'register.html';
        });
    }
}

function processBuyTransaction(coinData, amount) {
    const userData = JSON.parse(localStorage.getItem('cryptoInvest_userData') || '{}');
    
    const total = amount * coinData.price;
    
    // Verificar se o usuário tem saldo suficiente
    if (userData.balance < total) {
        showNotification('Saldo insuficiente para realizar esta compra.', 'error');
        return;
    }
    
    // Atualizar saldo
    userData.balance -= total;
    
    // Verificar se o usuário já possui esta moeda no portfólio
    const existingCoin = userData.portfolio.find(item => item.id === coinData.id);
    
    if (existingCoin) {
        // Atualizar quantidade e preço médio
        const totalValue = existingCoin.amount * existingCoin.price + amount * coinData.price;
        const totalAmount = existingCoin.amount + amount;
        existingCoin.price = totalValue / totalAmount;
        existingCoin.amount = totalAmount;
        existingCoin.value = totalValue;
    } else {
        // Adicionar nova moeda ao portfólio
        userData.portfolio.push({
            id: coinData.id,
            name: coinData.name,
            symbol: coinData.symbol,
            amount: amount,
            price: coinData.price,
            value: total
        });
    }
    
    // Adicionar transação ao histórico
    const transaction = {
        id: Date.now(),
        type: 'buy',
        coinId: coinData.id,
        coinName: coinData.name,
        coinSymbol: coinData.symbol,
        amount: amount,
        price: coinData.price,
        total: total,
        date: new Date().toISOString()
    };
    
    userData.transactions.push(transaction);
    
    // Salvar dados atualizados
    localStorage.setItem('cryptoInvest_userData', JSON.stringify(userData));
    
    // Atualizar UI
    updateAuthUI(true, userData);
    
    if (isOnDashboardPage()) {
        loadUserPortfolio(userData);
        loadUserTransactions(userData);
    }
    
    showNotification(`Compra de ${amount} ${coinData.symbol} realizada com sucesso!`, 'success');
}

function processSellTransaction(coinData, amount) {
    const userData = JSON.parse(localStorage.getItem('cryptoInvest_userData') || '{}');
    
    const price = getUpdatedPrice(coinData.id, coinData.price);
    const total = amount * price;
    
    // Verificar se o usuário possui a quantidade que deseja vender
    const existingCoin = userData.portfolio.find(item => item.id === coinData.id);
    
    if (!existingCoin || existingCoin.amount < amount) {
        showNotification(`Você não possui ${amount} ${coinData.symbol} para vender.`, 'error');
        return;
    }
    
    // Atualizar saldo
    userData.balance += total;
    
    // Atualizar quantidade no portfólio
    existingCoin.amount -= amount;
    existingCoin.value = existingCoin.amount * existingCoin.price;
    
    // Remover moeda do portfólio se quantidade for zero
    if (existingCoin.amount === 0) {
        userData.portfolio = userData.portfolio.filter(item => item.id !== coinData.id);
    }
    
    // Adicionar transação ao histórico
    const transaction = {
        id: Date.now(),
        type: 'sell',
        coinId: coinData.id,
        coinName: coinData.name,
        coinSymbol: coinData.symbol,
        amount: amount,
        price: price,
        total: total,
        date: new Date().toISOString()
    };
    
    userData.transactions.push(transaction);
    
    // Salvar dados atualizados
    localStorage.setItem('cryptoInvest_userData', JSON.stringify(userData));
    
    // Atualizar UI
    updateAuthUI(true, userData);
    
    if (isOnDashboardPage()) {
        loadUserPortfolio(userData);
        loadUserTransactions(userData);
    }
    
    showNotification(`Venda de ${amount} ${coinData.symbol} realizada com sucesso!`, 'success');
}

function getCoinById(id) {
    // Função para obter dados de uma moeda pelo ID
    // Esta função deve ser adaptada para a fonte de dados real do seu projeto
    const coins = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 42850.75 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3285.42 },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 1.24 },
        { id: 'solana', name: 'Solana', symbol: 'SOL', price: 105.78 },
        { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', price: 428.65 },
        { id: 'ripple', name: 'XRP', symbol: 'XRP', price: 0.58 },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 18.75 },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.12 },
        { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', price: 35.42 },
        { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', price: 15.28 }
    ];
    
    return coins.find(coin => coin.id === id);
}

function getUpdatedPrice(coinId, basePrice) {
    // Simular uma pequena variação no preço para dar a impressão de preços em tempo real
    const variation = (Math.random() * 0.1) - 0.05; // -5% a +5%
    return basePrice * (1 + variation);
}

function isOnDashboardPage() {
    return window.location.pathname.includes('dashboard.html');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = document.createElement('i');
    icon.className = 'fas';
    
    switch (type) {
        case 'success':
            icon.classList.add('fa-check-circle');
            break;
        case 'error':
            icon.classList.add('fa-exclamation-circle');
            break;
        case 'warning':
            icon.classList.add('fa-exclamation-triangle');
            break;
        default:
            icon.classList.add('fa-info-circle');
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(textSpan);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

