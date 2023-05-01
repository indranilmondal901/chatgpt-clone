const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");
// const errorHandeler = require("../middlewire/errorMiddlewire");
// const cookie = require('cookie');

//JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        sucess: true,
        token: token
    })
}
//REGISTER
exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        //existing user
        const existingEmail = await userModel.findOne({ email: email })
        if (existingEmail) {
            res.status(400).send({
                message: "Email is already register"
            })
        }
        const user = await userModel.create({ username, email, password });
        this.sendToken(user, 201, res);
    } catch (error) {
        next();
    }
}
//LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            res.status(400).send({
                message: "please provide email or password"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).send({
                message: "Invalid credential"
            })
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(400).send({
                message: "Invalid credential"
            })
        }
        //send Token
        this.sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
    }
}

// LOGOUT
exports.logOutController = async (req, res) => {
    await res.clearCookie("refreshToken");
    return res.status(200).send({
        status: true,
        message: "logout sucesfully"
    })
}