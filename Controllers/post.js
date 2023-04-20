const { Op } = require("sequelize");
const Post = require("../Model/post")
const Like = require("../Model/like")
const Comment = require("../Model/comment")

exports.createPost = async (req, res) => {
    const { title, description, userId } = req.body

    if (!title || !description)
        return res.status(400).json({
            status: false,
            message: `titlee and ${description} fields Required!`
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

        // const likesDeleted = await Like.destroy({ where: { postId } })
        // const commentsDeleted = await Comment.destroy({ where: { postId } })

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

exports.getPostDetails = async (req, res) => {
    const { id: postId } = req.params;

    try {
        // Find the post with the specified ID, along with its associated user
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const {
            likesCount,
            commentsCount,
            title,
            description,
            createdAt
        } = post.toJSON()

        // Return the post with its likes and comments counts
        return res.status(200).json({
            likesCount,
            commentsCount,
            title,
            description,
            createdAt
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch all posts created by authenticated user, sorted by post time
        const posts = await Post.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });

        // Loop through each post to get its comments 
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            // Get comments for the post
            const comments = await Comment.findAll({
                where: { postId: post.id },
                order: [['createdAt', 'ASC']],
            });

            // Add comments to the post object
            post.comments = comments;
            post.userId = null;
        }

        // Return the list of posts with comments and likes count
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}
