import productModel from "../models/product.model.js";
import { uploadToImagekit } from "../services/imagekit.service.js";

async function createProduct(req, res, next){
     try{
        const { title, description, price, currency, alt} = req.body;
        const sellerId = req.user.id;
        const images = req.files;
        
        if(!sellerId){
          return res.status(401).json({
            message: "Seller id not found.",
            success: false
          })
        }

        if(!title || !description || price === undefined || Number(price) <= 0 || !Number.isFinite(Number(price)) || !currency || !images || images.length === 0 || !alt){
         return res.status(400).json({
            message: "Title, Description, Price, Currency, Images are mandatory.",
            success: false
         })
        }

        const imageBuffers = images.map((e) => {
         return e.buffer
        })

        const productImage = await uploadToImagekit(imageBuffers);

        const product = await productModel.create({
           title: title,
           description: description,
           seller: sellerId,
           price: {
            amount: price,
            currency: currency
           },
           images: {
             url: productImage.url,
             alt: alt   
           }
        })

        return res.status(201).json({
         message: "Product created successfully.",
         success: true,
         product
        })

     }
     catch(error){
        next(error);
     }
}

export { createProduct }