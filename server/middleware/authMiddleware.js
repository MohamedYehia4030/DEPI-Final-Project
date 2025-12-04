const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
    let token; // Declared with 'let' outside the conditional block

    // 1. Check if the Authorization header exists and is in the format "Bearer TOKEN"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {

            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get user from the decoded token ID
            const user = await User.findById(decoded.id).select('-password'); 
            
            if (!user) {
                 return res.status(401).json({ message: 'Not authorized, user does not exist' });
            }

            // 4. Attach the user object to the request (req.user)
            req.user = user;

            // 5. Call next() to proceed to the next middleware or the controller function
            next();

        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed or expired' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { protect, admin };
