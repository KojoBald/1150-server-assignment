const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../db').import('../models/User')

router.use(_checkRequiredParams);

router.post('/', (req, res) => {
    let username = req.body.user.username;
    let password = req.body.user.password;

    _getExistingUser(username).then(existingUser => {
        if(existingUser) {
            res.send(500, 'This username is taken');
        } else {
            UserModel.create({
                username,
                passwordhash: bcrypt.hashSync(password, 10)
            }).then(user => {
                res.json({ 
                    user,
                    message: 'created successfully',
                    sessionToken: _createSessionToken(user)
                })
            }).catch(err => res.send(500, err.message));
        }
    })
});

router.post('/login', (req, res) => {
    let username = req.body.user.username;
    let password = req.body.user.password;

    _getExistingUser(username).then(async user => {
        if(!user) {
            res.send(500, 'credentials don\'t match');
        } else {
            let passwordsMatch = await _checkIfPasswordsMatch(password, user.passwordhash);
            if(!passwordsMatch) {
                res.send(500, 'credentials don\'t match');
            } else {
                res.json({
                    user,
                    message: 'logged in successfully',
                    sessionToken: _createSessionToken(user)
                });
            }
        }
    })
});

function _checkRequiredParams(req, res, next) {
    if(req.body.user.username && req.body.user.password) {
        next();
    } else {
        return res.send(500, 'missing required parameters: username, password');
    }
}

function _getExistingUser(username) {
    return UserModel.findOne({
        where: { username }
    });
}

function _createSessionToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
}

async function _checkIfPasswordsMatch(unhashed, hashed) {
    return bcrypt.compare(unhashed, hashed);
}

module.exports = router;