import CartService from "../services/CartService.js"
import ServiceException from "../exceptions/ServiceException.js"
import { asPOJO, renameField } from '../utils/ObjectUtils.js'
import Cart from '../models/Cart.js'
import mongoose from 'mongoose'

class CartDao extends CartService {

    constructor() {
        super('cart', new mongoose.Schema(
            {
                timestamp: { type: String, required: true },
                products: { type: [], required: false }
            },
            {
                versionKey: null
            }
        ))
    }

    async getById(id) {
        return super.getById(id)
            .then((cart) => {
                if (cart.length) { return renameField(asPOJO(cart[0]), '_id', 'id') }
                else { throw new ServiceException(404, "No existe el carrito con id: " + id) }
            })
            .catch((error) => { console.log(error); throw error.error ? error : new ServiceException(error.error, "No se pudo traer el carrito con id: " + id, error.message) })
    }

    async getProductsByIdCart(id) {
        return super.getById(id)
            .then((cart) => {
                if (cart.length) { return renameField(asPOJO(cart[0]).products) }
                else { throw new ServiceException(404, "No existe el carrito con id: " + id) }
            })
            .catch((error) => { console.log(error); throw error.error ? error : new ServiceException(error.error, "No se pudo traer el carrito con id: " + id, error.message) })
    }

    async getAll() {
        return super.getAll()
            .then((products) => { return products.map(cart => renameField(asPOJO(cart), '_id', 'id')) })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudieron traer los productos", error.message) })
    }

    async save(cart = new Cart()) {
        return super.save(cart)
            .then((result) => { console.log("Producto Creado"); return renameField(asPOJO(result), '_id', 'id') })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo crear el carrito", error.message) })
    }

    async addProduct(idCart, product) {
        return this.getById(idCart)
            .then(async (cart) => {
                cart.products.push(product)
                return super.update(cart)
                    .then(() => { console.log(`Producto con id ${product.id} agregado al carrito`); return { response: `Producto con id ${product.id} agregado al carrito`, cart: cart } })
                    .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo actualizar el carrito", error.message) })
            }).catch(err => {
                throw err
            })
    }

    async deleteProductFromCart(idCart, idProduct) {
        return this.getById(idCart)
            .then(async (cart) => {
                let index = cart.products.findIndex(product => product.id == idProduct);
                if (index != -1) {
                    cart.products.splice(index, 1);
                    return super.update(cart)
                        .then(() => { console.log(`Producto con id ${idProduct} eliminado del carrito`); return { response: `Producto con id ${idProduct} eliminado del carrito`, cart: cart } })
                        .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo actualizar el carrito", error.message) })
                }
                else {
                    console.log(`No existe el producto con id: ${idProduct}`)
                    throw new ServiceException(404, "No existe el producto con id: " + idProduct + " en el carrito con id: " + idCart)
                }
            }).catch(err => {
                throw err
            })
    }

    async deleteAllProductsByIdCart(idCart) {
        console.log("hola")
        return this.getById(idCart)
            .then(async (cart) => {
                cart.products = []
                return super.update(cart)
                    .then(() => { console.log(`Se eliminaron todos los productos del carrito con id: ` + idCart); return { response: `Se eliminaron todos los productos del carrito con id: ` + idCart, cart: cart } })
                    .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo actualizar el carrito", error.message) })
            }).catch(err => {
                throw err
            })
    }

    async deleteById(id) {
        return super.deleteById(id)
            .then((response) => {
                if (response.deletedCount) { return (console.log(`Carrito con id ${id} eliminado`), { response: `Carrito con id ${id} eliminado` }) }
                else { throw new ServiceException(404, `No existe carrito con id: ${id}`, `No existe carrito con id: ${id}`) }
            })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo eliminar el carrito con id: " + id, error.message) })
    }

    async deleteAll() {
        return super.deleteAll()
            .then((response) => {
                if (response.deletedCount) { return (console.log("Todos los carritos fueron eliminados"), { response: "Todos los carritos fueron eliminados" }) }
                else { throw new ServiceException(404, "No existen carritos", "No existen carritos") }
            })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudieron eliminar los carritos", error.message) })
    }

}
export default CartDao