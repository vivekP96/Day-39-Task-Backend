const mongoose = require("mongoose");
module.exports = () => {
  try {
    mongoose.connect(process.env.URI, {});
    console.log("Database Connected Successfully!!!");
  } catch (error) {
    console.log(error);
    console.log("Connection Failed!!!");
  }
};
