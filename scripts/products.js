import ProductHandler from '../classes/ProductHandler.js';
const ph = new ProductHandler();
const url = new URL(location.href);

const products = ph.getByCategory(url.searchParams.get('category'))

products.forEach(product => {
    if (!product.id) return;
    let tag = document.createElement("product-card");
    tag.data = product;
    document.querySelector('body').appendChild(tag);
});

///products.html?category=Musmattor
///products.html?category=Skärmar

