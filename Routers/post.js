const router = require("express").Router()
const { isLoggedIn } = require("../Middlewares/user")

const { createPost, deletePost, getPostDetails, getAllPosts } = require("../Controllers/post")

router.route("/posts").post(isLoggedIn, createPost)
router.route("/posts/:id")
    .delete(isLoggedIn, deletePost)
    .get(getPostDetails)

router.route("/all_posts").get(isLoggedIn, getAllPosts);

module.exports = router