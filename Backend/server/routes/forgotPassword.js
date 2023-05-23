const router = require("express").Router();
const { Users } = require("../models/userInfo");
const nodemailer = require("nodemailer");
require("dotenv").config();

// const { v4: uuid } = require("uuidv4");
const uuid = require("uuid");
router.route("/forgotpassword").post(async (req, res) => {
  const users = await Users.findOne({ userEmail: req.body.userEmail });
  // console.log(users);
  if (!users) {
    res.send({ message: "User email is invalid or doesnot exixts!!!" });
  }
  const randomString = uuid.v4();
  await Users.updateOne(
    {
      userEmail: req.body.userEmail,
    },
    { $set: { resetString: randomString } }
  );
  const link = `https://forgot-password-task.netlify.app/resetpassword/${randomString}`;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  let details = {
    from: process.env.USER,
    to: req.body.userEmail,
    subject: "RESET PASSWORD LINK",
    text: `Please visit this below link to reset your password ${link}`,
  };
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      res.status(400).send({ message: "Some Error Occured try again later" });
    } else {
      res.status(200).send({ message: "email sent successfully" });
    }
  });
});
module.exports = router;
