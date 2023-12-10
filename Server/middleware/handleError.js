const errorHandle = (err, req, res, next) => {
    const statusCode = err.statusCode || 400;
    const responseData = {
        message: err.message
    };

    if (process.env.ENV_MODE !== 'production') {
        responseData.stack = err.stack;
    }

    res.status(statusCode).json(responseData);
}


const invalidRouteError =(req, res, next) => {
        let error = new Error('invalid path')
        error.statusCode = 404
        next(error)
    }

module.exports = {errorHandle, invalidRouteError}