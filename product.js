//Importing ProductHandler class from ./classes/ProductHandler.js   

import ProductHandler from '../classes/ProductHandler.js'; //var tvungen att lägga in type="module" i script-taggen

(()=>{
//i HTMl annars funkade inte detta
const ph = new ProductHandler();
const url = new URL(location.href);
const product = ph.getByID(url.searchParams.get('id'));


//om produkten ej finns
if (!product) {
    document.querySelector(".product-landing-page").innerHTML=`
    <div>Produkten du söker efter finns tyvärr inte :-(</div>
    `
    return   
}

//annars kör vi
console.log(product);
document.querySelector(".product-landing-page").innerHTML=`
<p class="product-title1"><b>${product.title}</b></p>
<div class="product-wrapper">
    <div class="product-img-div">
        <img class="product-img1" src="${product.link}" referrerpolicy="no-referrer">
    </div>  
    <div class="product-aside">
        <p class="product-price1"><b>${product.price} kr</b></p>
        <div class="product-btns">
            <button class="add-cart">Lägg i varukorg</button>
            <span href="" class="fas fa-heart add-Wishlist"></span>
        </div>
        <p class="product-stock1"></p>
    </div>
</div>
<section class="section-description">
    <p class="product-description1">${product.description}</p>
    <p class="product-articleno">Vårt artikelnummer: ${product.id}</p>
</section>
`
if (product.stock > "1") {
    document.querySelector(".product-stock1").innerHTML = `
    Lagerstatus: ${product.stock} produkter i lager.
    `
}

else if (product.stock === "1") {
    document.querySelector(".product-stock1").innerHTML = `
    Lagerstatus: ${product.stock} produkt i lager.
    `
}

else {
    document.querySelector(".product-stock1").innerHTML = `
    Lagerstatus: Produkten är tyvärr slut.
    `
}

//Button Selectors
const cartBtn = document.querySelector(".add-cart");
const wishListBtn = document.querySelector(".add-Wishlist");

//Local storage selectors
//const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//const cart = JSON.parse(localStorage.getItem("cart")) || [];

//eventlisteners
cartBtn.addEventListener("click", ()=>{addToCartModal(product.id)});
wishListBtn.addEventListener("click", ()=>{addToWishlistModal(product.id)});
//function for add cart btn
function setCartLocalStorage (cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//function for add wishlist btn
function setWishlistLocalStorage (wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

//function for add product to wishlist
function addToWishlistModal(id) {
    let wishlistObject = {id:id, qty:1};
    let product = ph.getByID(id);
    if (!product) return null;
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistIndex = wishlist.findIndex(i => i.id === id);
    
    if (wishlistIndex > -1) 
        wishlist[wishlistIndex].qty += 1
    else
        wishlist.push(wishlistObject)

    setWishlistLocalStorage(wishlist)
}

//function for add product to cart

function addToCartModal(id) {
    let cartObject = {id:id, qty:1};
    let product = ph.getByID(id);
    if (!product) return null;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartIndex = cart.findIndex(i => i.id === id);
    
    if (cartIndex > -1)
        cart[cartIndex].qty += 1
    else
        cart.push(cartObject)

    setCartLocalStorage(cart)
}

function getWishlistProducts () {
     let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.map(i => {
         i.product = ph.getByID(i.id)
         return i
     })
 }
    let test = getWishlistProducts()
    console.log(test)
})();
