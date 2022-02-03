import express from 'express'
import { adminMiddleware } from '../../middleware/AdminMiddleware.js'
import CartController from '../../controllers/api/CartController.js'

const cartRouter = express.Router();

cartRouter.get('/', adminMiddleware, CartController.getAll)

cartRouter.get('/:id', CartController.getById)

cartRouter.post('/',  CartController.save)

cartRouter.delete('/:id', CartController.deleteById)

cartRouter.delete('/', CartController.deleteAll)

cartRouter.get('/:id/products', CartController.getProductsByIdCarrito)

cartRouter.put('/:id/products', CartController.addProduct)

cartRouter.put('/:id/products/:id_prod', CartController.deleteProductFromCart)

cartRouter.put('/:id/products/empty/all', CartController.deleteAllProductsByIdCart)

export {cartRouter};