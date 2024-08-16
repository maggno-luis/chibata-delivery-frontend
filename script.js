import API_URL from "./config";

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = API_URL;
    const productContainer = document.querySelector('.product-container');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    let currentPage = 0;
    let totalPages = 0;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            totalPages = data.totalPages;
            renderProducts(data.content);
            updatePaginationButtons();
            renderNameProfile();
        })
        .catch(error => console.error('Erro ao obter dados dos produtos:', error));

    function renderProducts(products) {
        productContainer.innerHTML = '';
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.setAttribute('data-product-id', product.id);

            card.innerHTML = `
                <img src="${product.pathImage}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>R$ ${product.price},00</p>
                <div class="quantity">
                    <button class="quantity-btn decrease-btn"><img src="../images/minus-solid.svg"></button>
                    <p class="quantity-value">0</p>
                    <button class="quantity-btn increase-btn"><img src="../images/plus-solid.svg"></button>
                </div>
            `;

            productContainer.appendChild(card);
        });

        const decreaseButtons = document.querySelectorAll('.decrease-btn');
        const increaseButtons = document.querySelectorAll('.increase-btn');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
    }

    function renderNameProfile(){
        const nameProfile = document.getElementById('name-profile');
        const name = localStorage.getItem('name');
        if(name === null || name === "" || name === undefined){
            nameProfile.innerHTML = `<a href="login.html">Faça o seu login</a>`;
        }else{
            nameProfile.innerText = `Olá, ${name}`;
        }
    }

    function updatePaginationButtons() {
        prevPageButton.disabled = currentPage === 0;
        nextPageButton.disabled = currentPage === totalPages - 1;
    }

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            fetchProducts();
        }
    });

    nextPageButton.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            fetchProducts();
        }
    });

    function fetchProducts() {
        fetch(`${apiUrl}?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                renderProducts(data.content);
                updatePaginationButtons();
            })
            .catch(error => console.error('Erro ao obter dados dos produtos:', error));
    }

    function decreaseQuantity(event) {
        const item = event.target.closest('.product-card');
        const quantityElement = item.querySelector('.quantity-value');
        let quantity = parseInt(quantityElement.textContent);

        if (quantity > 0) {
            quantity--;
            quantityElement.textContent = quantity;
            updateLocalStorage(item);
        }
    }

    function increaseQuantity(event) {
        const item = event.target.closest('.product-card');
        const quantityElement = item.querySelector('.quantity-value');
        let quantity = parseInt(quantityElement.textContent);

        quantity++;
        quantityElement.textContent = quantity;
        updateLocalStorage(item);
    }

    function updateLocalStorage(item) {
        const productId = item.getAttribute('data-product-id');
        const productName = item.querySelector('h3').textContent;
        const price = item.querySelector('p').textContent.replace('Preço: ', '');
        const quantity = parseInt(item.querySelector('.quantity-value').textContent);
        const pathImage = item.querySelector('img').src;

        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        if (cart[productId]) {
            cart[productId].quantity = quantity;
        } else {
            cart[productId] = {
                name: productName,
                price: price,
                quantity: quantity,
                pathImage: pathImage
            };
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartQuantity();
        showProductsModal();
        calculateProductPrices();

    }
});

function calculateProductPrices(){
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const priceFull = document.querySelector('.price-full');

    let totalPrice = 0;

    for (let id in cartItems) {
        if (cartItems.hasOwnProperty(id)) {
            const item = cartItems[id];
            const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            const quantity = item.quantity;
            
            const itemTotal = price * quantity;
            
            totalPrice += itemTotal;
        }
    }

    priceFull.innerHTML = `Preço Total: R$ ${totalPrice.toFixed(2).replace('.',',')}`;
    console.log(`Preço total: R$ ${totalPrice.toFixed(2)}`);

}

function showProductsModal() {
    const cardContainer = document.querySelector('.card-selected-products');
    const produtos = JSON.parse(localStorage.getItem('cart')) || {};

    if (Object.keys(produtos).length === 0) {
        cardContainer.innerHTML = '<h3>Carrinho vazio</h3>';
        return;
    }

    cardContainer.innerHTML = '';

    for (const key in produtos) {
        if (Object.hasOwnProperty.call(produtos, key)) {
            const product = produtos[key];
            const cardHTML = `
                <div class="card">
                    <div class="infos-card">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <p>Quantidade: ${product.quantity}</p>
                    </div>
                    <img src="${product.pathImage}">
                </div>
            `;
            cardContainer.innerHTML += cardHTML;
        }
    }
}

const btnClear = document.getElementById('btn-clear');
btnClear.addEventListener('click', clearProductsCart);

function clearProductsCart() {
    localStorage.removeItem('cart');
    const quantity = document.querySelector("#quantity-products-cart");
    quantity.innerHTML = 0;
    showProductsModal();
    if(!localStorage.getItem('cart')){
        resetCartPrice();
    }
}

function resetCartPrice(){
    const priceFull = document.querySelector('.price-full');
    priceFull.innerHTML = `Preço Total: R$ 0,00`;
    resetQuantity();
}

function resetQuantity(){
    const quantityElements = document.querySelectorAll('.quantity-value');
    quantityElements.forEach(element => {
        element.textContent = 0;
    });
}

function updateCartQuantity() {
    let quantity = document.querySelector("#quantity-products-cart");
    const produtos = JSON.parse(localStorage.getItem('cart')) || {};
    const quantidade = Object.keys(produtos).length
    quantity.innerHTML = quantidade;
    console.log(quantidade);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartQuantity();
    showProductsModal(); 
    calculateProductPrices();
});

function openCartModal() {
    document.getElementById('cart-modal').style.display = 'block';
    exibirProdutosNoModal();
}

function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}
