const router = require("express").Router()
const { isLoggedIn } = require("../Middlewares/user")

const { addComment } = require("../Controllers/comment")

router.route("/comment/:id").post(isLoggedIn, addComment)

module.exports = router