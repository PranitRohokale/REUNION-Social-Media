const router = require("express").Router()
import { isLoggedIn } from "../Middlewares/user"

const {createPost,deletePost} = require("../Controllers/post")

router.route("/posts").post(isLoggedIn,createPost)
router.route("/posts/:id").delete(isLoggedIn,deletePost)

module.exports = router