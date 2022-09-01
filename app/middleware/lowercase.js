const lower = (req, res, next) => {
   
    var z =  Object.keys(req.body).reduce(function(obj, currentKey) {
        if (typeof obj[currentKey] === 'string' || obj[currentKey] instanceof String){
            obj[currentKey] = req.body[currentKey].toLowerCase();
        }
        return obj;
    }, {});
    req.body = z
   console.log(z);
        next();

   
};
module.exports = lower;