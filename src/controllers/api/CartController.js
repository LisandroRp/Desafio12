import CartDao from '../../dao/CartDao.js'

const cartDao = new CartDao();

class CartController {

    getAll = async (req, res) => {
        cartDao.getAll().then(carts => {
            res.json(carts)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    getById  = async (req, res) => {
        cartDao.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })      
    }

    save = async (req, res) => {
        cartDao.save().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    getProductsByIdCarrito = async (req, res) => {
        cartDao.getProductsByIdCart(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    addProduct = async (req, res) => {
        cartDao.addProduct(req.params.id, req.body.product).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteProductFromCart = async (req, res) => {
        cartDao.deleteProductFromCart(req.params.id, req.params.id_prod).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAllProductsByIdCart = async (req, res) => {
        cartDao.deleteAllProductsByIdCart(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteById = async (req, res) => {
        cartDao.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAll = async (req, res) => {
        cartDao.deleteAll().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new CartController();
