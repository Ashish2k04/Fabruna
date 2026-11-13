import productModel from "../models/product.model.js";
import { uploadToImagekit } from "../services/imagekit.service.js";

async function createProduct(req, res, next){
     try{
        const { title, description, seller, price, images } = req.body;

        
     }
     catch(error){
        next(error);
     }
}

export { createProduct }