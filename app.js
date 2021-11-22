const express = require('express');
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());




const userRoute = require("./routes/userRoute.js");
const pinRoute = require("./routes/pinRoute.js")

app.use("/api/v1/user", userRoute);
app.use("/api/v1/pin", pinRoute);


module.exports = app;