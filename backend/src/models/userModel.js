const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const cookie = require('cookie');

//schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is requiredd"]
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "password is required"]
    },
    customerId: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""
    }
})

//hashed password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next()
})

//match password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//token
userSchema.methods.getSignedToken = function (res) {
    const accessToken = JWT.sign({ id: this._id }, process.env.JWT_ACESS_SECRET, { expiresIn: process.env.JWT_ACESS_EXPIREIN });
    const refreshToken = JWT.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIREIN });
    res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 7000, httpOnly: true })
    return accessToken;
    // const cookieValue = cookie.serialize('refreshToken', refreshToken, cookieOptions);
    // return { accessToken, refreshToken };
}

//model
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
