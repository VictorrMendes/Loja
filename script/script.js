const car = document.querySelector('.add-cart');

car.addEventListener('click', () => {
    console.log('Carro adicionado ao carrinho');
});





// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});

// Cart Working
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Remove buttons
    var removeCartItemButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add to cart
    var addCartButtons = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener('click', addCartClicked);
    }

    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

    // Size Buttons Logic
    var sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}

// Buy button
function buyButtonClicked() {
    var whatsappMessage = generateWhatsAppMessage();
    window.open(`https://api.whatsapp.com/send?phone=5531991737075&text=${encodeURIComponent(whatsappMessage)}`);

    var cartContent = document.getElementsByClassName('cart-content')[0];

    // Limpar o carrinho
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    
    // Atualizar total e quantidade após limpar o carrinho
    updateCartCount(); 
    updateCartTotal();

}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.closest('.product-box');
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

    // Obter o tamanho selecionado
    var selectedSizeButton = shopProducts.querySelector('.size-btn.selected');
    if (!selectedSizeButton) {
        alert('Por favor, selecione um tamanho.');
        return;
    }
    var size = selectedSizeButton.dataset.size;

    addProductToCart(title, price, productImg, size);
    updateCartTotal();
    updateCartCount();
}

function addProductToCart(title, price, productImg, size) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItens = document.getElementsByClassName('cart-content')[0];

    var cartBoxContents = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title} - Tamanho: ${size}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContents;
    cartItens.append(cartShopBox);

    // Adicionar eventos de remover e alteração de quantidade
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    updateCartTotal();
    updateCartCount();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
    updateCartCount();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
    updateCartCount();
}

function generateWhatsAppMessage() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var message = 'Olá, gostaria de realizar a compra dos seguintes itens:\n\n';

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName('cart-product-title')[0].innerText;
        var price = cartBox.getElementsByClassName('cart-price')[0].innerText;
        var quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;

        message += `${quantity}x ${title} - ${price}\n`;
    }

    var total = document.getElementsByClassName('total-price')[0].innerText;
    message += `\nTotal: ${total}`;

    return message;
}

// Update the cart count
function updateCartCount() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var totalItems = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var quantityElement = cartBoxes[i].getElementsByClassName('cart-quantity')[0];
        var quantity = parseInt(quantityElement.value);
        totalItems += quantity;
    }

    document.getElementById('cart-count').innerText = totalItems;
}

// Update cart total
function updateCartTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('R$', '').replace(',', '.'));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = `R$${total.toFixed(2).replace('.', ',')}`;
}

// Filtro
let filterButtons = document.querySelectorAll('.filter-btn');
let productBoxes = document.querySelectorAll('.product-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        let category = button.getAttribute('data-category');

        productBoxes.forEach(box => {
            if (category === 'all' || box.getAttribute('data-category') === category) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});


//carrocel

const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

function showSlide(n) {
    carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === n);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === n);
    });

    currentIndex = n;
}

function nextSlide() {
    showSlide((currentIndex + 1) % carouselItems.length);
}

function prevSlide() {
    showSlide((currentIndex - 1 + carouselItems.length) % carouselItems.length);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

showSlide(currentIndex);
setInterval(nextSlide, 4000);

//fim do carrocel


// Parallax
const hill1 = document.querySelector('#hill1');
hill2 = document.querySelector('#hill2');
hill3 = document.querySelector('#hill3');
tree = document.querySelector('#tree');
leaf = document.querySelector('#leaf');
banner = document.querySelector('.banner');

window.addEventListener('scroll', function () {
    let value = window.scrollY;

    banner.style.marginTop = value * 0.2 + 'px';

    hill1.style.bottom = -value * 1 + 'px';
    hill2.style.left = -value * 0.75 + 'px';
    hill3.style.right = -value * 0.75 + 'px';

    leaf.style.top = value * -0.75 + 'px';
    leaf.style.left = value * 0.75 + 'px';
});