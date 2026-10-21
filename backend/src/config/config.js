import "dotenv/config";

if(!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}   

export const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
}