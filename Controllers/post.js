const { Op } = require("sequelize");
const Post = require("../Model/post")
const Like = require("../Model/like")
const Comment = require("../Model/comment")

exports.createPost = async (req, res) => {
    const { title, description, userId } = req.body

    if (!(title && description))
        return res.status(400).json({
            status: false,
            message: `title and description fields Required!`
        })

    try {
        const newPost = await Post.create({ title, description, userId })
        await newPost.save();

        return res.status(200).json({
            status: true,
            data: newPost.toJSON(),
            message: "post created successfully!!"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            error,
            message: "Something went wrong!!"
        })
    }

}


exports.deletePost = async (req, res) => {
    const { userId } = req.body
    const { id: postId } = req.params

    if (!(postId))
        return res.status(400).json({
            status: false,
            message: `postId fields Required!`
        })

    try {
        const rowDeleted = await Post.destroy({ where: { postId, userId } })
        if (!rowDeleted)
            throw "Something went wrong";

        const likesDeleted = await Like.destroy({ where: { postId } })
        const commentsDeleted = await Comment.destroy({ where: { postId } })
        
        return res.status(200).json({
            status: true,
            data: postInstance.toJSON(),
            message: "post deleted successfully!!"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            error,
            message: "Something went wrong!!"
        })
    }

}