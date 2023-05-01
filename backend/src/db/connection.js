const mongoose = require("mongoose");
const color = require("colors");
// const uri = "mongodb://localhost:27017";
// const dbName = "AI_DB";
// const url = uri+"/"+dbName;
const url = process.env.MONGODB_URI;
// console.log(url)

mongoose.connect(url,({
    useNewUrlParser: true,
    useUnifiedTopology: true
})).then(() =>
console.log("mongoDb is connected with Node.JS sucessfully".bgRed.white)
).catch((err) =>
console.log(`failed to connect with mongoDb and error is ${err}`.bgCyan.white)
)