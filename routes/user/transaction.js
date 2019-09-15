var express = require("express");
var router = express.Router();
const User = require("../../model/Users");
const auth = require("../../service/auth");
/* GET users listing. */
router.get("/", auth.checkLogin, async function(req, res, next) {
  try {
    let user = await User.findOne({ _id: req.user._id });
    // res.json({ user });

    res.render("user/transaction", {
      user
    });
  } catch (error) {
    res.redirect("/500");
  }
});

module.exports = router;
