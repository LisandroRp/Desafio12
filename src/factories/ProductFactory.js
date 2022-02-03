import faker from "faker";

const createFakers = async (req, res) => {
    let productList = [];
    for (let index = 1; index <= 5; index++) {
        productList.push({
            id: index,
            name: faker.name.firstName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image(),
        })
    }  
    if (req.baseUrl == '/api/products') {
        res.send(productList)  
    } else {
        res.render('./productTest/ProductTest', {productList});
    }
}


export { createFakers } 