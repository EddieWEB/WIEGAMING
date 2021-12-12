const itemList = document.querySelector("#item-list")
const itemName = document.querySelector("#item-name")
const itemPrice = document.querySelector("#item-price")
const itemQty = document.querySelector("#item-qty")
const wishlistTotal = document.querySelector("#wishlist-total")
const addAllToCart = document.querySelector(".add-all-to-cart")

/* ********** Det här ska ersätta det som står nedanför när det finns en wishlist array att hämta från produktsidan ********
*******DUBBELKOLLA addItemCart funktionen så att den passar med detta*********************
const wishlistStr = localStorage.getItem("wishlist")
const wishlist = JSON.parse(wishlistStr)
const cartStr = localStorage.getItem("cart")
const cart = JSON.parse(cartStr)
*/

const wishlist = [{name: "Game", price: 2, qty: 1}, {name: "Laptop", price: 4, qty: 1}, {name: "Chair", price: 3, qty: 1}, {name: "Konsol", price: 10, qty: 1}]
const cart = []
/* ******* showItems gör att det som finns i de inkommande arrayerna visas direkt utan att man behöver klicka någonstans ****
funktionen showItem finns längre ned i den här koden.
*/
showItem()


// --------------------------------------------------------------------
// HANDLE BUTTON CLICKS, DEPENDING ON BUTTON CLASS NAME
itemList.onclick = function(e) {
    if(e.target && e.target.classList.contains("remove")) {
        const name = e.target.dataset.name
        removeItem(name)
    } else if(e.target && e.target.classList.contains("add-one")) {
        const name = e.target.dataset.name
        addItem(name)
    } else if(e.target && e.target.classList.contains("remove-one")) {
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
    else if(e.target && e.target.classList.contains("add-to-cart")) {
        const name = e.target.dataset.name
        const price = e.target.dataset.price
        addItemCart(name, price)
    }
}

// --------------------------------------------------------------------
// ADD MORE ITEMS TO WISHLIST
function addItem(name, price) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
            wishlist[i].qty +=1
            showItem()
            return
        }
    }
    const item = {name, price, qty: 1}
    wishlist.push(item)
    showItem()
}
// --------------------------------------------------------------------
// ADD ITEMS TO CART
function addItemCart(name, price) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
            wishlist[i].qty -=1
        }
    }
    const item = {name, price, qty: 1}
    cart.push(item)

    /* **** PROBLEM HÄR: VARFÖR SÄTTER DEN PRICE SOM STRING? VARFÖR GÅR DET INTE NÄR VARUKORGEN ÄR TOM? *******
    const cartStr = localStorage.getItem("cart")
    const incomingCart = JSON.parse(cartStr)
    cart.push(...incomingCart);
    localStorage.setItem("cart", JSON.stringify(cart))
    */
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
            wishlist.splice([i], 1)
        }
    }
    showItem()
}

// --------------------------------------------------------------------
// SHOW ITEM
function showItem() {
    itemQty.innerHTML = `You have ${getQty()} items in your wishlist`
    let itemStr = ""
    for (let i=0; i < wishlist.length; i+=1) {
        const {name, price, qty} = wishlist[i]

        itemStr += `<li>${name} $${price} x ${qty} = $${qty * price} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}">+</button>
        <button class="remove-one" data-name="${name}">-</button>
        <button class="add-to-cart" type="submit" data-name="${name}" data-price="${price}">Add To Cart</button>
        </li>`
    }
    itemList.innerHTML = itemStr
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
// REMOVE ITEM

function removeItem(name, qty = 0) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
            if(qty > 0) {
                wishlist[i].qty -= 1
            }
            if(wishlist[i].qty < 1 || qty === 0) {
                wishlist.splice(i, 1)
            }
            showItem()
            return
        }
    }
}

// --------------------------------------------------------------------
// BUTTON THAT ADD WISHLIST AND CART TO LOCAL STORAGE. ALSO CLEAR THE WISHLIST ARRAY.
addAllToCart.onclick = function(e) {
    if(e.target && e.target.classList.contains("add-all-to-cart")) {
        cart.push(...wishlist)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    wishlist.splice(0, wishlist.length)
    showItem()
}

/*  ************* SLÅ IHOP WISHLIST OCH CART I BARA CART INNAN DE FLYTTAS TILL LOCAL STORAGE
*/

// --------------------------------------------------------------------
// TEST PRODUCTS

/*
addItem("Game", 2,)
addItem("Chair", 1)
addItem("Game", 2)
addItem("Laptop", 4)
addItem("Game", 2)
addItem("Chair", 1)
addItemCart("Game", 2)
*/
