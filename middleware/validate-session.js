const jwt = require('jsonwebtoken');
const UserModel = require('../db').import('../models/User');

module.exports = async (req, res, next) => {
    let sessionToken = req.headers.authorization;

    if(!sessionToken) {
        res.send(400, 'no session token provided');
    } else {
        let validToken = await jwt.verify(sessionToken, process.env.JWT_SECRET);

        if(!validToken) {
            res.send(500, 'token is not valid');
        } else {
            UserModel.findOne({
                where: { id: validToken.id }
            }).then(user => {
                req.user = user;
                next();
            }).catch(err => res.send(400, err.message))
        }
    }
}