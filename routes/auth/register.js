var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const CONSTANTS = require("../../config/constants");
const User = require("../../model/Users");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", async function(req, res, next) {
  res.render("auth/register");
});

router.post("/", async (req, res) => {
  try {
    let newUser = await User.create({
      username: req.body.username,
      fullname: req.body.username,
      introduction: "Vui Lòng cập nhập thông tin mô tả của bạn!",
      password: bcrypt.hashSync(req.body.password),
      email: req.body.email,
      phone: req.body.phone,
      avatar: "default.jpg",
      amount: 0, // default 100k
      role: "Member"
    });
    let token = jwt.sign(
      {
        data: {
          username: req.body.username,
          fullname: req.body.fullname,
          email: req.body.email,
          phone: req.body.phone
        }
      },
      CONSTANTS.SECRET_KEY,
      { expiresIn: 60 * 60 * 24 * 100 }
    );
    req.flash("success_msg", "Đăng ký thành công!");
    // res.cookie("access_token", token, {
    //   maxAge: 24 * 60 * 60 * 100,
    //   httpOnly: true
    //   //secure: true;
    // });
    res.redirect("/dang-nhap");
  } catch (error) {
    // res.redirect("/500");
    res.send(error.message);
  }
});

module.exports = router;
