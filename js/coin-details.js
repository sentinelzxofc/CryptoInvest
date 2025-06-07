document.addEventListener('DOMContentLoaded', function() {
    initializeCoinDetailsPage();
});

function initializeCoinDetailsPage() {
    const coinId = getCoinIdFromUrl();
    if (coinId) {
        loadCoinData(coinId);
        setupChartPeriodButtons();
        setupBuyForm();
    } else {
        window.location.href = 'market.html';
    }
}

function getCoinIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadCoinData(coinId) {
    const coinData = generateCoinData(coinId);
    if (coinData) {
        updateCoinHeader(coinData);
        updateCoinInfo(coinData);
        updateCoinDescription(coinData);
        updateCoinHistory(coinData);
        drawCoinChart(document.getElementById('coinChart'), coinData);
    } else {
        window.location.href = 'market.html';
    }
}

function generateCoinData(coinId) {
    const coins = {
        'bitcoin': {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            icon: '../img/coins/bitcoin.svg',
            price: 42850.75,
            change24h: 2.4,
            marketCap: 825000000000,
            volume24h: 28500000000,
            circulatingSupply: 19250000,
            maxSupply: 21000000,
            allTimeHigh: 69000,
            allTimeLow: 67.81,
            launchDate: '2009-01-03',
            website: 'https://bitcoin.org',
            explorer: 'https://blockchain.com/explorer',
            whitepaper: 'https://bitcoin.org/bitcoin.pdf',
            description: 'Bitcoin é a primeira criptomoeda descentralizada do mundo, criada em 2009 por uma pessoa ou grupo de pessoas usando o pseudônimo Satoshi Nakamoto. É uma moeda digital inovadora que permite pagamentos peer-to-peer sem a necessidade de intermediários como bancos ou governos. O Bitcoin utiliza tecnologia blockchain para registrar todas as transações em um livro-razão público e distribuído, garantindo segurança e transparência. Com um fornecimento limitado de 21 milhões de moedas, o Bitcoin é frequentemente considerado como "ouro digital" e uma reserva de valor contra a inflação.'
        },
        'ethereum': {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            icon: '../img/coins/ethereum.svg',
            price: 3285.42,
            change24h: 5.1,
            marketCap: 395000000000,
            volume24h: 18700000000,
            circulatingSupply: 120250000,
            maxSupply: null,
            allTimeHigh: 4865,
            allTimeLow: 0.43,
            launchDate: '2015-07-30',
            website: 'https://ethereum.org',
            explorer: 'https://etherscan.io',
            whitepaper: 'https://ethereum.org/whitepaper',
            description: 'Ethereum é uma plataforma blockchain descentralizada que permite a criação de contratos inteligentes e aplicativos descentralizados (dApps). Lançado em 2015 por Vitalik Buterin, o Ethereum expandiu as capacidades do blockchain para além das simples transações financeiras. Com sua própria linguagem de programação Turing-completa, o Ethereum permite aos desenvolvedores criar aplicações complexas que podem executar operações automatizadas quando condições específicas são atendidas. O Ether (ETH) é a criptomoeda nativa da rede, usada para pagar taxas de transação e serviços computacionais.'
        },
        'cardano': {
            id: 'cardano',
            name: 'Cardano',
            symbol: 'ADA',
            icon: '../img/coins/cardano.svg',
            price: 1.24,
            change24h: -0.8,
            marketCap: 43500000000,
            volume24h: 1250000000,
            circulatingSupply: 35100000000,
            maxSupply: 45000000000,
            allTimeHigh: 3.10,
            allTimeLow: 0.02,
            launchDate: '2017-09-29',
            website: 'https://cardano.org',
            explorer: 'https://cardanoscan.io',
            whitepaper: 'https://docs.cardano.org/en/latest/',
            description: 'Cardano é uma plataforma blockchain de terceira geração que visa fornecer funcionalidades mais avançadas que seus predecessores. Desenvolvido com uma abordagem acadêmica e baseada em pesquisa, o Cardano foi fundado por Charles Hoskinson, co-fundador do Ethereum. A plataforma utiliza um algoritmo de consenso de prova de participação chamado Ouroboros, que é mais eficiente energeticamente que a prova de trabalho. O Cardano se destaca por seu compromisso com o desenvolvimento sustentável, interoperabilidade e escalabilidade, com foco em aplicações financeiras, identidade digital e rastreabilidade de produtos.'
        },
        'solana': {
            id: 'solana',
            name: 'Solana',
            symbol: 'SOL',
            icon: '../img/coins/solana.svg',
            price: 105.78,
            change24h: 8.3,
            marketCap: 45800000000,
            volume24h: 2850000000,
            circulatingSupply: 432500000,
            maxSupply: null,
            allTimeHigh: 260.06,
            allTimeLow: 0.50,
            launchDate: '2020-03-16',
            website: 'https://solana.com',
            explorer: 'https://explorer.solana.com',
            whitepaper: 'https://solana.com/solana-whitepaper.pdf',
            description: 'Solana é uma blockchain de alto desempenho focada em fornecer escalabilidade sem comprometer a descentralização ou segurança. Lançada em 2020, a Solana pode processar milhares de transações por segundo com taxas extremamente baixas, tornando-a uma das blockchains mais rápidas disponíveis. Isso é possível graças ao seu mecanismo de consenso inovador que combina Prova de História (PoH) com Prova de Participação (PoS). A Solana tem atraído muitos desenvolvedores de DeFi, NFTs e aplicativos Web3 devido à sua alta velocidade e baixo custo, posicionando-se como uma alternativa ao Ethereum para aplicações que exigem alto throughput.'
        }
    };
    
    return coins[coinId] || null;
}

function updateCoinHeader(coinData) {
    const coinIcon = document.getElementById('coinIcon');
    const coinName = document.getElementById('coinName');
    const coinSymbol = document.getElementById('coinSymbol');
    const coinPrice = document.getElementById('coinPrice');
    const coinChange = document.getElementById('coinChange');
    
    if (coinIcon) coinIcon.src = coinData.icon;
    if (coinName) coinName.textContent = coinData.name;
    if (coinSymbol) coinSymbol.textContent = coinData.symbol;
    if (coinPrice) coinPrice.textContent = formatCurrency(coinData.price);
    
    if (coinChange) {
        const changeClass = coinData.change24h >= 0 ? 'positive' : 'negative';
        const changeIcon = coinData.change24h >= 0 ? 'fa-caret-up' : 'fa-caret-down';
        
        coinChange.className = `coin-price-change ${changeClass}`;
        coinChange.innerHTML = `<i class="fas ${changeIcon}"></i> ${Math.abs(coinData.change24h).toFixed(2)}%`;
    }
}

function updateCoinInfo(coinData) {
    const marketCap = document.getElementById('marketCap');
    const volume24h = document.getElementById('volume24h');
    const circulatingSupply = document.getElementById('circulatingSupply');
    const maxSupply = document.getElementById('maxSupply');
    const allTimeHigh = document.getElementById('allTimeHigh');
    const allTimeLow = document.getElementById('allTimeLow');
    const launchDate = document.getElementById('launchDate');
    
    if (marketCap) marketCap.textContent = formatCurrency(coinData.marketCap);
    if (volume24h) volume24h.textContent = formatCurrency(coinData.volume24h);
    if (circulatingSupply) circulatingSupply.textContent = formatNumber(coinData.circulatingSupply);
    if (maxSupply) maxSupply.textContent = coinData.maxSupply ? formatNumber(coinData.maxSupply) : 'Ilimitado';
    if (allTimeHigh) allTimeHigh.textContent = formatCurrency(coinData.allTimeHigh);
    if (allTimeLow) allTimeLow.textContent = formatCurrency(coinData.allTimeLow);
    if (launchDate) launchDate.textContent = formatDate(coinData.launchDate);
    
    const websiteLink = document.getElementById('websiteLink');
    const explorerLink = document.getElementById('explorerLink');
    const whitepaperLink = document.getElementById('whitepaperLink');
    
    if (websiteLink) websiteLink.href = coinData.website;
    if (explorerLink) explorerLink.href = coinData.explorer;
    if (whitepaperLink) whitepaperLink.href = coinData.whitepaper;
}

function updateCoinDescription(coinData) {
    const descriptionContent = document.getElementById('descriptionContent');
    if (descriptionContent) {
        descriptionContent.innerHTML = `<p>${coinData.description}</p>`;
    }
}

function updateCoinHistory(coinData) {
    const historyTableBody = document.getElementById('historyTableBody');
    if (!historyTableBody) return;
    
    const today = new Date();
    const history = [];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const basePrice = coinData.price;
        const randomFactor = 1 + ((Math.random() * 0.1) - 0.05);
        const price = basePrice * randomFactor;
        
        const change = ((randomFactor - 1) * 100).toFixed(2);
        const volume = coinData.volume24h * (0.8 + Math.random() * 0.4);
        
        history.push({
            date: date,
            price: price,
            change: change,
            volume: volume
        });
    }
    
    historyTableBody.innerHTML = '';
    
    history.forEach(item => {
        const row = document.createElement('tr');
        
        const changeClass = parseFloat(item.change) >= 0 ? 'positive' : 'negative';
        const changeIcon = parseFloat(item.change) >= 0 ? 'fa-caret-up' : 'fa-caret-down';
        
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${formatCurrency(item.price)}</td>
            <td class="coin-change ${changeClass}">
                <i class="fas ${changeIcon}"></i> ${Math.abs(parseFloat(item.change)).toFixed(2)}%
            </td>
            <td>${formatCurrency(item.volume)}</td>
        `;
        
        historyTableBody.appendChild(row);
    });
}

function drawCoinChart(canvas, coinData) {
    if (!canvas) return;
    
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
        const value = (coinData.price * 1.2 - (i * coinData.price * 0.08)).toFixed(2);
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
    const data = generateChartData(coinData.price, coinData.change24h, 100);
    
    // Desenhar linha do gráfico
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - (data[0] * chartHeight));
    
    for (let i = 1; i < data.length; i++) {
        const x = padding + (i / (data.length - 1)) * chartWidth;
        const y = height - padding - (data[i] * chartHeight);
        ctx.lineTo(x, y);
    }
    
    const lineColor = coinData.change24h >= 0 ? '#10B981' : '#EF4444';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Preencher área abaixo da linha
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, coinData.change24h >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)');
    gradient.addColorStop(1, coinData.change24h >= 0 ? 'rgba(16, 185, 129, 0.0)' : 'rgba(239, 68, 68, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Adicionar pontos de dados
    for (let i = 0; i < data.length; i += 10) {
        const x = padding + (i / (data.length - 1)) * chartWidth;
        const y = height - padding - (data[i] * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = lineColor;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function generateChartData(basePrice, trend, points) {
    const data = [];
    let value = 0.5;
    const trendFactor = trend / 1000;
    
    for (let i = 0; i < points; i++) {
        // Adicionar tendência geral
        value += trendFactor;
        
        // Adicionar alguma variação aleatória
        value += (Math.random() - 0.5) * 0.01;
        
        // Garantir que o valor esteja entre 0.3 e 0.8
        value = Math.max(0.3, Math.min(0.8, value));
        
        data.push(value);
    }
    
    return data;
}

function setupChartPeriodButtons() {
    const periodButtons = document.querySelectorAll('.coin-chart-period-btn');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Redesenhar o gráfico com novos dados
            const coinId = getCoinIdFromUrl();
            if (coinId) {
                const coinData = generateCoinData(coinId);
                if (coinData) {
                    drawCoinChart(document.getElementById('coinChart'), coinData);
                }
            }
        });
    });
}

function setupBuyForm() {
    const buyForm = document.getElementById('buyForm');
    const buyAmount = document.getElementById('buyAmount');
    const buyTotal = document.getElementById('buyTotal');
    
    if (buyForm && buyAmount && buyTotal) {
        const coinId = getCoinIdFromUrl();
        const coinData = generateCoinData(coinId);
        
        if (coinData) {
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
                
                showNotification(`Compra simulada de ${amount} ${coinData.symbol} realizada com sucesso!`, 'success');
                
                buyAmount.value = '';
                buyTotal.value = '';
            });
        }
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatShortDate(date) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

// Redimensionar gráficos quando a janela for redimensionada
window.addEventListener('resize', debounce(function() {
    const coinId = getCoinIdFromUrl();
    if (coinId) {
        const coinData = generateCoinData(coinId);
        if (coinData) {
            drawCoinChart(document.getElementById('coinChart'), coinData);
        }
    }
}, 250));

