const wishlistModalTemplate = document.createElement('template');
wishlistModalTemplate.innerHTML = `
<div class="wishlist-modal">
<div class="wishlist-modal-content">
    <div class="modal-header">
        <span class="close-btn">&times;</span>
        <h2>Wishlist</h2>
    </div>
    <section class="modal-produkter">
        <div class="product-qty">
            <!-- total amount of products in wishlist -->
        </div>

        <ul class="product-list">
            <!-- wishlist products  -->
        </ul>

        <div class="wishlist-total">
            <!-- wishlist total -->
        </div>
        
        <a href="#">
            <button type="submit" class="add-all-to-cart btn btn-secondary">Lägg till alla i varukorg</button>
        </a>
    </section>
</div>
</div>`;

class WishlistModal extends HTMLElement {
    constructor() {
        super();

        //Skapar html element
        this.appendChild(wishlistModalTemplate.content.cloneNode(true));

        // selectors Modal
        const modal = document.querySelector(".wishlist-modal");
        const wishlistKnapp = document.querySelector(".bi-suit-heart-fill");
        const closeWishlistModal = document.querySelector(".close-btn");

        //addeventlistener för att öppna modalen
        document.addEventListener("open-wishlist", openWishlist);
        closeWishlistModal.addEventListener("click", closeWishlist);

        // addeventlistener för att stänga om man klickar utanför
        document.addEventListener("click", outsideClick)

        //funktion för att öppna varukorgsmodal
        function openWishlist() {
            console.log('OPEN WISHLIST')
            modal.style.display = "block";
        }

        //funktion för att stänga varukorgsmodal med stängknappen
        function closeWishlist() {
            modal.style.display = "none";
        }

        //Funktion för att stänga varukorgsmodal om man klickar utanför varukorgen
        function outsideClick(click) {
            if (click.target === modal) {
                modal.style.display = "none";
            }
        }

        const productList = document.querySelector(".product-list")
        const productQty = document.querySelector(".product-qty")
        const wishlistTotal = document.querySelector(".wishlist-total")
        const addAllToCart = document.querySelector(".add-all-to-cart")
        const cart = JSON.parse(localStorage.getItem("cart")) || []
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

        //////////////// TA BORT OM ALLT FUNGERAR /////////////////////////
        /*
        function getWishlistLocalStorage () {
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            return wishlist.map(i => {
                i.product = ph.getByID(i.id)
                return i
            })
        }
        */

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
        productList.onclick = function (e) {
            if (e.target && e.target.classList.contains("remove")) {
                const id = e.target.dataset.id
                removeProduct(id)
            } else if (e.target && e.target.classList.contains("add-one")) {
                const id = e.target.dataset.id
                addProduct(id)
                setWishlistLocalStorage()
            } else if (e.target && e.target.classList.contains("remove-one")) {
                const id = e.target.dataset.id
                removeProduct(id, 1)
            } else if (e.target && e.target.classList.contains("add-to-cart")) {
                const id = e.target.dataset.id
                addProductCart(id)
            }
        }

        // --------------------------------------------------------------------
        // BUTTON THAT ADD WISHLIST AND CART TO LOCAL STORAGE. ALSO CLEAR THE WISHLIST ARRAY.
        addAllToCart.onclick = function (e) {
            if (e.target && e.target.classList.contains("add-all-to-cart")) {
                cart.push(...wishlist)
                setCartLocalStorage()
            }
            wishlist.splice(0, wishlist.length)
            setWishlistLocalStorage()
            showProduct()
        }
        // --------------------------------------------------------------------
        // ADD PRODUCT TO WISHLIST
        function addProduct(id) {
            for (let i = 0; i < wishlist.length; i += 1) {
                if (wishlist[i].id === id) {
                    wishlist[i].qty += 1
                    showProduct()
                    return
                }
            }
        }

        // --------------------------------------------------------------------
        // ADD PRODUCTS TO CART
        function addProductCart(id) {
            for (let i = 0; i < wishlist.length; i += 1) {
                if (wishlist[i].id === id) {
                    cart.push(wishlist[i])
                }
            }

            setCartLocalStorage()

            for (let i = 0; i < wishlist.length; i += 1) {
                if (wishlist[i].id === id) {
                    wishlist.splice([i], 1)
                }
            }
            setWishlistLocalStorage()

            showProduct()
        }

        // --------------------------------------------------------------------
        // SHOW PRODUCT
        function showProduct() {
            productQty.innerHTML = `Du har ${getQty()} produkter i din wishlist`
            let productStr = ""
            for (let i = 0; i < wishlist.length; i += 1) {
                let { title, price, thumbnail, qty, id } = wishlist[i]

                productStr += `<li><img referrerpolicy="no-referrer" src="${thumbnail}">${title} $${price} x ${qty} = $${qty * price} 
                    <button class="add-to-cart btn btn-primary" type="submit" data-id="${id}">Lägg till i varukorg</button>
                    <button class="remove btn btn-danger" data-id="${id}">Ta bort</button>
                    </li>`
            }
            productList.innerHTML = productStr
            wishlistTotal.innerHTML = `Wishlist total: ${getTotal()}`
        }
        //TOG BORT, EJ RELEVANT FÖR WISHLIST
        /*<button class="add-one" data-id="${id}">+</button>
        <button class="remove-one" data-id="${id}">-</button> */

        // --------------------------------------------------------------------
        // GET QTY
        function getQty() {
            let qty = 0
            for (let i = 0; i < wishlist.length; i += 1) {
                qty += wishlist[i].qty
            }
            return qty
        }

        // --------------------------------------------------------------------
        // GET TOTAL
        function getTotal() {
            let total = 0
            for (let i = 0; i < wishlist.length; i += 1) {
                total += wishlist[i].price * wishlist[i].qty
            }
            return total.toFixed(2)
        }

        // --------------------------------------------------------------------
        // REMOVE PRODUCT
        function removeProduct(id, qty = 0) {
            for (let i = 0; i < wishlist.length; i += 1) {
                if (wishlist[i].id === id) {
                    if (qty > 0) {
                        wishlist[i].qty -= 1
                    }
                    if (wishlist[i].qty < 1 || qty === 0) {
                        wishlist.splice(i, 1)
                    }
                    setWishlistLocalStorage()
                    showProduct()
                    return
                }
            }
        }

        showProduct()

    }
}
customElements.define('wishlist-modal', WishlistModal);