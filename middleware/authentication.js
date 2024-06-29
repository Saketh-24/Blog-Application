const { validateToken } = require("../utils/authentication");

function checkCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookieName];
        if (!tokenCookie) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookie);
            req.user = userPayload;
            next();
        } catch (error) {
            return res.status(401).send('Invalid or expired authentication token.');
        }
    };
}

module.exports = { checkCookie };
