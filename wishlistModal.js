// selectors Modal
const modal = document.querySelector(".wishlist-modal");
const wishlistKnapp = document.querySelector(".fa-heart");
const closeWishlistModal = document.querySelector(".close-btn");

//addeventlistener för att öppna modalen
wishlistKnapp.addEventListener("click", openWishlist);
closeWishlistModal.addEventListener("click", closeWishlist);

// addeventlistener för att stänga om man klickar utanför
document.addEventListener("click", outsideClick)

//funktion för att öppna varukorgsmodal
function openWishlist () {
    modal.style.display = "block";
}

//funktion för att stänga varukorgsmodal med stängknappen
function closeWishlist () {
    modal.style.display = "none";
}

//Funktion för att stänga varukorgsmodal om man klickar utanför varukorgen
function outsideClick(click) {
    if (click.target === modal) {
        modal.style.display = "none";
    }
}

//Selectors innehåll wishlist
const productList = document.querySelector("#product-list")
const productName = document.querySelector("#product-name")
const productPrice = document.querySelector("#product-price")
const productQty = document.querySelector("#product-qty")
const wishlistTotal = document.querySelector("#wishlist-total")
const addAllToCart = document.querySelector(".add-all-to-cart")

//dummyprodukter
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [{name: "Game", price: 2, qty: 1}, {name: "Chair", price: 3, qty: 1}]
const cart = JSON.parse(localStorage.getItem("cart")) || [{name: "Laptop", price: 4, qty: 1}]

showProduct()

// --------------------------------------------------------------------
// setItem cart to local storage
function setCartLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// --------------------------------------------------------------------
// getItem cart to local storage *************ANVÄNDS NÄR DET KOPPLAS IHOP MED PRODUKTSIDAN******************
function getCartLocalStorage() {
    localStorage.getItem('cart', JSON.parse(cart));
}

// --------------------------------------------------------------------
// setItem wishlist to local storage
function setWishlistLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// --------------------------------------------------------------------
// getItem wishlist to local storage *************ANVÄNDS NÄR DET KOPPLAS IHOP MED PRODUKTSIDAN******************
function getWishlistLocalStorage() {
    localStorage.getItem('wishlist', JSON.parse(wishlist));
}

// --------------------------------------------------------------------
// HANDLE BUTTON CLICKS ON PRODUCTS
productList.onclick = function(e) {
    if(e.target && e.target.classList.contains("remove")) {
        const name = e.target.dataset.name
        removeProduct(name)
    } else if(e.target && e.target.classList.contains("add-one")) {
        const name = e.target.dataset.name
        addProduct(name)
        setWishlistLocalStorage()
    } else if(e.target && e.target.classList.contains("remove-one")) {
        const name = e.target.dataset.name
        removeProduct(name, 1)
    } else if(e.target && e.target.classList.contains("add-to-cart")) {
        const name = e.target.dataset.name
        addProductCart(name)
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
function addProduct(name, price) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
            wishlist[i].qty +=1
            showProduct()
            return
        }
    }
    const product = {name, price, qty: 1}
    wishlist.push(product)
}

// --------------------------------------------------------------------
// ADD PRODUCTS TO CART
function addProductCart(name) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
            cart.push(wishlist[i])
        }
    }

    setCartLocalStorage()

    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
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
        const {name, price, qty} = wishlist[i]

        productStr += `<li>${name} $${price} x ${qty} = $${qty * price} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}">+</button>
        <button class="remove-one" data-name="${name}">-</button>
        <button class="add-to-cart" type="submit" data-name="${name}">Add To Cart</button>
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

function removeProduct(name, qty = 0) {
    for(let i=0; i < wishlist.length; i+=1) {
        if(wishlist[i].name === name) {
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