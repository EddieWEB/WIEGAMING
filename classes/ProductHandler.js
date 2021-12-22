//En klass som hanterar produkter, jag hämtar existerande produkter från localstorage, om data finns där

class ProductHandler {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
        //this.wishCart = JSON.parse(localStorage.getItem('wishcart')) || [];
        this.randomList = [];
    }

    // saveData sparar ner till localstorage 
    saveData() {
        localStorage.setItem('products', JSON.stringify(this.products));
        //localStorage.setItem('wishcart', JSON.stringify(this.cart));
    }

    //addProduct pushar in ny data som läggs till
    addProduct(newProduct) {
        this.products.push(newProduct);
        this.saveData();
        window.location.reload();
    }

    updateProduct(updatedProduct) {
        let currentProduct = this.getByID(updatedProduct.id);

        Object.keys(currentProduct).forEach(key => {
            currentProduct[key] = updatedProduct[key];
        });

        this.saveData();
        window.location.reload();
    }

    deleteProduct(productId){
        let index = this.products.findIndex(p => p.id === productId);
        if(index == -1) return;
        this.products.splice(index, 1);
        this.saveData();
        window.location.reload();
    }

    addToCart(newProduct) {
        this.cart.push(newProduct);
        this.saveData();
    }

    getByID(id) {
        return this.products.find(product => product.id === id);
    }

    getByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    getByPriceRange(minPrice, maxPrice) {
        return this.products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    getRandom() {
        let randomNum = Math.floor(Math.random() * this.products.length);
        console.log('current random number', randomNum);
        console.log('List of used random numbers already used', this.randomList);
        console.log('available product count', this.products.length);
        console.log('Already used product count', this.randomList.length);
        if (this.randomList.indexOf(randomNum) === -1) {
            this.randomList.push(randomNum);
            return this.products[randomNum];
        }
        else if (this.randomList.length < this.products.length) {
            return this.getRandom();
        }
    }
}
export default ProductHandler;