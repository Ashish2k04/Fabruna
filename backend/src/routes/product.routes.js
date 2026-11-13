import { Router } from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post("/", authenticateSeller, createProduct);


export default productRouter;