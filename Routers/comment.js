const router = require("express").Router()
import { isLoggedIn } from "../Middlewares/user"

const { addComment } = require("../Controllers/comment")

router.route("/comment/:id").post(isLoggedIn, addComment)

module.exports = router