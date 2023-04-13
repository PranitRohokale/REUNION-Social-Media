exports.isLoggedIn = (req, res, next) => {
    // console.log(req.cookies);
    const token =
        req.cookies.token ||
        req.body.token ||
        req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return res.status(403).send("token is missing");
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(userId);
        req.body.userId = userId;
        // bring in info from DB
        return next();
    } catch (error) {
        console.log(error)
        return res.status(401).send("Invalid Token");
    }
};

