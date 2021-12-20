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
})();


const ph = new ProductHandler();
const url = new URL(location.href);
const product = ph.getByID(url.searchParams.get('id'));

//Button Selectors
const cartBtn = document.querySelector(".add-cart");
const wishListBtn = document.querySelector(".add-Wishlist");

//Local storage selectors
const wishlist = JSON.parse(localStorage.getItem("wishlsit")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];

//eventlisteners
cartBtn.addEventListener("click", addToCart);
wishListBtn.addEventListener("click", addToWishlist);

//function for add cart btn
function setCartLocalStorage () {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//function for add wishlist btn
function setWishlistLocalStorage () {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

//function for add product to wishlist
function addToWishlist(id) {
    for(let i=0; i < products.length; i+=1) {
        if(products[i].id === id) {
            for(let i=0; i < wishlist.length; i+=1) {
                if(wishlist[i].id === id) {
                    wishlist[i].qty +=1
                    setWishlistLocalStorage()
                    return
                }
                products[i].qty = 1
                wishlist.push(products[i])
                setWishlistLocalStorage()
            }
        }
    }
}

//function for add product to cart
function addToCart(id) {
    for(let i=0; i < products.length; i+=1) {
        if(products[i].id === id) {
            for(let i=0; i < cart.length; i+=1) {
                if(cart[i].id === id) {
                    cart[i].qty +=1
                    setCartLocalStorage()
                    return
                }
                products[i].qty = 1
                cart.push(products[i])
                setCartLocalStorage()
            }
        }
        return
    }
}