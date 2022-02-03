
import MessageService from "../services/MessageService.js"
import ServiceException from "../exceptions/ServiceException.js"
import { asPOJO, renameField } from '../utils/ObjectUtils.js'
import mongoose from 'mongoose'
import Product from "../models/Product.js"

class MessageDao extends MessageService {
    constructor() {
        super('message', new mongoose.Schema({
            author: { type: { 
                id: { type: String, required: false },
                firstName: { type: String, required: false },
                lastName: { type: String, required: false },
                age: { type: String, required: false },
                alias: { type: String, required: false },
                avatar: { type: String, required: false },
            }, required: false, default: {}},
            id: { type: String, required: false },
            text: { type: String, required: false },
            date: { type: String, required: false, default: new Date().toLocaleString()}
        },{ versionKey: false }))
    }

    async getAll() {
        return super.getAll()
            .then((messages) => {
                if (messages.length) { return messages.map(message => renameField(asPOJO(message), '_id', 'id')) }
                else { throw new ServiceException(404, "No existen los mensajes", "No existen los mensajes") }
            })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudieron traer los productos", error.message) })
    }

    async save(message) {
        return super.save(message)
            .then((result) => { console.log("Producto Creado"); return renameField(asPOJO(result), '_id', 'id') })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo crear el producto", error.message) })
    }

}

export default new MessageDao