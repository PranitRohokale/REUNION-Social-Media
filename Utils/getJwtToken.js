const jwt = require("jsonwebtoken")

const getJwtToken = (User) => {
    return jwt.sign({ userId: User.id, email: User.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    })
};

module.exports = getJwtToken