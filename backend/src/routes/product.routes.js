import { Router } from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
import { uploadToMulter } from '../middlewares/multer.middleware.js';
import {createProductValidator} from "../validators/product.validator.js";

const productRouter = Router();

productRouter.post("/createProduct", createProductValidator, authenticateSeller, uploadToMulter.array("image", 5), createProduct);


export default productRouter;