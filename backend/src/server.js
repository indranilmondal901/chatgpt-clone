const express = require("express");
const port = process.env.PORT || 8080;
const morgan = require("morgan");
const cors = require("cors");
// const bodyParser = require("body-parser"); //???????????
const colors = require("colors");
const dotenv = require("dotenv");
const errorHandeler = require("./middlewire/errorMiddlewire")

// dotenv
dotenv.config()

//connectDB
require("./db/connection")

//rotes path
const authRoutes = require("./routs/authRoutes");
const AI_router = require("./routs/openaiRoutes");

//rest obj
const app = express();

//middlewire
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded,({extended:false}));//?????????????????
app.use(morgan('dev'))
app.use(errorHandeler)

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", AI_router);

//listin
app.listen(port, () => {
    console.log(`app is running on on port in ${process.env.DEV_MODE} on port no ${port}`.bgWhite.black)
})