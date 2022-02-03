import ProductDao from '../../dao/ProductDao.js'

class ProductController {

    getAll = async (req, res) => {
        ProductDao.getAll().then(products => {
            res.json(products)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    getById = async (req, res) => {
        ProductDao.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    post = async (req, res) => {
        ProductDao.save(req.body).then(response => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    update = (req, res) => {
        ProductDao.update(req.body).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteById = (req, res) => {
        ProductDao.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAll = (req, res) => {
        ProductDao.deleteAll().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new ProductController();
