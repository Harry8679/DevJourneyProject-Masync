const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAuthenticated = async (req, res, next) => {
    // console.log('req.headers', req.headers);
    const headerObj = req.headers;
    // console.log(headerObj.authorization);
    //! Get the token from header
    const token = headerObj.authorization.split(' ')[1];
    // console.log(token);
    //! Verify the token
    // console.log(process.env.JWT_SECRET);
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    });
    
    if (verifyToken) {
        //! Find the user
        req.user = verifyToken.id;
        console.log('req.user', req.user);
        //! Save the user into the request object
        next();
    } else {
        const err = new Error('Token expired please login again');
        next(err);
    }
};

module.exports = isAuthenticated;