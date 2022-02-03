import express from 'express'
import ProductController from '../../controllers/web/ProductController.js';
import { createFakers } from '../../factories/ProductFactory.js';

const productWebRouter = express.Router();

productWebRouter.get('/', ProductController.getAll);

productWebRouter.get('/product-test', createFakers);

export { productWebRouter };