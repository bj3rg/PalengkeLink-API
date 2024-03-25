const errorHandler = require('../util/errorHandler');

module.exports = (req, res, next) => {
    const { data } = req.body;
    if (data) {
        try {
            req.body.data = JSON.parse(data);
        } catch (err) {
            return errorHandler("Invalid JSON data", 500, res);
        }
    }
    next();
};