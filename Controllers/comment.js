const Comment = require("../Model/comment")
const Post = require("../Model/post")

exports.addComment = async (req, res) => {
    try {
        const { content, userId } = req.body;
        const { id: postId } = req.params;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: `Post with ID ${postId} not found.` });
        }

        const comment = await Comment.create({
            content,
            postId,
            userId,
        });

        // Increment the commentsCount attribute of the post by 1
        await post.increment('commentsCount');

        res.json({ commentId: comment.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}