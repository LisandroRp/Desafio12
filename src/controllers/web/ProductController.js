import ProductDao from '../../dao/ProductDao.js'

class ProductController {

    getAll = async (req, res) => {
        ProductDao.getAll().then(products => {
            res.render("./products/ProductMain", {productList: products, username: req.session.username})
        }).catch(err => {
            if(err.error == 404)
                res.render("./products/ProductMain", {productList: [], username: req.session.username})
            else{
                res.status(err.error)
                res.json(err)
            }
        })
    }
}
export default new ProductController();
