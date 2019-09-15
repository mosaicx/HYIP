const router = require("express").Router();

const homeRouter = require("../routes/page/home");

// page
router.use("/", homeRouter);

//auth
const loginRouter = require("../routes/auth/login");
const registerRouter = require("../routes/auth/register");
const logoutRouter = require("../routes/auth/logout");

router.use("/dang-nhap", loginRouter);
router.use("/dang-ky", registerRouter);
router.use("/dang-xuat", logoutRouter);
// router.use("/forgot-password", homeRouter);

// admin
const adminRouter = require("../routes/admin");
router.use("/admin", adminRouter);
module.exports = router;

// user
const profileRouter = require("../routes/user/profiler");
const accountRouter = require("../routes/user/edit-account");
const avatarRouter = require("../routes/user/edit-avatar");
const passwordRouter = require("../routes/user/edit-password");
const rechargeRouter = require("../routes/user/recharge");
const transactionRouter = require("../routes/user/transaction");

router.use("/thanh-vien", profileRouter);
router.use("/thanh-vien/chinh-sua", accountRouter);
router.use("/thanh-vien/doi-avatar", avatarRouter);
router.use("/thanh-vien/doi-mat-khau", passwordRouter);
router.use("/thanh-vien/nap-tien", rechargeRouter);
router.use("/thanh-vien/lich-su-giao-dich", transactionRouter);
