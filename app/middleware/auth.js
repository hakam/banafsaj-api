var jwt = require("jsonwebtoken");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'banafsaj-secret-key', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            
           // console.log(req.user);
            next();
        });
    } else {
        res.sendStatus(403);
    }
};
module.exports = authenticateJWT;