//En klass som fungerar som en mall, här finns alla keys till produkterna 
class ProductTemplate {
    constructor(_productObj) {
        _productObj = _productObj ? _productObj : {};
        this.id = _productObj.id || null;
        this.title = _productObj.title || "";
        this.category = _productObj.category || null;
        this.shortDescription = _productObj.shortDescription || "";
        this.description = _productObj.description || "";
        this.price = _productObj.price || 0;
        this.link = _productObj.link || "#";
        this.thumbnail = _productObj.thumbnail || "#";
        this.stock = _productObj.stock || 0;
    }
}

export default ProductTemplate;