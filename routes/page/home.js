var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async function(req, res, next) {
  res.render("page/home");
});

module.exports = router;
