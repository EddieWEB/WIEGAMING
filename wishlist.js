/*
import ProductHandler from '../classes/ProductHandler.js';
const ph = new ProductHandler();

function getCartLocalStorage () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return wishlist.map(i => {
        i.product = ph.getByID(i.id)
        return i
    })
}*/

const productList = document.querySelector(".product-list")
const productQty = document.querySelector(".product-qty")
const wishlistTotal = document.querySelector(".wishlist-total")
const addAllToCart = document.querySelector(".add-all-to-cart")

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [{title: "Game", price: 2, qty: 1, id: "1337"}, {title: "Chair", price: 3, qty: 1, id: "8888"}]
const cart = JSON.parse(localStorage.getItem("cart")) || [{title: "Game", price: 2, qty: 1, id: "7331"}]

showProduct()

// --------------------------------------------------------------------
// setItem cart to local storage
function setCartLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// --------------------------------------------------------------------
// setItem wishlist to local storage
function setWishlistLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// --------------------------------------------------------------------
// HANDLE BUTTON CLICKS ON PRODUCTS
productList.onclick = function(e) {
    if(e.target && e.target.classList.contains("remove")) {
        const id = e.target.dataset.id
        removeProduct(id)
    } else if(e.target && e.target.classList.contains("add-one")) {
        const id = e.target.dataset.id
        addProduct(id)
        setWishlistLocalStorage()
    } else if(e.target && e.target.classList.contains("remove-one")) {
        const id = e.target.dataset.id
        removeProduct(id, 1)
    } else if(e.target && e.target.classList.contains("add-to-cart")) {
        const id = e.target.dataset.id
        addProductCart(id)
    }
}

// --------------------------------------------------------------------
// BUTTON THAT ADD WISHLIST AND CART TO LOCAL STORAGE. ALSO CLEAR THE WISHLIST ARRAY.
addAllToCart.onclick = function(e) {
    if(e.target && e.target.classList.contains("add-all-to-cart")) {
        cart.push(...wishlist)
        setCartLocalStorage()
    }
    wishlist.splice(0, wishlist.length)
    showProduct()
}
// --------------------------------------------------------------------
// ADD PRODUCT TO WISHLIST
function addProduct(id) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].id === id) {
            wishlist[i].qty +=1
            showProduct()
            return
        }
    }
}

// --------------------------------------------------------------------
// ADD PRODUCTS TO CART
function addProductCart(id) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].id === id) {
            cart.push(wishlist[i])
        }
    }

    setCartLocalStorage()

    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].id === id) {
            wishlist.splice([i], 1)
        }
    }
    setWishlistLocalStorage()
    
    showProduct()
}

// --------------------------------------------------------------------
// SHOW PRODUCT
function showProduct() {
    productQty.innerHTML = `You have ${getQty()} products in your wishlist`
    let productStr = ""
    for (let i=0; i < wishlist.length; i+=1) {
        const {title, price, qty, id} = wishlist[i]

        productStr += `<li>${title} $${price} x ${qty} = $${qty * price} 
        <button class="remove" data-id="${id}">Remove</button>
        <button class="add-one" data-id="${id}">+</button>
        <button class="remove-one" data-id="${id}">-</button>
        <button class="add-to-cart" type="submit" data-id="${id}">Add To Cart</button>
        </li>`
    }
    productList.innerHTML = productStr
    wishlistTotal.innerHTML = `Wishlist total: ${getTotal()}`
}

// --------------------------------------------------------------------
// GET QTY
function getQty() {
    let qty = 0
    for(let i=0; i < wishlist.length; i+=1) {
        qty += wishlist[i].qty
    }
    return qty
}

// --------------------------------------------------------------------
// GET TOTAL
function getTotal() {
    let total = 0
    for(let i=0; i < wishlist.length; i+=1) {
        total += wishlist[i].price * wishlist[i].qty
    }
    return total.toFixed(2)
}

// --------------------------------------------------------------------
// REMOVE PRODUCT
function removeProduct(id, qty = 0) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].id === id) {
            if(qty > 0) {
                wishlist[i].qty -= 1
            }
            if(wishlist[i].qty < 1 || qty === 0) {
                wishlist.splice(i, 1)
            }
            setWishlistLocalStorage()
            showProduct()
            return
        }
    }
}