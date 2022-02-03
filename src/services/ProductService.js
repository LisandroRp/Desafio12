import mongoose from 'mongoose'
import config from '../../options/config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ProductService {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema, nombreColeccion)
    }

    getById(id) {
        return this.coleccion.find({ '_id': id })
    }

    getAll() {
        return this.coleccion.find({}).lean()
    }

    save(product) {
        console.log(product)
        return this.coleccion.create(product)
    }

    update(product) {
        return this.coleccion.replaceOne({ '_id': product.id }, product)
    }

    deleteById(id) {
        return this.coleccion.deleteOne({ '_id': id })
    }

    deleteAll() {
        return this.coleccion.deleteMany({})
    }
}
export default ProductService