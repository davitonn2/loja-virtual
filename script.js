const products = [
    { id: 1, name: "Smartphone X", category: "Eletrônicos", stock: 10, price: 999.99, image: "img/iphonex_front_back_glass_big.jpg.large.jpg" },
    { id: 2, name: "Notebook Pro", category: "Eletrônicos", stock: 5, price: 1999.99, image: "img/notebookPro.jpg" },
    { id: 3, name: "Fone de Ouvido", category: "Eletrônicos", stock: 20, price: 99.99, image: "img/fonedeouvido.jpg" },
    { id: 4, name: "Camiseta Azul", category: "Roupas", stock: 15, price: 29.99, image: "img/camisetaAzul.jpg" },
    { id: 5, name: "Calça Jeans", category: "Roupas", stock: 12, price: 59.99, image: "img/calcaJeans.jpg" },
    { id: 6, name: "Jaqueta de Couro", category: "Roupas", stock: 8, price: 129.99, image: "img/jaquetaCouro.jpg" },
    { id: 7, name: "Relógio Digital", category: "Acessórios", stock: 25, price: 49.99, image: "img/relogioDigital.jpg" },
    { id: 8, name: "Óculos de Sol", category: "Acessórios", stock: 18, price: 39.99, image: "img/oculosDeSol.jpg" },
    { id: 9, name: "Cinto de Couro", category: "Acessórios", stock: 30, price: 19.99, image: "img/cintoCouro.jpg" },
    { id: 10, name: "Smartwatch", category: "Eletrônicos", stock: 7, price: 149.99, image: "img/smartwatch.jpg" },
    { id: 11, name: "Tablet", category: "Eletrônicos", stock: 4, price: 299.99, image: "img/tablet.jpg" },
    { id: 12, name: "Camera Digital", category: "Eletrônicos", stock: 3, price: 499.99, image: "img/cameraDigital.jpg" },
    { id: 13, name: "Camisa Polo", category: "Roupas", stock: 10, price: 34.99, image: "img/camisaPolo.jpg" },
    { id: 14, name: "Shorts Esportivo", category: "Roupas", stock: 20, price: 24.99, image: "img/shortEsportivo.jpg" },
    { id: 15, name: "Vestido de Flor", category: "Roupas", stock: 6, price: 49.99, image: "img/vestidoFloral.jpg" },
    { id: 16, name: "Boné", category: "Acessórios", stock: 22, price: 14.99, image: "img/bone.jpg" },
    { id: 17, name: "Mochila", category: "Acessórios", stock: 15, price: 69.99, image: "img/mochila.jpg" },
    { id: 18, name: "Carteira", category: "Acessórios", stock: 28, price: 29.99, image: "img/carteira.jpg" },
    { id: 19, name: "Televisão 4K", category: "Eletrônicos", stock: 2, price: 799.99, image: "img/tv.jpg" },
    { id: 20, name: "Console de Jogos", category: "Eletrônicos", stock: 5, price: 399.99, image: "img/console.jpg" },
    { id: 21, name: "Mouse Sem Fio", category: "Eletrônicos", stock: 15, price: 29.99, image: "img/mouse.jpg" },
    { id: 22, name: "Camiseta Estampada", category: "Roupas", stock: 18, price: 19.99, image: "img/camisetaEstampada.jpeg" },
    { id: 23, name: "Saia", category: "Roupas", stock: 7, price: 39.99, image: "img/saia.jpg" },
    { id: 24, name: "Blusa de Lã", category: "Roupas", stock: 9, price: 59.99, image: "img/camisaLa.jpg" },
    { id: 25, name: "Pulseira", category: "Acessórios", stock: 25, price: 9.99, image: "img/pulseira.png" },
    { id: 26, name: "Colar", category: "Acessórios", stock: 20, price: 24.99, image: "img/colar.jpg" },
    { id: 27, name: "Anel", category: "Acessórios", stock: 30, price: 14.99, image: "img/anel.jpg" },
    { id: 28, name: "Carregador Portátil", category: "Eletrônicos", stock: 12, price: 19.99, image: "img/carregadorPortatil.jpg" },
    { id: 29, name: "Teclado Mecânico", category: "Eletrônicos", stock: 8, price: 89.99, image: "img/teclado.jpg" },
    { id: 30, name: "Caixa de Som Bluetooth", category: "Eletrônicos", stock: 6, price: 59.99, image: "img/caixaDeSom.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function mostrarProdutos(filteredProducts) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card bg-white p-4 rounded-lg shadow-md';
        card.innerHTML = `
            <img src="${product.image || `https://via.placeholder.com/150?text=${product.name}`}" alt="${product.name}" class="w-full h-48 object-cover rounded-t-md">
            <h3 class="text-lg font-bold mt-2">${product.name}</h3>
            <p class="text-gray-600">Categoria: ${product.category}</p>
            <p class="text-gray-600">Estoque: ${product.stock}</p>
            <p class="text-green-600 font-bold">R$${product.price.toFixed(2)}</p>
            <button class="bg-blue-600 text-white px-4 py-2 mt-2 rounded ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                ${product.stock === 0 ? 'disabled' : ''} 
                onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productsDiv.appendChild(card);
    });
}

function adicionarAoCarrinho(productId) {
    const product = products.find(p => p.id === productId);
    if (product.stock === 0) {
        alert('Produto sem estoque!');
        return;
    }
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else {
            alert('Quantidade máxima em estoque atingida!');
            return;
        }
    } else {
        cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartModal() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Carrinho vazio</p>';
        return;
    }
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center mb-2';
        itemDiv.innerHTML = `
            <p>${item.name} - ${item.quantity}x R$${item.price.toFixed(2)}</p>
            <button class="bg-red-600 text-white px-2 py-1 rounded" onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

function removerDoCarrinho(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        if (cart[cartItemIndex].quantity > 1) {
            cart[cartItemIndex].quantity--;
        } else {
            cart.splice(cartItemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartModal();
    }
}

function finalizarCompra() {
    if (cart.length === 0) {
        alert('Carrinho vazio!');
        return;
    }
    alert('Compra finalizada com sucesso!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
    document.getElementById('cart-modal').classList.add('hidden');
}

function procurarProdutos(term) {
    term = term.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
    );
}


document.getElementById('cart-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.toggle('hidden');
    updateCartModal();
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
});

document.getElementById('checkout-btn').addEventListener('click', finalizarCompra);

document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    const filteredProducts = searchProducts(searchTerm);
    displayProducts(filteredProducts);
});


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    if (category) {
        displayProducts(products.filter(p => p.category === category));
    } else {
        displayProducts(products);
    }
    updateCartCount();
});