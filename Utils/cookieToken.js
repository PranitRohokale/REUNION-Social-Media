
const getJwtToken = require("./getJwtToken")

const cookieToken = (res, User) => {
    const token = getJwtToken(User);

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    const { id, email } = User
    return res.status(200).cookie("token", token, options).json({
        success: true,
        user: {
            id,
            email
        },
        token,
    });
};

module.exports = cookieToken;
