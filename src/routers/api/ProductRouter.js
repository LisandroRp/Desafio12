import express from 'express'
import { adminMiddleware } from "../../middleware/AdminMiddleware.js"
import ProductController from '../../controllers/api/ProductController.js';

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);

productRouter.get('/:id', ProductController.getById);

productRouter.post('/', adminMiddleware, ProductController.post);

productRouter.put('/', adminMiddleware, ProductController.update);

productRouter.delete('/:id', adminMiddleware, ProductController.deleteById);

productRouter.delete('/', adminMiddleware, ProductController.deleteAll);

export {productRouter};