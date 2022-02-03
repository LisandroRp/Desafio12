import express from 'express'
import { adminMiddleware } from '../../middleware/AdminMiddleware.js'
import MessageController from '../../controllers/web/MessageWebController.js'
import { createFakers } from '../../factories/MessageFactory.js';

const messageWebRouter = express.Router();

messageWebRouter.get('/', adminMiddleware, MessageController.getAll)

messageWebRouter.get('/message-test', createFakers);

/* messageWebRouter.get('/:id', MessageController.getById)

messageWebRouter.post('/',  MessageController.save)

messageWebRouter.delete('/:id', MessageController.deleteById)

messageWebRouter.delete('/', MessageController.deleteAll) */

export {messageWebRouter};