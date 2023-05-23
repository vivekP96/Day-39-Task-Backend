const router = require("express").Router();
const { Users } = require("../models/userInfo");
const bcrypt = require("bcrypt");
router.route("/resetpassword/:string").post(async (req, res) => {
  try {
    // const string = req.params.string;
    let pass1 = req.body.pass1;
    let pass2 = req.body.pass2;

    if (pass1 === pass2) {
      // console.log(password);
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.pass1, salt);
      const user = await Users.updateOne(
        {
          resetString: req.params.string,
        },
        { $set: { password: hashPassword } }
      );
      res.status(200).send({ message: "Password Reset Successful" });
    } else res.send({ message: "Password and Confirm password must be Same" });
  } catch (err) {
    res.status(400).send({ message: "Something went wrong!!!" });
  }
});
module.exports = router;
