const router = require("express").Router();
const { signup, signin, getUserInfo } = require("../Controllers/user");
const { isLoggedIn } = require("../Middlewares/user")

router.route("/signup").post(signup);
router.route("/authenticate").post(signin);
router.route("/user").get(isLoggedIn, getUserInfo)

module.exports = router;
