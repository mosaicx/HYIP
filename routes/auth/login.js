var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const CONSTANTS = require("../../config/constants");
const User = require("../../model/Users");
const jwt = require("jsonwebtoken");
// var flash = require("connect-flash");

/* GET users listing. */
router.get("/", async function(req, res, next) {
  res.render("auth/login", {
    success_msg: req.flash("success_msg"),
    error_msg: req.flash("error_msg")
  });
});

router.post("/", async (req, res) => {
  let user = await User.find({ email: req.body.email });
  if (user.length != 0) {
    let isValid = bcrypt.compareSync(req.body.password, user[0].password);
    if (isValid == true) {
      let token = jwt.sign(
        {
          data: {
            _id: user[0]._id,
            username: user[0].username,
            fullname: user[0].fullname,
            email: user[0].email,
            phone: user[0].phone_number
          }
        },
        CONSTANTS.SECRET_KEY,
        { expiresIn: 24 * 60 * 60 * 100 }
      );
      res.cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 100, // thời gian sống
        httpOnly: true // chỉ có http mới đọc được token
        //secure: true; //ssl nếu có, nếu chạy localhost thì comment nó lại
      });
      res.redirect("/thanh-vien");
      // res.send("ok");
    } else {
      req.flash("error_msg", "Email hoặc mật khẩu sai!");
      res.redirect("/dang-nhap");
    }
  } else {
    req.flash("error_msg", "Email hoặc mật khẩu sai!");
    res.redirect("/dang-nhap");
  }
});

module.exports = router;
