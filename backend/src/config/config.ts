import "dotenv/config";

type Config = {
    readonly MONGO_URI: string;
    readonly PORT: number;
}

export const config: Config = {
    MONGO_URI: process.env.MONGO_URI || "",
    PORT: Number(process.env.PORT) || 8000,
}