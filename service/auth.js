const jwt = require("jsonwebtoken");
const CONSTANTS = require("../config/constants");

module.exports = {
  checkLogin: async (req, res, next) => {
    let token = req.cookies.access_token;
    jwt.verify(token, CONSTANTS.SECRET_KEY, async (err, decode) => {
      if (err) {
        req.flash("error_msg", "Truy cập bị tùy chối!");
        res.redirect("/dang-nhap");
      } else {
        req.user = decode.data;
        next();
      }
    });
  },
  checkAdmin: async (req, res, next) => {
    let token = req.cookies.access_token;
    jwt.verify(token, CONSTANTS.SECRET_KEY, async (err, decode) => {
      if (err) {
        req.flash("error_msg", "Truy cập bị tùy chối!");
        res.redirect("/dang-nhap");
        // res.json(result);
      } else {
        if (decode.data.role == "Admin") {
          req.user = decode.data;
          next();
        } else {
          req.flash("error_msg", "Truy cập bị tùy chối!");
          res.redirect("/dang-nhap");
        }
      }
    });
  }
};
