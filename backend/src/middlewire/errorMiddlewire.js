const errorResponse = require("../utils/errorResponse")

const errorHandeler = (err, req, res, next) => {
    let error = [...err];
    error.message = err.message;

    //mongoose cast error
    if (err.name === "castError") {
        const message = 'Resource not found';
        error = new errorResponse(message, 404);
    }
    //duplicate key error
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new errorResponse(message, 400)
    }
    //mongoose validation error
    if (err.name === "validationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new errorResponse(message, 400);
        res.status(err.statusCode || 500).json({
            sucess: false,
            error: err.message || "Server Error"
        })
    }
}

module.exports = errorHandeler;