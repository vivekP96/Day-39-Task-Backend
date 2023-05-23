require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const Connection = require("./db");
const register = require("./routes/createUser");
const forgotPass = require("./routes/forgotPassword");
const resetPassword = require("./routes/resetPassword");
//middlewares
app.use(express.json());
app.use(cors());
//database connection
Connection();
//routes for registration
app.use("/api", register);
//routes for forgotpassword
app.use("/api", forgotPass);
app.use("/api", resetPassword);
//server connection
app.listen(port, () => {
  console.log(`Server Listening to port ${port}`);
});
