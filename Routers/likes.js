const router = require("express").Router()
import { isLoggedIn } from "../Middlewares/user"

const { likePost, dislikePost } = require("../Controllers/likes")

router.route("/like/:id").post(isLoggedIn, likePost)
router.route("/unlike/:id").post(isLoggedIn, dislikePost)

module.exports = router