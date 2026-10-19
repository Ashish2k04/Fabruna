import "dotenv/config";

type Config = {
    readonly MONGODB_URI: string;
    readonly PORT: number;
}

export const config: Config = {
    MONGODB_URI: process.env.MONGODB_URI || "",
    PORT: Number(process.env.PORT) || 8000,
}