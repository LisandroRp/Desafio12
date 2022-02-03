import mongoose from 'mongoose'
import config from '../../options/config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class CartService {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema, nombreColeccion)
    }

    getById(id) {
        return this.coleccion.find({ '_id': id })
    }

    getAll() {
        return this.coleccion.find({}).lean()
    }

    save(cart) {
        return this.coleccion.create(cart)
    }

    update(cart) {
        return this.coleccion.replaceOne({ '_id': cart.id }, cart)
    }

    deleteById(id) {
        return this.coleccion.deleteOne({ '_id': id })
    }

    deleteAll() {
        return this.coleccion.deleteMany({})
    }
}
export default CartService