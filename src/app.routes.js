const express = require("express");
const router = express.Router();
const path = require("path");
const Oauth = require("./middlewares/Oauth");
/**
 * Account
 */
const accountCtl = require("./controller/account");
router.post("/register", accountCtl.registerAccount);
router.post("/login", accountCtl.login);
router.post("/set-role/:accountId", accountCtl.settingRole);

module.exports = router;
