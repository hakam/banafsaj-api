module.exports = {
    myLogger : function (req, res, next) {
        console.log(req.url);
        next();
}
}