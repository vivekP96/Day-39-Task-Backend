const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userInfoSchema = mongoose.Schema({
  userEmail: { type: String, required: true },
  password: { type: String, required: true },
  resetString: { type: String, default: "" },
});

const Users = mongoose.model("userInfo", userInfoSchema, "userInfo");
const validate = (data) => {
  const schema = joi.object({
    userEmail: joi.string().email().required().label("userEmail"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};
module.exports = { Users, validate };
