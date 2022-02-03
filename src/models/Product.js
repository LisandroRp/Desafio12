class Product {
    constructor(product) {
        console.log(product);
        console.log("*********************");
        this.id = product.id ? product.id : 1;
        this.timestamp = new Date().toLocaleTimeString();
        this.name = product.name ? product.name : "";
        this.description = product.description ? product.description : "",
        this.sku = product.sku ? product.sku : "",
        this.photo = product.photo ? product.photo : "",
        this.price = product.price ? product.price : 0,
        this.stock = product.stock ? product.stock : 0;
    }
}

export default Product;
