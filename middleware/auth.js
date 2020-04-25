const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token');

    // jika token tidak tersedia
    if(!token){
        res.status(401).json({ msg : "Anda tidak memiliki toke, authorisasi di tolak"});
    }

    //verified token

    try{
        const decoded = jwt.verify(token, config.get('jwt-secret'))
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({ msg : " token anda tidak valid"})
    }

}