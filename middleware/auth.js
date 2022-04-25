const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    //Get token from header
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        //Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
        //Set token from cookie
    }
    //Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    //Verify token
    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET'));
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};