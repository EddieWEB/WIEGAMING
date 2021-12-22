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
const cartTotal = document.querySelector(".cart-total")
const purchase = document.querySelector(".purchase-button")

const cart = JSON.parse(localStorage.getItem("cart")) || [{title: "Chair", price: 50, qty: 2, id: "5555"},{title: "Game", price: 40, qty: 1, id: "1111"}]

showProduct()

// --------------------------------------------------------------------
// setItem cart to local storage
function setCartLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
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
        setCartLocalStorage()
    } else if(e.target && e.target.classList.contains("remove-one")) {
        const id = e.target.dataset.id
        removeProduct(id, 1)
    }
}

// --------------------------------------------------------------------
// BUTTON THAT ADD CART TO LOCAL STORAGE.
purchase.onclick = function(e) {
    if(e.target && e.target.classList.contains("purchase-button")) {
        setCartLocalStorage()
    }
    showProduct()
}

// --------------------------------------------------------------------
// ADD PRODUCT TO CART
function addProduct(id) {
    for(let i=0; i < cart.length; i+=1) {
        if(cart[i].id === id) {
            cart[i].qty +=1
            showProduct()
            return
        }
    }
}

// --------------------------------------------------------------------
// SHOW PRODUCT
function showProduct() {
    productQty.innerHTML = `You have ${getQty()} products in your cart`
    let productStr = ""
    for (let i=0; i < cart.length; i+=1) {
        const {title, price, qty, id} = cart[i]

        productStr += `<li>${title} $${price} x ${qty} = $${qty * price} 
        <button class="remove" data-id="${id}">Remove</button>
        <button class="add-one" data-id="${id}">+</button>
        <button class="remove-one" data-id="${id}">-</button>
        </li>`
    }
    productList.innerHTML = productStr
    cartTotal.innerHTML = `Cart total: ${getTotal()}`
}
// --------------------------------------------------------------------
// GET QTY
function getQty() {
    let qty = 0
    for(let i=0; i < cart.length; i+=1) {
        qty += cart[i].qty
    }
    return qty
}

// --------------------------------------------------------------------
// GET TOTAL
function getTotal() {
    let total = 0
    for(let i=0; i < cart.length; i+=1) {
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

// --------------------------------------------------------------------
// REMOVE PRODUCT
function removeProduct(id, qty = 0) {
    for(let i=0; i < cart.length; i+=1) {
        if(cart[i].id === id) {
            if(qty > 0) {
                cart[i].qty -= 1
            }
            if(cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            setCartLocalStorage()
            showProduct()
            return
        }
    }
}