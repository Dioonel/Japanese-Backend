export function logError(err, req, res, next) {
    console.error(err);
    next(err);
}

export function errorHandler(err, req, res, next) {
    res.status(400).json({ message: err.message, stack: err.stack });
}

export function boomErrorHandler(err, req, res, next) {
    if (!err.isBoom) {
        next(err);
    } else {
        res.status(err.output.statusCode).json(err.output.payload);
    }
}