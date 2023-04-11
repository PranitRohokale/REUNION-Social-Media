const router = require("express").Router();
const { signup, signin } = require("../Controllers/user");

router.route("/signup").post(signup);
router.route("/authenticate").post(signin);


module.exports = router;
