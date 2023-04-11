const User = require("../Model/user")
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const cookieToken = require("../Utils/cookieToken");

exports.signup = async (req, res) => {

    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json({
            status: false,
            message: `email and Password all fields Required!`
        })
    }

    try {

        // get user from DB
        const isUserExists = await User.findOne({ where: { email: email } })

        // if user not found in DB
        if (isUserExists) {
            return res.status(400).json({
                status: false,
                data: {
                    email: isUserExists.email,
                },
                message: `user already exits with ${email}`
            })
        }

        const newUser = await User.create({ email, password })
        await newUser.save();
        let data = newUser.toJSON()
        data.password = undefined

        return res.status(200).json({
            status: true,
            data,
            message: "user created successfully!!"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            error,
            message: "Something went wrong!!"
        })
    }
}

exports.signin = async (req, res) => {

    const { email, password } = req.body

    if (!(email && password))
        return res.status(400).json({
            status: false,
            message: `Email and Password all fields Required!`
        })

    try {
        // get user from DB
        const isUserExists = await User.findOne({ where: { email: email } })

        // if user not found in DB
        if (!isUserExists) {
            return res.status(400).json({
                status: false,
                data: isUserExists,
                message: `user not exits with ${email}`
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password);

        //if password do not match
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: false,
                ok: isUserExists.password,
                isPasswordCorrect,
                message: `incorrect password!!`
            })
        }

        return cookieToken(res, isUserExists);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            error,
            message: "Something went wrong!!"
        })
    }

}

exports.getUserInfo = async (req, res) => {

    const { userId } = req.body

    try {
        // get user from DB
        const isUserExists = await User.findByPk(userId)

        // if user not found in DB
        if (!isUserExists) {
            return res.status(400).json({
                status: false,
                data: isUserExists,
                message: `user not exits `
            })
        }

        return res.status(200).json({
            status: true,
            data: {
                ...isUserExists,
                password: undefined
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            error,
            message: "Something went wrong!!"
        })
    }

}