const router = require("express").Router();
const { Users, validate } = require("../models/userInfo");
const bcrypt = require("bcrypt");
router.route("/register").post(async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const users = await Users.findOne({ userEmail: req.body.userEmail });
    if (users)
      return res
        .status(409)
        .send({ message: "User with given email already exists!!!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new Users({ ...req.body, password: hashPassword }).save();
    res.status(200).send({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!!!" });
  }
});
module.exports = router;
