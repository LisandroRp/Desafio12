import MessageDao from "../dao/MessageDao.js";
import ProductDao from "../dao/ProductDao.js";
import Message from "../models/Message.js"
import { normalice, denormalice } from '../normalizers/MessageNormalizer.js'


var usuarios = 0

class Socket {
    constructor(io) {
        this.io = io;
    }
    connection = (socket) => {
        let now = new Date().toLocaleTimeString();
        console.log("--------------------------")
        console.log(`[${now}] Se conectó un usuario nuevo !!`)
        usuarios = usuarios + 1
        console.log(`Usuarios: ${usuarios}`)

        socket.on("newMessage", this.newMessage)
        socket.on("newProduct", this.newProduct)
        socket.on("disconnect", this.disconnect)
    }

    newMessage = async (messageData) => {
        let message = new Message(messageData)
        MessageDao.save(message).then(() => {
            this.io.sockets.emit("newMessage", message)
        }).catch(err => {
            console.error(err)
            this.io.sockets.emit("error")
        })
    }

    newProduct = async (product) => {
        ProductDao.save(product).then((newProduct) => {
            this.io.sockets.emit("newProduct", newProduct)
        }).catch(err => {
            console.error(err)
            this.io.sockets.emit("error")
        })
    }


    /*     newMessage = async (messageData) => {
            let messageArray = []
            messageArray.push(new Message(messageData))
            let message = normalice(messageArray)
            console.log(message)
             console.log(Object.keys(normalicee).length) 
    
            MessageDao.save(message.entities.message[0]).then(() => {
                this.io.sockets.emit("newMessage", message)
            }).catch(err => {
                throw err
            })
        } */

    disconnect = () => {
        let now = new Date().toLocaleTimeString();
        console.log("--------------------------")
        console.log(`[${now}] Se desconectó un usuario !!`)
        usuarios = usuarios - 1
        console.log(`Usuarios: ${usuarios}`)
    }
}

export default Socket;