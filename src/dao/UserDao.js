
import UserService from "../services/UserService.js"
import ServiceException from "../exceptions/ServiceException.js"
import { asPOJO, renameField } from '../utils/ObjectUtils.js'
import mongoose from 'mongoose'
import User from "../models/User.js"

class UserDao extends UserService {

    constructor() {
        super('user', new mongoose.Schema({
            username: { type: String, required: true },
            password: { type: String, required: true },
        },
            {
                versionKey: false
            }))
    }
    
    async getById(id) {
        return super.getById(id)
            .then((user) => {
                if (user.length) { return renameField(asPOJO(user[0]), '_id', 'id') }
                else { throw new ServiceException(404, "No existe el Usuario con id: " + id, "No existe el Usuario con id: " + id) }
            })
            .catch((error) => { console.log(error); throw error.error ? error : new ServiceException(error.error, "No se pudo traer el Usuario con id: " + id, error.message) })
    }

    async getByUsername(username) {
        return super.getByUsername(username)
            .then((user) => {
                if (user.length) { return renameField(asPOJO(user[0])) }
                else { throw new ServiceException(404, "No existe el Usuario con username: " + username, "No existe el Usuario con username: " + username) }
            })
            .catch((error) => { console.log(error); throw error.error ? error : new ServiceException(error.error, "No se pudo traer el Usuario con username: " + username, error.message) })
    }

    getAll() {
        return super.getAll()
            .then((users) => {
                if (users.length) { return users.map(user => renameField(asPOJO(user), '_id', 'id')) }
                else { throw new ServiceException(404, "No existen Usuarios", "No existen Usuarios") }
            })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudieron traer los Usuarios", error.message) })
    }

    async save(user) {
        return super.save(new User(user))
            .then((result) => { console.log("Usuario Creado"); return renameField(asPOJO(result), '_id', 'id') })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo crear el Usuario", error.message) })
    }

    async update(user) {
        return super.update(new User(user))
            .then(() => { console.log(`Usuario con id ${user.id} actualizado`); return { response: `Usuario con id ${user.id} actualizado`, user: user } })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo actualizar el Usuario", error.message) })
    }

    async deleteById(id) {
        return super.deleteById(id)
            .then((response) => {
                if (response.deletedCount) { return (console.log(`Usuario con id ${id} eliminado`), { response: `Usuario con id ${id} eliminado` }) }
                else { throw new ServiceException(404, `No existe Usuario con id: ${id}`, `No existe Usuario con id: ${id}`) }
            })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudo eliminar el Usuario con id: " + id, error.message) })
    }

    async deleteAll() {
        return super.deleteAll()
            .then((response) => {
                if (response.deletedCount) { return (console.log("Todos los Usuarios fueron eliminados"), { response: "Todos los Usuarios fueron eliminados" }) }
                else { throw new ServiceException(404, "No existen Usuarios", "No existen Usuarios") }
            })
            .catch((error) => { console.log(error); throw new ServiceException(error.error, "No se pudieron eliminar los Usuarios", error.message) })
    }
}

export default new UserDao()