document.addEventListener('DOMContentLoaded', function() {
    initializeMarketPage();
});

function initializeMarketPage() {
    loadCryptoData();
    setupFilters();
    setupSearch();
    setupSorting();
    setupPagination();
}

function loadCryptoData() {
    const cryptoData = generateCryptoData();
    renderCryptoTable(cryptoData);
    updateMarketStats(cryptoData);
}

function generateCryptoData() {
    const coins = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '../img/coins/bitcoin.svg', category: 'Currency', type: 'coin' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '../img/coins/ethereum.svg', category: 'Smart Contract', type: 'coin' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', icon: '../img/coins/cardano.svg', category: 'Smart Contract', type: 'coin' },
        { id: 'solana', name: 'Solana', symbol: 'SOL', icon: '../img/coins/solana.svg', category: 'Smart Contract', type: 'coin' },
        { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', icon: '../img/coins/binance.svg', category: 'Exchange', type: 'coin' },
        { id: 'ripple', name: 'XRP', symbol: 'XRP', icon: '../img/coins/xrp.svg', category: 'Payment', type: 'coin' },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', icon: '../img/coins/polkadot.svg', category: 'Infrastructure', type: 'coin' },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', icon: '../img/coins/dogecoin.svg', category: 'Meme', type: 'coin' },
        { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', icon: '../img/coins/avalanche.svg', category: 'Smart Contract', type: 'coin' },
        { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', icon: '../img/coins/chainlink.svg', category: 'Oracle', type: 'token' },
        { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', icon: '../img/coins/litecoin.svg', category: 'Currency', type: 'coin' },
        { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: '../img/coins/polygon.svg', category: 'Layer 2', type: 'token' },
        { id: 'stellar', name: 'Stellar', symbol: 'XLM', icon: '../img/coins/stellar.svg', category: 'Payment', type: 'coin' },
        { id: 'tron', name: 'TRON', symbol: 'TRX', icon: '../img/coins/tron.svg', category: 'Smart Contract', type: 'coin' },
        { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM', icon: '../img/coins/cosmos.svg', category: 'Infrastructure', type: 'coin' },
        { id: 'monero', name: 'Monero', symbol: 'XMR', icon: '../img/coins/monero.svg', category: 'Privacy', type: 'coin' },
        { id: 'algorand', name: 'Algorand', symbol: 'ALGO', icon: '../img/coins/algorand.svg', category: 'Smart Contract', type: 'coin' },
        { id: 'tezos', name: 'Tezos', symbol: 'XTZ', icon: '../img/coins/tezos.svg', category: 'Smart Contract', type: 'coin' },
        { id: 'filecoin', name: 'Filecoin', symbol: 'FIL', icon: '../img/coins/filecoin.svg', category: 'Storage', type: 'token' },
        { id: 'theta', name: 'Theta Network', symbol: 'THETA', icon: '../img/coins/theta.svg', category: 'Media', type: 'token' },
        { id: 'uniswap', name: 'Uniswap', symbol: 'UNI', icon: '../img/coins/uniswap.svg', category: 'DeFi', type: 'token' },
        { id: 'aave', name: 'Aave', symbol: 'AAVE', icon: '../img/coins/aave.svg', category: 'DeFi', type: 'token' },
        { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB', icon: '../img/coins/shiba.svg', category: 'Meme', type: 'token' },
        { id: 'tether', name: 'Tether', symbol: 'USDT', icon: '../img/coins/tether.svg', category: 'Stablecoin', type: 'token' },
        { id: 'usd-coin', name: 'USD Coin', symbol: 'USDC', icon: '../img/coins/usdc.svg', category: 'Stablecoin', type: 'token' },
        { id: 'dai', name: 'Dai', symbol: 'DAI', icon: '../img/coins/dai.svg', category: 'Stablecoin', type: 'token' },
        { id: 'the-sandbox', name: 'The Sandbox', symbol: 'SAND', icon: '../img/coins/sandbox.svg', category: 'Metaverse', type: 'token' },
        { id: 'decentraland', name: 'Decentraland', symbol: 'MANA', icon: '../img/coins/decentraland.svg', category: 'Metaverse', type: 'token' }
    ];
    
    return coins.map(coin => {
        const price = generateRandomPrice(coin.symbol);
        const change24h = generateRandomChange();
        const volume24h = generateRandomVolume();
        const marketCap = price * generateRandomSupply();
        
        return {
            ...coin,
            price,
            change24h,
            volume24h,
            marketCap
        };
    });
}

function generateRandomPrice(symbol) {
    const basePrice = {
        'BTC': 40000 + Math.random() * 5000,
        'ETH': 3000 + Math.random() * 500,
        'ADA': 1 + Math.random() * 0.5,
        'SOL': 100 + Math.random() * 20,
        'BNB': 400 + Math.random() * 50,
        'XRP': 0.5 + Math.random() * 0.2,
        'DOT': 20 + Math.random() * 5,
        'DOGE': 0.1 + Math.random() * 0.05,
        'AVAX': 30 + Math.random() * 10,
        'LINK': 15 + Math.random() * 5,
        'USDT': 1,
        'USDC': 1,
        'DAI': 1
    };
    
    return basePrice[symbol] || 1 + Math.random() * 100;
}

function generateRandomChange() {
    return (Math.random() * 20) - 10;
}

function generateRandomVolume() {
    return Math.random() * 5000000000;
}

function generateRandomSupply() {
    return Math.random() * 1000000000;
}

function renderCryptoTable(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="7" class="empty-result">
                <div class="empty-message">
                    <i class="fas fa-search"></i>
                    <p>Nenhuma criptomoeda encontrada</p>
                </div>
            </td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    data.forEach((coin, index) => {
        const row = document.createElement('tr');
        row.className = 'market-table-row';
        row.setAttribute('data-id', coin.id);
        
        const changeClass = coin.change24h >= 0 ? 'positive' : 'negative';
        const changeIcon = coin.change24h >= 0 ? 'fa-caret-up' : 'fa-caret-down';
        
        row.innerHTML = `
            <td class="coin-rank">${index + 1}</td>
            <td>
                <div class="coin-info">
                    <div class="coin-icon">
                        <img src="${coin.icon}" alt="${coin.name}">
                    </div>
                    <div class="coin-name-container">
                        <div class="coin-name">${coin.name}</div>
                        <div class="coin-symbol">${coin.symbol}</div>
                    </div>
                </div>
            </td>
            <td class="coin-price">${formatCurrency(coin.price)}</td>
            <td class="coin-change ${changeClass}">
                <i class="fas ${changeIcon}"></i> ${Math.abs(coin.change24h).toFixed(2)}%
            </td>
            <td class="coin-volume">${formatCompactNumber(coin.volume24h)}</td>
            <td class="coin-market-cap">${formatCompactNumber(coin.marketCap)}</td>
            <td>
                <div class="coin-action">
                    <a href="coin-details.html?id=${coin.id}" class="btn btn-sm btn-primary">Detalhes</a>
                    <button class="btn btn-sm btn-secondary coin-buy-btn" data-coin="${coin.id}">Comprar</button>
                </div>
            </td>
        `;
        
        row.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                window.location.href = `coin-details.html?id=${coin.id}`;
            }
        });
        
        tableBody.appendChild(row);
    });
    
    setupBuyButtons();
    
    // Atualizar contador de resultados
    updateResultCount(data.length);
}

function updateMarketStats(data) {
    const totalMarketCap = document.getElementById('totalMarketCap');
    const total24hVolume = document.getElementById('total24hVolume');
    const totalCryptos = document.getElementById('totalCryptos');
    
    if (totalMarketCap && total24hVolume && totalCryptos) {
        const marketCap = data.reduce((sum, crypto) => sum + crypto.marketCap, 0);
        const volume = data.reduce((sum, crypto) => sum + crypto.volume24h, 0);
        
        totalMarketCap.textContent = formatCompactNumber(marketCap);
        total24hVolume.textContent = formatCompactNumber(volume);
        totalCryptos.textContent = data.length;
    }
}

function setupBuyButtons() {
    const buyButtons = document.querySelectorAll('.coin-buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-coin');
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
            
            showNotification(`Compra simulada de ${amount} ${coinData.symbol} realizada com sucesso!`, 'success');
            
            modal.classList.remove('active');
        });
    }
}

function getCoinById(id) {
    const cryptoData = generateCryptoData();
    return cryptoData.find(coin => coin.id === id);
}

function setupFilters() {
    const categoryFilters = document.querySelectorAll('.filter-category-item');
    const typeFilters = document.querySelectorAll('.filter-type-item');
    const changeFilters = document.querySelectorAll('.filter-change-item');
    
    // Inicializar filtros
    let activeFilters = {
        category: 'all',
        type: 'all',
        change: 'all'
    };
    
    // Configurar eventos de clique para filtros de categoria
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Atualizar classe ativa
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Atualizar filtro ativo
            activeFilters.category = category;
            
            // Aplicar filtros
            applyFilters();
        });
    });
    
    // Configurar eventos de clique para filtros de tipo
    typeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Atualizar classe ativa
            typeFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Atualizar filtro ativo
            activeFilters.type = type;
            
            // Aplicar filtros
            applyFilters();
        });
    });
    
    // Configurar eventos de clique para filtros de variação
    changeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const change = this.getAttribute('data-change');
            
            // Atualizar classe ativa
            changeFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Atualizar filtro ativo
            activeFilters.change = change;
            
            // Aplicar filtros
            applyFilters();
        });
    });
    
    function applyFilters() {
        const cryptoData = generateCryptoData();
        
        // Aplicar filtro de categoria
        let filteredData = cryptoData;
        if (activeFilters.category !== 'all') {
            filteredData = filteredData.filter(crypto => crypto.category.toLowerCase() === activeFilters.category);
        }
        
        // Aplicar filtro de tipo
        if (activeFilters.type !== 'all') {
            filteredData = filteredData.filter(crypto => crypto.type === activeFilters.type);
        }
        
        // Aplicar filtro de variação
        if (activeFilters.change !== 'all') {
            if (activeFilters.change === 'positive') {
                filteredData = filteredData.filter(crypto => crypto.change24h > 0);
            } else if (activeFilters.change === 'negative') {
                filteredData = filteredData.filter(crypto => crypto.change24h < 0);
            }
        }
        
        // Aplicar termo de busca atual
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim() !== '') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            filteredData = filteredData.filter(crypto => 
                crypto.name.toLowerCase().includes(searchTerm) || 
                crypto.symbol.toLowerCase().includes(searchTerm)
            );
        }
        
        // Renderizar tabela com dados filtrados
        renderCryptoTable(filteredData);
        
        // Atualizar estatísticas do mercado
        updateMarketStats(filteredData);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            // Mostrar/ocultar botão de limpar
            if (searchClear) {
                searchClear.style.display = searchTerm ? 'flex' : 'none';
            }
            
            // Obter dados filtrados atuais
            const cryptoData = generateCryptoData();
            
            // Aplicar filtros ativos
            const categoryFilter = document.querySelector('.filter-category-item.active');
            const typeFilter = document.querySelector('.filter-type-item.active');
            const changeFilter = document.querySelector('.filter-change-item.active');
            
            let filteredData = cryptoData;
            
            // Aplicar filtro de categoria
            if (categoryFilter && categoryFilter.getAttribute('data-category') !== 'all') {
                const category = categoryFilter.getAttribute('data-category');
                filteredData = filteredData.filter(crypto => crypto.category.toLowerCase() === category);
            }
            
            // Aplicar filtro de tipo
            if (typeFilter && typeFilter.getAttribute('data-type') !== 'all') {
                const type = typeFilter.getAttribute('data-type');
                filteredData = filteredData.filter(crypto => crypto.type === type);
            }
            
            // Aplicar filtro de variação
            if (changeFilter && changeFilter.getAttribute('data-change') !== 'all') {
                const change = changeFilter.getAttribute('data-change');
                if (change === 'positive') {
                    filteredData = filteredData.filter(crypto => crypto.change24h > 0);
                } else if (change === 'negative') {
                    filteredData = filteredData.filter(crypto => crypto.change24h < 0);
                }
            }
            
            // Aplicar termo de busca
            if (searchTerm) {
                filteredData = filteredData.filter(crypto => 
                    crypto.name.toLowerCase().includes(searchTerm) || 
                    crypto.symbol.toLowerCase().includes(searchTerm)
                );
            }
            
            // Renderizar tabela com dados filtrados
            renderCryptoTable(filteredData);
            
            // Atualizar estatísticas do mercado
            updateMarketStats(filteredData);
        }, 300));
        
        // Configurar botão de limpar busca
        if (searchClear) {
            searchClear.addEventListener('click', function() {
                searchInput.value = '';
                searchClear.style.display = 'none';
                
                // Recarregar dados com filtros ativos
                const categoryFilter = document.querySelector('.filter-category-item.active');
                const typeFilter = document.querySelector('.filter-type-item.active');
                const changeFilter = document.querySelector('.filter-change-item.active');
                
                let filteredData = generateCryptoData();
                
                // Aplicar filtro de categoria
                if (categoryFilter && categoryFilter.getAttribute('data-category') !== 'all') {
                    const category = categoryFilter.getAttribute('data-category');
                    filteredData = filteredData.filter(crypto => crypto.category.toLowerCase() === category);
                }
                
                // Aplicar filtro de tipo
                if (typeFilter && typeFilter.getAttribute('data-type') !== 'all') {
                    const type = typeFilter.getAttribute('data-type');
                    filteredData = filteredData.filter(crypto => crypto.type === type);
                }
                
                // Aplicar filtro de variação
                if (changeFilter && changeFilter.getAttribute('data-change') !== 'all') {
                    const change = changeFilter.getAttribute('data-change');
                    if (change === 'positive') {
                        filteredData = filteredData.filter(crypto => crypto.change24h > 0);
                    } else if (change === 'negative') {
                        filteredData = filteredData.filter(crypto => crypto.change24h < 0);
                    }
                }
                
                // Renderizar tabela com dados filtrados
                renderCryptoTable(filteredData);
                
                // Atualizar estatísticas do mercado
                updateMarketStats(filteredData);
                
                // Focar no campo de busca
                searchInput.focus();
            });
        }
    }
}

function setupSorting() {
    const sortableHeaders = document.querySelectorAll('.market-table th[data-sort]');
    
    let currentSort = {
        column: 'rank',
        direction: 'asc'
    };
    
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            
            // Alternar direção se a mesma coluna for clicada novamente
            if (currentSort.column === column) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = column;
                currentSort.direction = 'asc';
            }
            
            // Atualizar indicadores visuais de ordenação
            sortableHeaders.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            
            this.classList.add(`sort-${currentSort.direction}`);
            
            // Obter dados filtrados atuais
            const cryptoData = generateCryptoData();
            
            // Aplicar filtros ativos
            const categoryFilter = document.querySelector('.filter-category-item.active');
            const typeFilter = document.querySelector('.filter-type-item.active');
            const changeFilter = document.querySelector('.filter-change-item.active');
            
            let filteredData = cryptoData;
            
            // Aplicar filtro de categoria
            if (categoryFilter && categoryFilter.getAttribute('data-category') !== 'all') {
                const category = categoryFilter.getAttribute('data-category');
                filteredData = filteredData.filter(crypto => crypto.category.toLowerCase() === category);
            }
            
            // Aplicar filtro de tipo
            if (typeFilter && typeFilter.getAttribute('data-type') !== 'all') {
                const type = typeFilter.getAttribute('data-type');
                filteredData = filteredData.filter(crypto => crypto.type === type);
            }
            
            // Aplicar filtro de variação
            if (changeFilter && changeFilter.getAttribute('data-change') !== 'all') {
                const change = changeFilter.getAttribute('data-change');
                if (change === 'positive') {
                    filteredData = filteredData.filter(crypto => crypto.change24h > 0);
                } else if (change === 'negative') {
                    filteredData = filteredData.filter(crypto => crypto.change24h < 0);
                }
            }
            
            // Aplicar termo de busca atual
            const searchInput = document.getElementById('searchInput');
            if (searchInput && searchInput.value.trim() !== '') {
                const searchTerm = searchInput.value.trim().toLowerCase();
                filteredData = filteredData.filter(crypto => 
                    crypto.name.toLowerCase().includes(searchTerm) || 
                    crypto.symbol.toLowerCase().includes(searchTerm)
                );
            }
            
            // Ordenar dados
            filteredData.sort((a, b) => {
                let valueA, valueB;
                
                switch (column) {
                    case 'name':
                        valueA = a.name.toLowerCase();
                        valueB = b.name.toLowerCase();
                        break;
                    case 'price':
                        valueA = a.price;
                        valueB = b.price;
                        break;
                    case 'change':
                        valueA = a.change24h;
                        valueB = b.change24h;
                        break;
                    case 'marketCap':
                        valueA = a.marketCap;
                        valueB = b.marketCap;
                        break;
                    case 'volume':
                        valueA = a.volume24h;
                        valueB = b.volume24h;
                        break;
                    default:
                        return 0;
                }
                
                if (valueA < valueB) {
                    return currentSort.direction === 'asc' ? -1 : 1;
                }
                if (valueA > valueB) {
                    return currentSort.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
            
            // Renderizar tabela com dados ordenados
            renderCryptoTable(filteredData);
        });
    });
}

function setupPagination() {
    const paginationItems = document.querySelectorAll('.pagination-item');
    const paginationArrows = document.querySelectorAll('.pagination-arrow');
    
    paginationItems.forEach(item => {
        item.addEventListener('click', function() {
            paginationItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            loadCryptoData();
        });
    });
    
    paginationArrows.forEach(arrow => {
        if (!arrow.classList.contains('disabled')) {
            arrow.addEventListener('click', function() {
                const activePage = document.querySelector('.pagination-item.active');
                if (activePage) {
                    const currentPage = parseInt(activePage.textContent);
                    const isNext = this.classList.contains('pagination-next');
                    
                    const targetPage = isNext ? currentPage + 1 : currentPage - 1;
                    const targetPageElement = document.querySelector(`.pagination-item:nth-child(${targetPage + 1})`);
                    
                    if (targetPageElement) {
                        paginationItems.forEach(i => i.classList.remove('active'));
                        targetPageElement.classList.add('active');
                        
                        loadCryptoData();
                    }
                }
            });
        }
    });
}

function updateResultCount(count) {
    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        resultCount.textContent = count;
    }
}

function formatCurrency(value) {
    if (value >= 1000) {
        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (value >= 1) {
        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 });
    }
}

function formatCompactNumber(value) {
    if (value >= 1000000000000) {
        return '$' + (value / 1000000000000).toFixed(2) + ' T';
    }
    if (value >= 1000000000) {
        return '$' + (value / 1000000000).toFixed(2) + ' B';
    }
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(2) + ' M';
    }
    if (value >= 1000) {
        return '$' + (value / 1000).toFixed(2) + ' K';
    }
    return '$' + value.toFixed(2);
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

