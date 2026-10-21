import "dotenv/config";

export const errorMiddleware = (error, req, res, next) => {
    const response = {
        message: error.message
    }

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    return res.status(error.status || 500).json(response);
}