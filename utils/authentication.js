const jwt = require('jsonwebtoken')

function createToken(user)
{
    const payload = {
        _id: user.id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role
    };

    const token = jwt.sign(payload,process.env.SECRET)
    return token;
}

function validateToken(token){
   const payload = jwt.verify(token,process.env.SECRET);
   return payload;
}

module.exports = {createToken,validateToken}