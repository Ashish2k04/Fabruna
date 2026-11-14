import {ImageKit} from "@imagekit/nodejs";
import {config} from "../config/config";

const imagekit = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
});

const uploadToImagekit =  async (buffer) => {
     const response = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "product.jpg",
        folder: "fabruna/products"
     })
     return response;
}

const deleteFromImagekit = async (buffer) => {
    return await imagekit.files.delete(buffer);
}

export {
    uploadToImagekit,
    deleteFromImagekit
}
