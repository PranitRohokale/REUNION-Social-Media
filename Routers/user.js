const router = require("express").Router();
const { signup, signin, getUserInfo ,followUser, unfollowUser} = require("../Controllers/user");
const { isLoggedIn } = require("../Middlewares/user")

router.route("/signup").post(signup);
router.route("/authenticate").post(signin);
router.route("/user").get(isLoggedIn, getUserInfo)

router.route("/follow/:id").post(isLoggedIn,followUser);
router.route("/unfollow/:id").post(isLoggedIn,unfollowUser);

module.exports = router;
