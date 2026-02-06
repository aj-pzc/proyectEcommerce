
// Detectar si estamos en la raíz o dentro de HTML
const isInHtmlFolder = window.location.pathname.includes('/HTML/');
const basePath = isInHtmlFolder ? '../' : './';

const badge = document.querySelector('.site-header__cart-badge');
const checkoutBtn = document.querySelector('.cart__checkoutBtn');
const checkoutContainer = document.querySelector('.cart__checkout-container');
const emptyCart = document.querySelector('.cart__emptyMessage');

const badgeCounter = () => {
    const items = document.querySelectorAll('.cart__item');
    const count = items.length;
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('badge-oculto');
        checkoutBtn.classList.remove('cart__checkoutBtn-oculto');
        emptyCart.classList.add('cart__emptyMessage-oculto');
        

    } else {
        badge.textContent = 0;
        badge.classList.add('badge-oculto');
        checkoutBtn.classList.add('cart__checkoutBtn-oculto');
        emptyCart.classList.remove('cart__emptyMessage-oculto');
        
    }
}

const removeItem = (removeBtn) => {
    const parent = removeBtn.parentElement;
    parent.remove();
    badgeCounter();
}

const updateListeners = () => {
    const removeEvent = document.querySelectorAll('.cart__item-remove');
    removeEvent.forEach(btn => {
        btn.removeEventListener('click', removeItem);
        btn.addEventListener('click', () => removeItem(btn));
    });
}

const cartIcon = document.querySelector('.site-header__cart');
cartIcon.addEventListener('click', () => {
    cart.classList.toggle('show');
});

const cart = document.querySelector('.cart');
const addToCart = document.querySelectorAll('.products__add-to-cart');
addToCart.forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.closest('.products__item');
        const productImg = product.querySelector('.products__img').src;
        const productName = product.querySelector('.products__title').textContent;
        const productPrice = product.querySelector('.products__price').textContent;

        const item = document.createElement('div');
        item.className = 'cart__item';
        item.innerHTML = `
            <img class="cart__item-img" src="${productImg}" alt="${productName}">
            <p class="cart__item-title">${productName}</p>
            <p class="cart__item-price">${productPrice}</p>
            <i class="cart__item-remove"><img src="${basePath}Media/HomeScreen/Icons/Header/trash.svg" alt="Icono Quitar" class="delete-icon"/></i>
        `;

        if (checkoutContainer) {
            cart.insertBefore(item, checkoutContainer);
        } else {
            cart.insertBefore(item, checkoutBtn);
        }
        updateListeners();
        badgeCounter();
    });
});

updateListeners();
badgeCounter();

const menuIcon = document.querySelector('.site-header__menu-button');
const menu = document.querySelector('.menu');
menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show');
});

const menuClose = document.querySelector('.menu__close');
if (menuClose) {
    menuClose.addEventListener('click', () => {
        menu.classList.remove('show');
    });
}

const menuCartLink = document.querySelector('.menu__nav-cart');
menuCartLink.addEventListener('click', () => {
   cart.classList.add('show');
    menu.classList.remove('show');
});




