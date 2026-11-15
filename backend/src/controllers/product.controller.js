import productModel from "../models/product.model.js";
import { uploadToImagekit } from "../services/imagekit.service.js";

async function createProduct(req, res, next) {
   try {
      const { title, description, priceAmount, priceCurrency } = req.body;
      const seller = req.user;

      const images = await Promise.all(req.files.map(async (file) => {
         return await uploadToImagekit({
            buffer: file.buffer,
            fileName: file.originalname,
            folder: "fabruna/products"
         })
      }))


      const product = await productModel.create({
         title,
         description,
         price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
         },
         images,
         seller: seller.id
      })


      res.status(201).json({
         message: "Product created successfully",
         success: true,
         product
      })

   }
   catch (error) {
      next(error);
   }
}

export { createProduct }