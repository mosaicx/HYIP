var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const CONSTANTS = require("../../config/constants");
const User = require("../../model/Users");
const jwt = require("jsonwebtoken");
// var flash = require("connect-flash");

/* GET users listing. */
router.get("/", async function(req, res, next) {
  res.clearCookie("access_token");
  res.redirect("/dang-nhap");
});

module.exports = router;
