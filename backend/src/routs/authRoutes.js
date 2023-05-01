const express = require("express");
const {registerController, loginController, logOutController} = require("../controllers/authController")
//router object
const router = express.Router();

//routes

//REGISTER
router.post("/register",registerController);
//LOGIN
router.post("/login",loginController);
//LOGOUT
router.post("/logout",logOutController);


module.exports = router;