//En klass som hanterar produkter, jag hämtar existerande produkter från localstorage, om data finns där

class ProductHandler {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
    }

    // saveData sparar ner till localstorage 
    saveData() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    //addProduct pushar in ny data som läggs till
    addProduct(newProduct) {
        this.products.push(newProduct);
        this.saveData();
    }

    
}

export default ProductHandler;