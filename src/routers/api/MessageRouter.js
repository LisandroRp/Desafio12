import express from 'express'
import { adminMiddleware } from '../../middleware/AdminMiddleware.js'
import MessageController from '../../controllers/api/MessageController.js'

const messageRouter = express.Router();

messageRouter.get('/', adminMiddleware, MessageController.getAll)

messageRouter.get('/:id', MessageController.getById)

messageRouter.post('/',  MessageController.save)

messageRouter.delete('/:id', MessageController.deleteById)

messageRouter.delete('/', MessageController.deleteAll)

export {messageRouter};