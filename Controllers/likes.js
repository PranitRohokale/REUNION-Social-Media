const { Op } = require("sequelize");
const Post = require("../Model/post")
const Like = require("../Model/like")

exports.likePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { userId } = req.body;

        // Check if the post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user already liked the post
        const like = await Like.findOne({ where: { postId, userId } });
        if (like && like.isLike) {
            return res.status(400).json({ message: 'Post already liked by user' });
        }

        // If the user has previously disliked the post, update the existing like
        if (like && !like.isLike) {
            await like.update({ isLike: true });
            await post.decrement('likesCount');
        } else {
            // Create a new like if the user has not interacted with the post before
            await Like.create({ userId, postId, isLike: true });
        }

        // Increment the likes count in the post
        await post.increment('likesCount');

        // Return success response
        return res.status(200).json({ message: 'Post liked by user' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong!!' });
    }
};

exports.dislikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { userId } = req.body;

        // Find the like from the Like model
        const like = await Like.findOne({
            where: { postId, userId },
        });

        // If like not found, return error response
        if (!like) {
            return res.status(404).json({ error: 'Like not found.' });
        }

        // Remove the like
        await like.destroy();

        // Decrement the likesCount in the Post model
        const post = await Post.findOne({ where: { id: postId } });
        await post.decrement('likesCount');

        // Return success response
        return res.status(200).json({ message: 'Post unliked successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'something went wrong!!' });
    }
};